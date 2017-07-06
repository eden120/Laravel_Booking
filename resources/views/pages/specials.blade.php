@extends('layouts.default', ['vueContent' => 'Default'])

@section('content')

    @include('elements.page_heading')
    @include('elements.page_title', ['page_title' => 'SPECIALS'])
    @include('elements.sticky_header')

    <div id="page-wrapper">

        <div id="page-wrapper-bg-img"></div>

        <div class="container">
            <div class="row">
                <div class="span-4">
                    <h4>SPECIAL RATES</h4>
                    <p>Executive Valet is proud to offer its customers the best rates for valet airport parking at
                        Bradley Airport. Here you will often find occasional Bradley airport parking coupons or special
                        airport parking rates.</p>

                    <hr/>
                    <h4>RATINGS</h4>
                    <p style="text-align: center">
                        <strong>Executive Valet BDL</strong>
                        Rating: 4.6<br/>
                        Price Range: Rates from $8.00<br/>
                        Votes: 33</p>

                </div>
                <div class="span-8">
                    <h4>BRADLEY AIRPORT PARKING COUPONS</h4>
                    <p>Currently we do not have any Bradley Airport parking coupons but we do have huge BDL parking
                        savings available via our Prepaid Cards!</p>
                    <p>You can save up to 50% off our posted rate by pre-paying and booking online. Check BDL Parking
                        Rates.</p>
                    <p>Check back often for the latest deals, exclusive offers and coupons from Executive Valet!</p>
                </div>
            </div>
        </div>
    </div>
@stop
