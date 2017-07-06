@section('title', 'Executive Valet BDL Express Club')
@section('description', 'Executive Valet Parking\'s exclusive frequent parker club...Earn points each time you park for redemption on valuable products such as Car Care and Free Parking!')

@extends('layouts.default', ['vueContent' => 'Default'])

@section('content')

    @include('elements.page_heading')
    @include('elements.page_title', ['page_title' => 'EXPRESS CLUB'])
    @include('elements.sticky_header')

    <div id="page-wrapper">

        <div id="page-wrapper-bg-img" style="background-image: url('/assets/images/express-club-homepage.jpg')"></div>

        <div style="height:200px;"></div>

    </div>

    <div class="general-page-section">

        <div class="container">
            <div class="row">
                <div class="span-6">
                    <h2>About Express Club</h2>
                    <p>JOIN THE EXPRESS CLUB AND BEGIN EARNING FREE PARKING OR CAR CARE SERVICES.</p>
                    <ul>
                        <li>Earn one point for every paid day.</li>
                        <li>Express Members save 10% on all car care services rates!</li>
                        <li>Simply present your Express Club Card upon Check-In for a speedy drop off and your permanent
                            parking discount will be kept on file.
                        </li>
                        <li>Express Club Members can skip the cashier when you return. We will charge your credit card
                            on file and your receipt will be in your car upon return.
                        </li>
                        <li>Also you can view your account online! Track your activity, update your account, or simply
                            reprint any receipts from your previous trips.
                        </li>
                        <li>Express Club Members also receive email receipts, easy for tracking business expenses.</li>
                    </ul>
                    <hr/>
                    <p>Simply tell the customer service representative upon check in that you would like to use your
                        frequent parker points. Rewards and corresponding point values are listed below:</p>
                    <ul>
                        <li>Oil Change — 45 Pts</li>
                        <li>Deluxe Exterior Hand Wash — 35 Pts</li>
                        <li>Deluxe In/Out Wash — 60 Pts</li>
                        <li>Deluxe Wash and Wax — 100 Pts</li>
                        <li>Interior Detail — 110 Pts</li>
                        <li>Complete Detail — 125 Pts</li>
                    </ul>
                    <p>Free week of parking — 45 Pts; contact Amber at Executive Valet parking for redemption.</p>
                    <p>Join today and receive your first year membership Free! A $20 annual membership fee will be
                        charged on your membership anniversary date the next year.</p>
                </div>
                <div class="span-6">

                    <h2>Register Now</h2>

                    @include('shared.errors')

                    <form action="{{ route('expressclub.store') }}" method="POST">

                        {{ csrf_field() }}

                        <div class="row row-spaced">
                            <div class="span-12">
                                <h6>Your Information</h6>
                            </div>
                        </div>

                        <div class="row row-spaced">
                            <div class="span-6">
                                <label>First Name</label>
                                {{ Form::text('first_name', null, ['placeholder' => 'First Name', 'class' => 'fi fi-user required-field', 'required' => 'required']) }}
                            </div>
                            <div class="span-6">
                                <label>Last Name</label>
                                {{ Form::text('last_name', null, ['placeholder' => 'Last Name', 'class' => 'fi fi-user required-field', 'required' => 'required']) }}
                            </div>
                        </div>

                        <div class="row row-spaced">
                            <div class="span-6">
                                <label>Email (Your Username)</label>
                                {{ Form::text('email', null, ['placeholder' => 'you@youremail.com', 'class' => 'fi fi-envelope required-field', 'required' => 'required']) }}
                            </div>
                            <div class="span-6">
                                <label>Choose A Password</label>
                                {{ Form::password('password', ['placeholder' => 'Choose A Password', 'class' => 'fi fi-ticket required-field', 'required' => 'required']) }}
                            </div>
                        </div>

                        <div class="row row-spaced">
                            <div class="span-6">
                                <label>Phone</label>
                                {{ Form::text('phone', null, ['placeholder' => 'Phone', 'class' => 'fi fi-phone']) }}
                            </div>
                            <div class="span-6">
                                <label>Address</label>
                                {{ Form::text('address', null, ['placeholder' => 'Address', 'class' => 'fi fi-map-marker']) }}
                            </div>

                        </div>

                        <div class="row row-spaced">
                            <div class="span-6">
                                <label>City</label>
                                {{ Form::text('city', null, ['placeholder' => 'City', 'class' => 'fi fi-angle-right']) }}
                            </div>
                            <div class="span-6">
                                <label>State</label>
                                {{ Form::text('state', null, ['placeholder' => 'State', 'class' => 'fi fi-angle-right']) }}
                            </div>
                        </div>

                        <div class="row row-spaced">
                            <div class="span-6">
                                <label>Zipcode</label>
                                {{ Form::text('zipcode', null, ['placeholder' => 'Zipcode', 'class' => 'fi fi-angle-right']) }}
                            </div>
                        </div>

                        <div class="row row-spaced">
                            <div class="span-12">
                                <h6>Credit Card Details</h6>
                            </div>
                        </div>

                        <div class="row row-spaced">
                            <div class="span-8">
                                <label>Card Number</label>
                                {{ Form::number('credit_card[number]', null, ['placeholder' => 'Credit Card Number', 'class' => 'fi fi-lock required-field', 'required' => 'required']) }}
                            </div>
                            <div class="span-4">
                                {{ Form::select('credit_card_type', $cards, null, ['class' => 'fi fi-angle-right'] ) }}
                            </div>
                        </div>

                        <div class="row row-spaced">
                            <div class="span-8">
                                <label>Exp Date</label>
                                <div class="row">
                                    <div class="span-6">
                                        {{ Form::select('credit_card_year', $years, null, ['class' => 'fi fi-angle-right'] ) }}
                                    </div>
                                    <div class="span-6">
                                        {{ Form::select('credit_card_month', $months, null, ['class' => 'fi fi-angle-right'] ) }}
                                    </div>
                                </div>
                            </div>
                            <div class="span-4">
                                <label>CVV Code</label>
                                <div class="row">
                                    <div class="span-12">
                                        {{ Form::text('credit_card[cvv]', null, ['placeholder' => 'CVV', 'class' => 'fi fi-angle-right required-field', 'required' => 'required']) }}
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="row row-spaced">
                            <div class="span-12">
                                <h6>Your Vehicle</h6>
                            </div>
                        </div>

                        <div class="row row-spaced">
                            <div class="span-6">
                                <label>Vehicle Make</label>
                                {{ Form::text('vehicle[make]', null, ['placeholder' => 'Vehicle Make', 'class' => 'fi fi-car']) }}
                            </div>
                            <div class="span-6">
                                <label>Vehicle Color</label>
                                {{ Form::text('vehicle[model]', null, ['placeholder' => 'Vehicle Model', 'class' => 'fi fi-angle-right']) }}
                            </div>
                        </div>

                        <div class="row row-spaced">
                            <div class="span-6">
                                <label>Vehicle Model</label>
                                {{ Form::text('vehicle[color]', null, ['placeholder' => 'Vehicle Color', 'class' => 'fi fi-angle-right']) }}
                            </div>
                        </div>

                        <div class="row row-spaced">
                            <div class="span-6">
                                <label>Vehicle License Plate</label>
                                {{ Form::text('vehicle[license]', null, ['placeholder' => 'Vehicle License Plate', 'class' => 'fi fi-angle-right']) }}
                            </div>
                            <div class="span-6">
                                <label>Vehicle Registration State</label>
                                {{ Form::select('vehicle[state]', $states, old('CT'), ['class' => 'fi fi-angle-right'] ) }}
                            </div>
                        </div>

                        <div class="row row-spaced">
                            <div class="span-6">
                                <button class="button button-solid button-success"><i class="fa fa-check"></i> Apply Now
                                </button>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    </div>
@stop
