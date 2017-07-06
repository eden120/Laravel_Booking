<?php

namespace App\Http\Controllers;

use App\System\Models\Search;
use App\System\Models\State;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ( ! $request->session()->has('cart_id')) {
            return view('cart.empty');
        }
        
        $states = State::all()->pluck('state', 'code')->toArray();
        
        $api = $this->api();
        
        $cart = $api->getCart();
        
        if (! count($cart->cart_items)) {
            return view('cart.empty');
        }
        
        $card_required = collect($cart->cart_items)->first(function($item) {
            return $item->rate_group == 'Prepay';
        });
        
        $search = Search::where('token', session('search'))->first();
        
        if ($search && $search->prepaid) {
            $card_required = false;
        }
        
        if ($cart->grand_total == 0) {
            $card_required = false;
        }
    
        $account = (session('express_user')) ? $api->getExpressClubAccount() : '';
    
        $points = $this->pointsAllowed($account, $cart);
        
        $refund_policy = $api->getRefundPolicy();
        
        list($first_name, $last_name, $email, $phone, $zipcode, $address, $city, $state, $vehicles) = $this->userParams();
    
        return view('cart.index', compact('cart', 'search', 'states', 'card_required', 'account', 'points',
            'refund_policy', 'first_name', 'last_name', 'email', 'phone', 'zipcode', 'address', 'city', 'state', 'vehicles'));
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $api = $this->api();
        
        if ( ! $request->session()->has('cart_id')) {
            $api->createCart();
        }
        
        $search = Search::where('token', session('search'))->firstOrFail();
        
        $item = collect(json_decode($search->results))->first(function($result) use ($request) {
            return $result->meta->digest == $request->input('digest');
        });
        
        $result = $api->addItemToCart(['data' => $item]);
        
        if ($result) {
            return response()->json(['success'], 200);
        }
        
        return response()->json('error', $api->errorsArray());
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $item)
    {
        $api = $this->api();
        
        $result = $api->deleteItemFromCart($item);
        
        if ($result) {
            return response()->json(['success'], 200);
        }
        
        return response()->json('error', 422);
    }
    
    public function destroy_service($item, $service)
    {
        $api = $this->api();
    
        $result = $api->deleteItemServiceFromCart($item, $service);
    
        if ($result) {
            return response()->json(['success'], 200);
        }
    
        return response()->json('error', 422);
    }
    
    public function points($item)
    {
        if (session('express_user')) {
            $api = $this->api();
            $add = $api->editItemPaymentType($item);
            
            if (! $add) {
                return response()->json(['errors' => $api->errorsArray()], 422);
            }
        }
        
        return back();
    }
    
    private function pointsAllowed($account, $cart)
    {
        if (! $account) {
            return 0;
        }
    
        $used = collect($cart->cart_items)->sum('fpp_cost');
        
        return ((int)$account->fpp - $used);
    }
    
    /**
     * @return array
     */
    private function userParams()
    {
        if (session('express_user')) {
            $api = $this->api();
            $response = $api->getExpressClubAccount();
            
            $first_name = old('first_name', $response->first_name);
            $last_name = old('last_name', $response->last_name);
            $email = old('email', $response->email);
            $phone = old('phone', $response->phone);
            $zipcode = old('zipcode', $response->zipcode);
            $address = old('address', $response->address);
            $city = old('city', $response->city);
            $state = old('state', $response->state);
            $vehicles = $response->vehicles;
            
        } else {
            $first_name = old('first_name');
            $last_name = old('last_name');
            $email = old('email');
            $phone = old('phone');
            $zipcode = old('zipcode');
            $address = old('address');
            $city = old('city');
            $state = old('state');
            $vehicles = null;
        }
        
        return [$first_name, $last_name, $email, $phone, $zipcode, $address, $city, $state, $vehicles];
    }
}
