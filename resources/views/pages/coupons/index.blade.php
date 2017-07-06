@section('title', 'Executive Valet BDL Parking Reservations')
@section('description', 'Bradley International Airport parking reservations, No Booking fee ! Book online, save time and money on Bradley Airport Parking!')

@extends('layouts.default', ['vueContent' => 'Default'])

@section('content')

    @include('elements.page_heading')
    @include('elements.page_title', ['page_title' => 'MAKE A RESERVATION'])
    @include('elements.sticky_header')

    <div id="checkout-search-criteria" class="general-page-section">

        <div id="page-wrapper-bg-img"></div>

        <div class="container">

            <h4 class="center">PLEASE ENTER RESERVATION DATES</h4>
            <h5 class="center">(I have already prepaid for the reservation)</h5>
            <br />

            @include('shared.errors')

            <form action="{{ route('search.store') }}" method="POST">

                {{ csrf_field() }}

                <input type="hidden" name="prepaid" value="1">

                <div class="row">

                    <div class="span-6">
                        <div class="row row-spaced">
                            <div class="span-6">
                                <label>PARKING ARRIVAL *</label>
                                <input type="text" name="arrivalDate" value="{{ session('arrivalDate') }}" id="date-picker-start"
                                       readonly="readonly" class="fi fi-calendar bbf-field" placeholder="Parking Arrival">
                            </div>
                            <div class="span-6">
                                <label>ARRIVAL TIME</label>
                                {{ Form::select('arrivalTime', $times, session('arrivalTime', '06:00'), ['class' => 'fi fi-clock-o bbf-field']) }}
                            </div>
                        </div>
                    </div>

                    <div class="span-6">
                        <div class="row row-spaced">
                            <div class="span-6">
                                <label>PARKING RETURN *</label>
                                <input type="text" name="returnDate" value="{{ session('returnDate') }}" id="date-picker-end"
                                       readonly="readonly" class="fi fi-calendar bbf-field" placeholder="Parking Return">
                            </div>
                            <div class="span-6">
                                <label>RETURN TIME</label>
                                {{ Form::select('returnTime', $times, session('returnTime', '19:00'), ['class' => 'fi fi-clock-o bbf-field']) }}
                            </div>
                        </div>
                    </div>

                </div>

                <br />
                <br />
                <br />

                <div style=" display: flex; justify-content: center; ">
                    <button class="button button-solid button-success"><i class="fa fa-check"></i> CONTINUE RESERVATION</button>
                </div>

            </form>

        </div>
    </div>
@stop
