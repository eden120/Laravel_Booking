@extends('layouts.default', ['vueContent' => 'Default'])

@section('content')

    @include('elements.page_heading')
    @include('elements.page_title', ['page_title' => 'EDIT RESERVATION'])
    @include('elements.sticky_header')

    <div id="page-wrapper">

        <div id="page-wrapper-bg-img"></div>

        <div class="container">
            <h4>Reservation Details</h4>

            <form action="{{ route('reservation.show') }}" method="POST">

                {{ csrf_field() }}

                <div class="row row-spaced">
                    <div class="span-6">
                        <label>First Name</label>
                        {{ Form::text('first_name', old('first_name', $reservation['first_name']), ['placeholder' => 'First Name', 'class' => 'fi fi-user required-field']) }}
                    </div>
                    <div class="span-6">
                        <label>Last Name</label>
                        {{ Form::text('last_name', old('last_name', $reservation['last_name']), ['placeholder' => 'First Name', 'class' => 'fi fi-user required-field']) }}
                    </div>
                </div>

                <div class="row row-spaced">

                    <div class="span-6">
                        <div class="row row-spaced">
                            <div class="span-6">
                                <label>PARKING ARRIVAL *</label>
                                <input type="text" name="arrival_date" value="{{ old('arrival_date', $reservation['arrival_date']) }}" id="date-picker-start"
                                       readonly="readonly" class="fi fi-calendar bbf-field" placeholder="Parking Arrival">
                            </div>
                            <div class="span-6">
                                <label>ARRIVAL TIME</label>
                                {{ Form::select('arrival_time', $times, old('arrival_time', $reservation['arrival_time']), ['class' => 'fi fi-clock-o bbf-field']) }}
                            </div>
                        </div>
                    </div>

                    <div class="span-6">
                        <div class="row row-spaced">
                            <div class="span-6">
                                <label>PARKING RETURN *</label>
                                <input type="text" name="return_date" value="{{ old('return_date', $reservation['arrival_date']) }}" id="date-picker-end"
                                       readonly="readonly" class="fi fi-calendar bbf-field" placeholder="Parking Return">
                            </div>
                            <div class="span-6">
                                <label>RETURN TIME</label>
                                {{ Form::select('return_time', $times, old('return_time', $reservation['return_time']), ['class' => 'fi fi-clock-o bbf-field']) }}
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row row-spaced">
                    <div class="span-6">
                        <label>Phone</label>
                        {{ Form::text('phone', old('phone', $reservation['phone']), ['placeholder' => 'Phone', 'class' => 'fi fi-ticket required-field']) }}
                    </div>
                    <div class="span-6">
                        <label>Email</label>
                        {{ Form::text('email', old('email', $reservation['email']), ['placeholder' => 'you@youremail.com', 'class' => 'fi fi-envelope required-field']) }}
                    </div>
                </div>

                <div class="row row-spaced">
                    <div class="span-12">
                        <h6>Your Vehicle</h6>
                    </div>
                </div>

                <div class="row row-spaced">
                    <div class="span-6">
                        <label>Vehicle Model</label>
                        {{ Form::text('vehicle_model',  old('phone', $reservation['vehicle_model']), ['placeholder' => 'Vehicle Model', 'class' => 'fi fi-car']) }}
                    </div>
                    <div class="span-6">
                        <label>Vehicle Color</label>
                        {{ Form::text('vehicle_color', old('phone', $reservation['vehicle_color']), ['placeholder' => 'Vehicle Color', 'class' => 'fi fi-angle-right']) }}
                    </div>
                </div>

                <div class="row row-spaced">
                    <div class="span-6">
                        <label>Vehicle License Plate</label>
                        {{ Form::text('vehicle_license_plate', old('phone', $reservation['vehicle_license_plate']), ['placeholder' => 'Vehicle License Plate', 'class' => 'fi fi-angle-right']) }}
                    </div>
                    <div class="span-6">
                        <label>Vehicle Registration State</label>
                        {{ Form::select('vehicle_state', $states, old('vehicle_state', $reservation['vehicle_license_plate']), ['class' => 'fi fi-angle-right'] ) }}
                    </div>
                </div>

                <div class="row row-spaced">
                    <div class="span-2">
                        <button class="button button-solid button-success">Cancel Reservation</button>
                    </div>
                    <div class="span-3">
                        <button class="button button-solid button-success">Edit Reservation</button>
                    </div>
                </div>

            </form>

        </div>
    </div>
@stop
