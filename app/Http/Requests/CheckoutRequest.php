<?php

namespace App\Http\Requests;

use App\System\External\EvApi;
use Illuminate\Foundation\Http\FormRequest;

class CheckoutRequest extends FormRequest
{
    /**
     * @var EvApi
     */
    private $api;
    
    /**
     * CheckoutRequest constructor.
     * @param EvApi $api
     */
    public function __construct(EvApi $api)
    {
        $this->api = $api;
    }
    
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }
    
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $cart = $this->api->getCart();
        
        $rules = [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'terms' => 'required|accepted'
        ];
        
        if ($extras = $this->cardRequired($cart)) {
            $rules = array_merge($rules, $extras);
        }
        
        return $rules;
    }
    
    private function cardRequired($cart)
    {
        $card_required = collect($cart->cart_items)->first(function($item) {
            return $item->rate_group == 'Prepay';
        });
    
        if ($cart->grand_total == 0) {
            $card_required = false;
        }
        
        if ($card_required) {
            return [
                'credit_card_number' => 'required',
                'credit_card_year' => 'required',
                'credit_card_month' => 'required',
                'credit_card_cvv' => 'required',
            ];
        }
        
        return null;
        
    }
}
