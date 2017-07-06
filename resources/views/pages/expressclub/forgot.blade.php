@section('title', 'Forgot Password')

@extends('layouts.default', ['vueContent' => 'Default'])

@section('content')

    @include('elements.page_heading')
    @include('elements.page_title', ['page_title' => 'EXPRESS CLUB FORGOT PASSWORD'])
    @include('elements.sticky_header')

    <div id="page-wrapper">

        <div id="page-wrapper-bg-img" style="background-image: url('/assets/images/express-club-homepage.jpg')"></div>

        <div style="height:200px;"></div>

    </div>

    <div class="general-page-section">

        <div class="container">
            <div class="row">
                <div class="span-12">
                    <h3>Forgot Your Password?</h3>

                    @include('shared.errors')

                    <form action="{{ route('expressclub.requested') }}" method="POST">

                        {{ csrf_field() }}

                        <div class="row row-spaced">
                            <div class="span-12">
                                <h6>Please enter your email address below and we will send you an email with a new password.</h6>
                            </div>
                        </div>

                        <div class="row row-spaced">
                            <div class="span-12">
                                <label>Email (Your Username)</label>
                                {{ Form::text('email', null, ['placeholder' => 'you@youremail.com', 'class' => 'fi fi-envelope required-field', 'required' => 'required']) }}
                            </div>
                        </div>

                        <div class="row row-spaced">
                            <div class="span-6">
                                <button class="button button-solid button-success"><i class="fa fa-check"></i> Submit
                                </button>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    </div>
@stop
