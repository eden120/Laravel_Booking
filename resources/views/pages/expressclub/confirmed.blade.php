@section('title', 'Forgot Password')

@extends('layouts.default', ['vueContent' => 'Default'])

@section('content')

    @include('elements.page_heading')
    @include('elements.page_title', ['page_title' => 'EXPRESS CLUB PASSWORD REQUESTED'])
    @include('elements.sticky_header')

    <div id="page-wrapper">

        <div id="page-wrapper-bg-img" style="background-image: url('/assets/images/express-club-homepage.jpg')"></div>

        <div style="height:200px;"></div>

    </div>

    <div class="general-page-section">

        <div class="container">
            <div class="row">
                <div class="span-12">
                    <h3>Thank You</h3>

                    <div class="row row-spaced">
                        <div class="span-12">
                            <h6>We will shortly send you an email with your new password.</h6>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
@stop
