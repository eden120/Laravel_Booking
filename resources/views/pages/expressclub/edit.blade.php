@extends('layouts.default', ['vueContent' => 'Default'])

@section('content')

    @include('elements.page_heading')
    @include('elements.page_title', ['page_title' => 'EDIT EXPRESS CLUB ACCOUNT'])
    @include('elements.sticky_header')

    <div id="page-wrapper">

        <div id="page-wrapper-bg-img" style="background-image: url('/assets/images/express-club-homepage.jpg')"></div>

        <div style="height:200px;"></div>

    </div>

    <div class="general-page-section">

        <div class="container">
            <div class="row">
                <div class="span-2">

                </div>
                <div class="span-6">

                    <h2>Edit</h2>

                    @include('shared.errors')

                    <form action="{{ route('account.update') }}" method="POST">
                        {{ method_field('PUT') }}
                        {{ csrf_field() }}

                        <div class="row row-spaced">
                            <div class="span-12">
                                <h6>Your Information</h6>
                            </div>
                        </div>

                        <div class="row row-spaced">
                            <div class="span-6">
                                <label>First Name</label>
                                {{ Form::text('first_name', $account->first_name, ['placeholder' => 'First Name', 'class' => 'fi fi-user required-field', 'required' => 'required']) }}
                            </div>
                            <div class="span-6">
                                <label>Last Name</label>
                                {{ Form::text('last_name', $account->last_name, ['placeholder' => 'Last Name', 'class' => 'fi fi-user required-field', 'required' => 'required']) }}
                            </div>
                        </div>

                        <div class="row row-spaced">
                            <div class="span-6">
                                <label>Email (Your Username)</label>
                                {{ Form::text('email', $account->email, ['placeholder' => 'you@youremail.com', 'class' => 'fi fi-envelope required-field', 'required' => 'required']) }}
                            </div>
                            <div class="span-6">
                                <label>Choose A Password</label>
                                {{ Form::password('password', ['placeholder' => 'Choose A Password', 'class' => 'fi fi-ticket']) }}
                            </div>
                        </div>

                        <div class="row row-spaced">
                            <div class="span-6">
                                <label>Phone</label>
                                {{ Form::text('phone', $account->phone, ['placeholder' => 'Phone', 'class' => 'fi fi-phone']) }}
                            </div>
                            <div class="span-6">
                                <label>Address</label>
                                {{ Form::text('address', $account->address, ['placeholder' => 'Address', 'class' => 'fi fi-map-marker']) }}
                            </div>

                        </div>

                        <div class="row row-spaced">
                            <div class="span-6">
                                <label>City</label>
                                {{ Form::text('city', $account->city, ['placeholder' => 'City', 'class' => 'fi fi-angle-right']) }}
                            </div>
                            <div class="span-6">
                                <label>State</label>
                                {{ Form::text('state', $account->state, ['placeholder' => 'State', 'class' => 'fi fi-angle-right']) }}
                            </div>
                        </div>

                        <div class="row row-spaced">
                            <div class="span-6">
                                <label>Zipcode</label>
                                {{ Form::text('zipcode', $account->zipcode, ['placeholder' => 'Zipcode', 'class' => 'fi fi-angle-right']) }}
                            </div>
                        </div>


                        {{--<div class="row row-spaced">--}}
                            {{--<div class="span-12">--}}
                                {{--<h6>Your Vehicle</h6>--}}
                            {{--</div>--}}
                        {{--</div>--}}

                        {{--<div class="row row-spaced">--}}
                            {{--<div class="span-6">--}}
                                {{--<label>Vehicle Make</label>--}}
                                {{--{{ Form::text('vehicle[make]', null, ['placeholder' => 'Vehicle Make', 'class' => 'fi fi-car']) }}--}}
                            {{--</div>--}}
                            {{--<div class="span-6">--}}
                                {{--<label>Vehicle Color</label>--}}
                                {{--{{ Form::text('vehicle[model]', null, ['placeholder' => 'Vehicle Model', 'class' => 'fi fi-angle-right']) }}--}}
                            {{--</div>--}}
                        {{--</div>--}}

                        {{--<div class="row row-spaced">--}}
                            {{--<div class="span-6">--}}
                                {{--<label>Vehicle Model</label>--}}
                                {{--{{ Form::text('vehicle[color]', null, ['placeholder' => 'Vehicle Color', 'class' => 'fi fi-angle-right']) }}--}}
                            {{--</div>--}}
                        {{--</div>--}}

                        {{--<div class="row row-spaced">--}}
                            {{--<div class="span-6">--}}
                                {{--<label>Vehicle License Plate</label>--}}
                                {{--{{ Form::text('vehicle[license]', null, ['placeholder' => 'Vehicle License Plate', 'class' => 'fi fi-angle-right']) }}--}}
                            {{--</div>--}}
                            {{--<div class="span-6">--}}
                                {{--<label>Vehicle Registration State</label>--}}
                                {{--{{ Form::select('vehicle[state]', $states, old('CT'), ['class' => 'fi fi-angle-right'] ) }}--}}
                            {{--</div>--}}
                        {{--</div>--}}

                        <div class="row row-spaced">
                            <div class="span-6">
                                <button class="button button-solid button-success"><i class="fa fa-check"></i> Update</button>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    </div>
@stop
