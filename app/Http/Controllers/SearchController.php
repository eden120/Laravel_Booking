<?php

namespace App\Http\Controllers;

use App\System\Models\Search;
use App\Http\Requests\SearchRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class SearchController extends Controller
{
    public function store(SearchRequest $request)
    {
        $search = Search::create([
            'arrival_date'   => $this->prepareDate($request),
            'return_date'    => $this->prepareDate($request, 'return'),
            'promo_code' => $request->input('promo_code') ?: null,
            'prepaid' => $request->input('prepaid') ?: 0,
        ]);
        
        session([
            'search' => $search->token,
            'arrivalDate' => $request->arrivalDate,
            'returnDate' => $request->returnDate,
            'arrivalTime' => $request->arrivalTime,
            'returnTime' => $request->returnTime,
            'promo_code' => $request->promo_code,
            'prepaid' => $request->prepaid ?? 0
        ]);
    
        Session::save();
        
        return redirect()->route('search.show', ['id' => $search->token]);
    }
    
    public function show($searchToken)
    {
        $search = Search::where('token', $searchToken)->firstOrFail();
        
        $api = $this->api();
        
        if ($search->prepaid) {
            $results = $api->reserveWithCoupon(['data' => $search->toArray()]);
        } else {
            $results = $api->searchReservationRates(['data' => $search->toArray()]);
        }
        
        if ($results) {
            $search->results = json_encode($results->data->rates);
            $search->save();
    
            $plans = $this->api()->getCarCare();
            
            $results = $results->data;
            $results->search = $search;
            
            return view('search.show', compact('results', 'search', 'plans'));
        }
        
        return back()->withErrors($api->errorsArray());
    }

    public function getCC(Request $request)
    {
        $data = array(
            'data' => array(
//            'promo_code' => $request['code'],
                'arrival_date' => date("Y-m-d H:i", strtotime($request['arrival_date'])),
                'return_date' => date("Y-m-d H:i", strtotime($request['return_date']))
            )
        );

        $ccId = $request['ccId'];
        $api = $this->api();
        if ( ! $request->session()->has('cart_id')) {
            $api->createCart();
        }
        
        $results = $api->searchReservationRates(['data' => $data]);
        foreach ($results->data->rates as $item){
            if ($item->rate_type == "Reservation" && $item->rate_group == "Prepay") {
                $api->addItemToCart(['data' => $item]);

                $data = array(
                    'data' => array(
                        'car_care_id' => $ccId
                    )
                );
                $cart = $api->getCart();

                $item = collect($cart->cart_items)->filter(function($item) {
                    return $item;
                })->last();

                $api->addCareToCart($item->meta->cart_item_id, $data);

            }

        }

        return response()->json(['success'], 200);
    }
    
    public  function checkCCID(Request $request)
    {
        $ccId =  $request->ccid;
        $api = $this->api();
        $cart = $api->getCart();

        foreach ($cart->cart_items as $cart_items){
            $car_care_id[] = $cart_items->requested_services[0]->car_care_id;

        }
        echo  json_encode($car_care_id);
        exit();
    }
    
    
    private function prepareDate($request, $when = 'arrival')
    {
        $date = date('Y-m-d', strtotime($request->input("{$when}Date")));
        $time = $request->input("{$when}Time") . ':00';
        return "$date $time";
    }

}
