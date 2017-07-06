@extends('layouts.default', ['vueContent' => 'Default'])

@section('content')

    @include('elements.page_heading')
    @include('elements.page_title', ['page_title' => 'EDIT EXPRESS CLUB VEHICLE'])
    @include('elements.sticky_header')


    <div class="general-page-section">

        <div class="container">
            <div class="row">
                <div class="span-2">

                </div>
                <div class="span-8">

                    @include('shared.errors')

                    <form action="{{ route('vehicle.update', $vehicle->vehicle_id) }}" method="POST">
                        {{ csrf_field() }}
                        {{ method_field('PUT') }}

                        <div class="row row-spaced">
                            <div class="span-12">
                                <h6>Vehicle Information</h6>
                            </div>
                        </div>

                        <div class="row row-spaced">
                            <div class="span-6">
                                <label>Vehicle Make</label>
                                {{ Form::text('make', old('make', $vehicle->make), ['placeholder' => 'Vehicle Make', 'class' => 'fi fi-car']) }}
                            </div>
                            <div class="span-6">
                                <label>Vehicle Model</label>
                                {{ Form::text('model', old('make', $vehicle->model), ['placeholder' => 'Vehicle Model', 'class' => 'fi fi-angle-right']) }}
                            </div>
                        </div>

                        <div class="row row-spaced">
                            <div class="span-6">
                                <label>Vehicle Color</label>
                                {{ Form::text('color', old('make', $vehicle->color), ['placeholder' => 'Vehicle Color', 'class' => 'fi fi-angle-right']) }}
                            </div>
                        </div>

                        <div class="row row-spaced">
                            <div class="span-6">
                                <label>Vehicle License Plate</label>
                                {{ Form::text('license', old('make', $vehicle->license), ['placeholder' => 'Vehicle License Plate', 'class' => 'fi fi-angle-right']) }}
                            </div>
                            <div class="span-6">
                                <label>Vehicle Registration State</label>
                                {{ Form::select('state', $states, old('CT', $vehicle->state), ['class' => 'fi fi-angle-right'] ) }}
                            </div>
                        </div>

                        <div class="row row-spaced">
                            <div class="span-6">
                                <button class="button button-solid button-success"><i class="fa fa-check"></i> Update Vehicle</button>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    </div>
@stop
