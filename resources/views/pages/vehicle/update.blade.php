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

                    <form action="{{ route('vehicle.store') }}" method="POST">
                        {{ method_field('PUT') }}
                        {{ csrf_field() }}

                        <div class="row row-spaced">
                            <div class="span-12">
                                <h6>Vehicle Information</h6>
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
                                <button class="button button-solid button-success"><i class="fa fa-check"></i> Update</button>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    </div>
@stop
