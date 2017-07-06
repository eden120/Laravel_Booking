<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckoutRequest;

class CheckoutController extends Controller
{
    /**
     * Checkout a reservation.
     *
     * @param CheckoutRequest $request
     * @return $this
     */
    public function store(CheckoutRequest $request)
    {
        $params = $this->buildParams($request);
        
        $api = $this->api();
        
        $response = $api->checkoutCart(['data' => $params]);
        
        if ($response) {
            session()->flash('receipt', $response->data);
            return redirect()->route('receipt', ['order' => $response->data->order_id]);
        }
        
        return back()->withInput()->withErrors($api->errorsArray());
    }
    
    /**
     * Build checkout params.
     *
     * @param $request
     * @return mixed
     */
    protected function buildParams($request)
    {
        $params = $request->all();
        $params['credit_card_expiration'] = $request->input('credit_card_month') . $request->input('credit_card_year');
        return $params;
    }
}
