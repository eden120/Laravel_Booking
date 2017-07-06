<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CarCareController extends Controller
{
    /**
     * Display car care products.
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $plans = $this->api()->getCarCare();
        
        return view('pages.carcare', compact('plans'));
    }

    public function store(Request $request)
    {
        $this->validate($request, ['item' => 'required']);
        
        if ( ! $request->session()->has('cart_id')) {
            $this->api()->createCart();
        }
        
        $cart = $this->api()->getCart();

        $item = collect($cart->cart_items)->filter(function($item) {
            return $item->rate_group != 'Online';
        })->last();
        
        if(! $item) {

           return response()->json(['error' => 'You must order Car Care Service in conjunction with a prepaid reservation'], 422);

        }
        
        if ($item->rate_group == 'Online') {
            return response()->json(['error' => 'Sorry we cannot add this service to this product'], 422);
        }
        
        $data = [ 'data' => ["car_care_id" =>  $request->input('item')]];
        
        $result = $this->api()->addCareToCart($item->meta->cart_item_id, $data);
        
        if ($result) {
            return response()->json(['success'], 200);
        }
        
        return response()->json(['error' => 'Sorry we cannot add this service to your cart'], 422);
        
    }
}
