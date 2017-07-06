@section('title', 'Bradley Airport Parking (BDL) | Executive Valet Parking Long Term')
@section('description', 'Bradley Airport Parking &#9992; &#9992; &#9992;  Executive Valet Airport Parking - Short &amp; Long Term Parking, Low Rates, 24hr On-Demand Shuttle. #1 In Customer Service.')

@extends('layouts.default', ['vueContent' => 'Home'])

@section('content')
    <div id="splash-tier">
        <div id="splash-heading">
            <div id="splash-logo">
                <i class="elf-logo-complete-rgb-bold-airport-parking"></i>
            </div>
            <div id="splash-menu">
                @include('elements.header_menu')
            </div>
        </div>

        <div id="home-booking-form">
            <div id="home-booking-form-inner">
                <div id="home-booking-form-heading">
                    <h1 class="fit-text">Find BDL Parking Rates</h1>
                    <p>Search for the best short stay &amp; long term Bradley Airport parking deals!</p>
                </div>
                <div id="home-booking-form-wrap">
                    @include('shared.basic_booking_form')
                </div>
            </div>
        </div>
    </div>
    <div id="home-promos-area">
        <a href="#home-promos-area" id="home-promos-cta-flag" class="smooth-scroll-offset">
            Deals &amp; More! <i class="fa fa-long-arrow-down"></i>
        </a>
        <div class="container">
            @include('shared.promo_banners')
        </div>
    </div>

    <div id="home-intro">
        <div class="container">
            <div class="row">
                <div class="span-12">
                    <h5>Welcome to Executive Valet Parking at Bradley International Airport</h5>
                    <p>Executive Valet invests a lot of effort to provide the best customer service and valet parking
                        service available. With a state of the art parking facility, discounted pre-paid parking deals,
                        car care options and a frequent parker Express Club, Executive Valet is the perfect alternative
                        to parking at the BDL on-airport lots. With a minimum 20% off prepaid reservations every day you
                        will find the best BDL parking rates right here. Search for short stay &amp; long term Bradley
                        Airport parking deals today! </p>
                </div>
            </div>
        </div>
    </div>

    <div id="home-content-tier">
        <div class="container">
            @include('shared.doorways')
        </div>
    </div>

    <div class="loading"  style="display: none">Loading&#8230;</div>

@stop

@section('footer_js')

    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.js"></script>

    <script>

        $(function () {

            var BV = new $.BigVideo({useFlashForFirefox: false});

            BV.init();
            if (Modernizr.touch) {

                // HEADS UP!!! This is the placeholder image for when we're on a touch device because
                // most of them don't support background videos.
                // it can be changed in less/build/pages/index.less - look for class "splash-cover-image"
                // change the background image to whatever you like.
                $('#splash-tier').prepend('<div class="splash-cover-image" />');
                $('#splash-tier').prepend('<div class="splash-cover-overlay" />');

                $(document).ready(function () {

                    $('#splash-tier-loader').fadeOut();
                    $('#splash-tier').css({'background-image': 'none'});
                    $('.splash-cover-index-1').fadeIn(1000);

                });

            } else {

                BV.getPlayer().on('durationchange', function () {

                    $('#big-video-wrap').fadeIn();
                    $('#splash-tier-loader').fadeOut();

                });

                BV.show(
                    'https://s3.us-east-2.amazonaws.com/executive-valet-video/EVP_New+Edit_v118.mov', {
                        //ambient:true,
                        doLoop: true,
                        altSource: 'https://s3.us-east-2.amazonaws.com/executive-valet-video/EVP+119.webm'
                    });
            }

            $(function() {
                $('#slides').slidesjs({
                    width: 1135,
                    height: 120,
                    navigation: true,
                    play: {
                        active: true,
                        auto: true,
                        interval: 6000,
                        swap: true,
                        pauseOnHover: true,
                        restartDelay: 2500
                    }
                });
            });

        });

    </script>

@stop