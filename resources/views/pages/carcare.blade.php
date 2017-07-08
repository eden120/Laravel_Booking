@section('title', 'Executive Valet BDL Car care Options')
@section('description', 'Have your car serviced while you travel! Complete Detailing, Washes, Interior Detail, Oil Change and more! Our expert in-house staff will pamper your car!')

@extends('layouts.default', ['vueContent' => 'Default'])

@section('content')

    @include('elements.page_heading')
    @include('elements.page_title', ['page_title' => 'CAR CARE SERVICES'])
    @include('elements.sticky_header')
    <div class="loading"  style="display: none">Loading&#8230;</div>


    <div id="page-wrapper">

        <div id="page-wrapper-bg-img" style="background-image: url('/assets/images/car-care-page.jpg')"></div>

        <div id="car-care-intro">
            <div class="container">
                <div class="row">
                    <div class="span-4 offset-8">
                        <div class="box box-dark box-jumbo box-margin-nil">
                            <h5>About Car Care</h5>
                            <p>At Executive Valet we offer a variety of car care services. Please choose the service you
                                would like to have performed on your vehicle while you are away.</p>
                            <p class="small">* NOTE: All Services are subject to a 6.35% CT Sales Tax and 10.6% Airport
                                Access Fee.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div class="general-page-section">
        <div class="container">

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

@stop

@section('footer_js')
    <script>

        $(document).on('change', '#filter_vehicle', function() {
            var type = $(this).val();

            if (type) {
                $('.product-item').hide().filter(`[data-vehicle="${type}"]`).show();
            }
        });

    </script>
@stop
