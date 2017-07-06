<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class PrePaidCardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $prePaidCards = collect($this->api()->searchPrePaidCards());
        
        $cards = [];
        
        foreach ($prePaidCards['rates'] as $card) {
            $cards[$card->rate_id] = $card->days . " Days for $" . number_format($card->parking, 2);
        }

        return view('pages.prepaidcards.index', compact('states', 'cards'));
    }
    
    public function indexAffiliate($affiliateUri)
    {
        return $this->landReferral($affiliateUri, 'prepaidcards.index');
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return $this|string
     */
    public function store(Request $request)
    {
        $api = $this->api();
        
        if ($request->session()->has('cart_id')) {
            $api->removeAllCartItems();
        }
        
        $api->createCart();
        
        $prePaidCards = collect($api->searchPrePaidCards()->rates);
        
        $card = $prePaidCards->where('rate_id', $request->card)->first();
        
        $result = $api->addItemToCart(['data' => $card]);
        
        if ($result) {
            
            session(['cart_address' => true]);
            Session::save();
            
            return redirect()->route('cart.index');
        }
        
        return redirect()->withErrors(['error' => 'Sorry we are unable to complete your purchase']);
    }

}
