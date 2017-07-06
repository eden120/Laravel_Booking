<?php

namespace App\Http\Controllers;

use App\System\Models\Search;
use App\Http\Requests\SearchRequest;
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
    
    
    private function prepareDate($request, $when = 'arrival')
    {
        $date = date('Y-m-d', strtotime($request->input("{$when}Date")));
        $time = $request->input("{$when}Time") . ':00';
        return "$date $time";
    }
}
