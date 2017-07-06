<?php

namespace App\Http\Controllers;

use App\System\External\EvApi;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    
    /**
     *  EV Api
     */
    public function api()
    {
        return app(EvApi::class);
    }
    
    public function landReferral($affiliateUri, $successRoute)
    {
        $promoCode = ($this->api())->getUriPromoCode($affiliateUri);
        
        if($promoCode === false || !property_exists($promoCode, 'promo_code')) {
            return response(view('errors.404'), 404);
        }
        
        session([
            'promo_code' => $promoCode->promo_code,
        ]);
        
        return redirect()->route($successRoute);
    }
}
