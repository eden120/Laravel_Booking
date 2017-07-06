<?php

namespace App\Http\Controllers;

use App\System\Models\State;
use Illuminate\Http\Request;
use App\System\Models\Search;
use App\Http\Requests\SearchRequest;
use Illuminate\Support\Facades\Session;

class CouponsController extends Controller
{
    public function index()
    {
        return view('pages.coupons.index');
    }
    
    public function indexAffiliate($affiliateUri)
    {
        return $this->landReferral($affiliateUri, 'coupons.index');
    }
    
    public function store(SearchRequest $request)
    {
        $api = $this->api();
        
        if ( ! $request->session()->has('cart_id')) {
            $api->createCart();
        }
        
        $search = $this->saveSearch($request);
        
        $results = $api->reserveWithCoupon(['data' => $search->toArray()]);
        
        $rate = collect($results->rates)->filter(function($result) {
            return $result->rate_group == 'Online';
        })->first();
    
        $cart = $api->addItemToCart(['data' => $rate]);
        
        if ($cart) {
            return redirect(route('res_details', ['id' => $search->token]));
        }
    
        return redirect()->route('coupons.index')->with('error',  'Unable to add parking');

    }
//
//    public function show(Request $request)
//    {
//        if ( ! $request->session()->has('cart_id')) {
//            return view('cart.empty');
//        }
//
//        $states = State::all()->pluck('state', 'code')->toArray();
//
//        $api = $this->api();
//
//        $cart = $api->getCart();
//
//        if (! count($cart->cart_items)) {
//            return view('cart.empty');
//        }
//
//        $card_required = collect($cart->cart_items)->first(function($item) {
//            return $item->rate_group == 'Prepay';
//        });
//
//        $search = Search::where('token', session('search'))->first();
//
//        $account = '';
//        $points = 0;
//
//        return view('pages.coupons.show', compact('cart', 'search', 'states', 'card_required', 'account', 'points'));
//    }
    
    private function prepareDate($request, $when = 'arrival')
    {
        $date = date('Y-m-d', strtotime($request->input("{$when}Date")));
        $time = $request->input("{$when}Time") . ':00';
        return "$date $time";
    }
    
    /**
     * @param SearchRequest $request
     * @return static
     */
    private function saveSearch(SearchRequest $request)
    {
        $search = Search::create([
            'arrival_date' => $this->prepareDate($request),
            'return_date' => $this->prepareDate($request, 'return'),
            'promo_code' => $request->input('promo_code') ?: null,
            'prepaid' => true
        ]);
        
        session([
            'search' => $search->token,
            'arrivalDate' => $request->arrivalDate,
            'returnDate' => $request->returnDate,
            'arrivalTime' => $request->arrivalTime,
            'returnTime' => $request->returnTime,
            'promo_code' => $request->promo_code,
            'prepaid' => true
        ]);
        
        Session::save();
        
        return $search;
    }
}
