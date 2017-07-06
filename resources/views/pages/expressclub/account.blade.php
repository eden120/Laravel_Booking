@extends('layouts.default', ['vueContent' => 'Default'])

@section('content')

    @include('elements.page_heading')
    @include('elements.page_title', ['page_title' => 'WELCOME ' . strtoupper($response->first_name)])
    @include('elements.sticky_header')

    <div id="page-wrapper">

        <div id="page-wrapper-bg-img"></div>

        <div class="container">

            <div class="row">

                <div class="span-4">

                    <div class="box box-nil">
                        <div class="box box-secondary">Your Points</div>
                        <div class="box box-margin-cozy">
                            <p>You currently have {{ $response->fpp }} points.</p>
                            <hr>
                        </div>
                    </div>

                    <div class="box box-nil">
                        <div class="box box-secondary">Your Account Information</div>
                        <div class="box box-margin-cozy">

                            <p><strong>Account Number:</strong> {{ $response->id }}</p>
                            <br />
                            <p><strong>First Name:</strong> {{ $response->first_name }}</p>
                            <p><strong>Last Name:</strong> {{ $response->last_name }}</p>
                            <p><strong>Email:</strong> {{ $response->email }}</p>
                            <p><a href="{{ route('account.edit') }}">edit account</a></p>

                            <p><a href="{{ route('account.logout') }}">logout</a></p>
                        </div>
                    </div>

                    <div class="box box-nil">
                        <div class="box box-secondary">Your Vehicles</div>
                        <div class="box box-margin-cozy">
                            @if(count($response->vehicles))
                                @foreach($response->vehicles as $vehicle)
                                    <p>{{ $vehicle->make }} {{ $vehicle->model }} ({{ $vehicle->license }})
                                        <a href="{{ route('vehicle.edit', $vehicle->vehicle_id) }}">edit</a> |
                                        <a href="{{ route('vehicle.destroy', $vehicle->vehicle_id) }}">delete</a>
                                    </p>
                                @endforeach
                                <br />
                            @endif
                            <p><a href="{{ route('vehicle.create') }}">Add Vehicle</a></p>
                        </div>
                    </div>

                </div>

                <div class="span-8">

                    @if (session('success'))
                        <div class="alert alert-success">
                            {{ session('success') }}
                        </div>
                    @endif

                    @if(count($future->reservations))
                        <h4>Future Reservations</h4>
                        @foreach($future->reservations as $res)
                            <div class="box box-nil">
                                <div class="box box-secondary">Reservation</div>
                                <div class="box box-margin-cozy">
                                    <div class="row">
                                        <div class="span-8">
                                            Parking Arrival: {{ $res->arrival_date }}<br />
                                            Parking Return: {{ $res->return_date }}<br />
                                            Vehicle: {{ $res->vehicle_model }} ({{ $res->vehicle_license_plate }})
                                        </div>
                                        <div class="span-4">
                                            Total: {{ $res->prepaid_amount }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    @endif

                    @if(count($past->tickets))
                        <h4>Past Reservations</h4>
                        @foreach($past->tickets as $res)
                            <div class="box box-nil">
                                <div class="box box-secondary">Reservation ({{ $res->ticket_number }})</div>
                                <div class="box box-margin-cozy">
                                    <div class="row">
                                        <div class="span-8">
                                            Parking Arrival: {{ $res->arrival_date }}<br />
                                            Parking Return: {{ $res->return_date }}<br />

                                        </div>
                                        <div class="span-4">
                                            Total: {{ $res->grand_total }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    @endif


                </div>
        </div>
    </div>
@stop
