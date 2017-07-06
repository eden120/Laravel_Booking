@section('title', 'Executive Valet BDL Corporate')

@extends('layouts.default', ['vueContent' => 'Default'])

@section('content')

    @include('elements.page_heading')
    @include('elements.page_title', ['page_title' => 'CORPORATE BENEFITS'])
    @include('elements.sticky_header')

    <div id="page-wrapper">

        <div id="page-wrapper-bg-img" style="background-image: url('/assets/images/corporates.jpg')"></div>

        <div style="height:200px;"></div>

    </div>

    <div class="general-page-section">

        <div class="container">
            <div class="row">
                <div class="span-6">
                    <h2>CORPORATE BENEFITS</h2>
                    <ul>
                        <li>Premium Valet Parking</li>
                        <li>Friendly staff that is #1 in customer service</li>
                        <li>Shuttle bus on demand to/from your airline terminal</li>
                        <li>Guaranteed parking space</li>
                        <li>Open 24/7 with 24 hour security</li>
                        <li>Luggage assistance</li>
                        <li>Online reservations</li>
                        <li>Electric car charging stations</li>
                        <li>Vehicles cleared of snow and ice and warmed in the Winter</li>
                        <li>Express check out</li>
                        <li>Frequent Parker Express Club</li>
                        <li>Car care services available</li>
                        <li>Cost Savings Reports available</li>
                        <li>Can be used as Employee Benefit for personal travel</li>
                        <li>Corporate rate based on volume</li>
                    </ul>

                </div>
                <div class="span-6">

                    <h2>Register Now</h2>

                    @include('shared.errors')

                    <form action="{{ route('corporate.store') }}" method="POST">

                        {{ csrf_field() }}

                        <div class="row row-spaced">
                            <div class="span-12">
                                <h6>Your Information</h6>
                            </div>
                        </div>

                        <div class="row row-spaced">
                            <div class="span-6">
                                <label>Company Name</label>
                                {{ Form::text('company_name', null, ['placeholder' => 'Company Name', 'class' => 'fi fi-angle-right required-field', 'required' => 'required']) }}
                            </div>
                            <div class="span-6">
                                <label>Last Name</label>
                                {{ Form::text('contact_name', null, ['placeholder' => 'Contact Name', 'class' => 'fi fi-angle-right required-field', 'required' => 'required']) }}
                            </div>
                        </div>

                        <div class="row row-spaced">
                            <div class="span-6">
                                <label>Address</label>
                                {{ Form::text('address', null, ['placeholder' => 'Address', 'class' => 'fi fi-angle-right required-field', 'required' => 'required']) }}
                            </div>
                            <div class="span-6">
                                <label>City</label>
                                {{ Form::text('city', null, ['placeholder' => 'City', 'class' => 'fi fi-angle-right required-field', 'required' => 'required']) }}
                            </div>
                        </div>

                        <div class="row row-spaced">
                            <div class="span-6">
                                <label>State</label>
                                {{ Form::text('state', null, ['placeholder' => 'State', 'class' => 'fi fi-angle-right required-field', 'required' => 'required']) }}
                            </div>
                            <div class="span-6">
                                <label>City</label>
                                {{ Form::text('zip', null, ['placeholder' => 'Zip', 'class' => 'fi fi-angle-right required-field', 'required' => 'required']) }}
                            </div>
                        </div>

                        <div class="row row-spaced">
                            <div class="span-6">
                                <label>Email (Your Username)</label>
                                {{ Form::text('email', null, ['placeholder' => 'you@youremail.com', 'class' => 'fi fi-envelope required-field', 'required' => 'required']) }}
                            </div>
                            <div class="span-6">
                                <label>Phone</label>
                                {{ Form::text('phone', null, ['placeholder' => 'Phone', 'class' => 'fi fi-phone']) }}
                            </div>
                        </div>

                        <div class="row row-spaced">
                            <div class="span-6">
                                <label>Number Of Employees</label>
                                {{ Form::text('number_employees', null, ['placeholder' => 'Number Of Employees', 'class' => 'fi fi-angle-right']) }}
                            </div>
                        </div>

                        <div class="row row-spaced">
                            <div class="span-12">
                                <label style="font-size: 12px">Message</label>
                                {{ Form::textarea('message', null, ['class' => 'required-field', 'required' => 'required']) }}
                            </div>
                        </div>


                        <div class="row row-spaced">
                            <div class="span-6">
                                <button class="button button-solid button-success"><i class="fa fa-check"></i> Submit Signup Request
                                </button>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    </div>
@stop
