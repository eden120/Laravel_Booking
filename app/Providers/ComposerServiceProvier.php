<?php

namespace App\Providers;

use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class ComposerServiceProvier extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        View::composer( [
            'shared.basic_booking_form',
            'pages.coupon', 'pages.coupons.index', 'pages.reservations.edit'
        ],
            'App\Http\Composers\SearchComposer');
    
        View::composer( [ 'cart.index', 'pages.expressclub.*' ], 'App\Http\Composers\CartComposer');
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
