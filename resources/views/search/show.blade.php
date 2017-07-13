@extends('layouts.default', ['vueContent' => 'Search'])

@section('content')

    @include('elements.page_heading')
    @include('elements.sticky_header')

    <div id="page-wrapper">

        <div id="page-wrapper-bg-img" style="background-image: url('/assets/images/airport.jpg')"></div>

        <div id="searching-widget-area">
            @include('elements.blocks.searching_widget')
        </div>

    </div>

    <div id="results-area">

        <div id="results-area-search-criteria">
            @include('elements.blocks.search_criteria')
        </div>

        <div id="results-area-parking-product"  v-if="! showCheckout">
            <div id="parking-products" class="container">
                <div class="row">
                    @if($results->rates)
                        @if($search->prepaid)
                            @foreach($results->rates as $rate)
                                @include('search.prepiad', [$rate, $search])
                            @endforeach
                        @else
                            @each('search.result', $results->rates, 'rate')
                        @endif

                    @else
                        <h4>Sorry we have no available rates at the moment</h4>
                    @endif



                </div>
            </div>
            <p class="small">* NOTE: Prices are plus 6.35% CT Sales Tax 10.6% Airport Access Fee and $1.50 Fuel
                Surcharge</p>
        </div>

        <div id="results-area-addons" v-show="services">
            <div class="container">

                <div id="results-area-addons-heading">
                    <h5>Add Care Care Services <a href="{{ route('cart.index') }}"
                                                  class="smooth-scroll button button-small"><i class="fa fa-times"></i>
                            No Thanks</a></h5>

                    <div class="row">
                        <div class="span-4" style="text-align: left">
                            Select Vehicle Type<br />
                            <select name="filter_vehicle" id="filter_vehicle">
                                <option value="">All</option>
                                <option value="car">Car</option>
                                <option value="wagon_suv_truck">Truck/Wagon/SUV</option>
                            </select>
                        </div>

                    </div>
                    <br />

                    <div id="products-list" class="row">
                        @each('shared.car_plan', $plans, 'plan')
                    </div>

                </div>


            </div>
            <div class="modal fade" id="carCaremodal" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div id="home-booking-form" class="date_modal">
                                <div id="home-booking-form-inner">
                                    <input type="hidden" name="carcareID">
                                    <div id="home-booking-form-heading">
                                    </div>
                                    <div id="home-booking-form-wrap">
                                        @include('shared.basic_booking_form')
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>

        <div id="results-area-checkout" v-if="showCheckout">
            <div class="container">
                @if($results->rates)
                <a href="{{ route('cart.index') }}" class="button button-solid button-large"><i
                        class="fa fa-shopping-cart"></i> Checkout</a>
                @endif
            </div>
        </div>

        <div class="new-search-area">
            <div class="container">
                <h3>Search Again...</h3>
                @include('shared.basic_booking_form')
            </div>
        </div>

    </div>

    <div class="loading" v-if="showLoading">Loading&#8230;</div>
@stop

@section('footer_js')

    <script>


        var searchWidget = $('#searching-widget');
        var resultsArea = $('#results-area');
        var searchWidgetPhrase1 = $('.searching-widget-progress-phrase-1');
        var searchWidgetPhrase2 = $('.searching-widget-progress-phrase-2');
        var searchWidgetPhrase3 = $('.searching-widget-progress-phrase-3');

        //$(resultsArea).show();
        searchDoneShowResults();

        function searchDoneShowResults() {
            $(searchWidget).fadeOut(500);
            $(searchWidget).parent().parent().fadeOut(500);
            $(resultsArea).delay(1000).slideDown(500);
        }

        function cyclePhrase1() {
            $(searchWidgetPhrase1).delay(1500).fadeIn();
        }

        function cyclePhrase2() {
            $(searchWidgetPhrase2).delay(3000).fadeIn();
        }

        function cyclePhrase3() {
            $(searchWidgetPhrase3).delay(4500).fadeIn();
        }

        $(document).on('change', '#filter_vehicle', function() {
            var type = $(this).val();

            if (type) {
                $('.product-item').hide().filter(`[data-vehicle="${type}"]`).show();
            }
        });

//        cyclePhrase1();
//        cyclePhrase2();
//        cyclePhrase3(setTimeout(searchDoneShowResults, 5500));
    </script>

@stop
