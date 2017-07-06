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



                <div class="row row-spaced">
                    <div class="span-6">
                        <label>First Name</label>
                        {{ Form::text('first_name', null, ['placeholder' => 'First Name', 'class' => 'fi fi-user required-field']) }}
                    </div>
                    <div class="span-6">
                        <label>Last Name</label>
                        {{ Form::text('last_name', null, ['placeholder' => 'First Name', 'class' => 'fi fi-user required-field']) }}
                    </div>
                </div>

                <div class="row row-spaced">
                    <div class="span-6">
                        <label>Reservation ID</label>
                        {{ Form::text('reservation_id', null, ['placeholder' => 'Reservation ID', 'class' => 'fi fi-ticket required-field']) }}
                    </div>
                    <div class="span-6">
                        <label>Email</label>
                        {{ Form::text('email', null, ['placeholder' => 'you@youremail.com', 'class' => 'fi fi-envelope required-field']) }}
                    </div>
                </div>

                <div class="row row-spaced">
                    <div class="span-12">
                        <button class="button button-solid button-success">Find Reservation</button>
                    </div>
                </div>

            </form>

        </div>
    </div>
@stop
