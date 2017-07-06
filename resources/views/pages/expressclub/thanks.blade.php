@extends('layouts.default', ['vueContent' => 'Default'])

@section('content')

    @include('elements.page_heading')
    @include('elements.page_title', ['page_title' => 'EXPRESS CLUB REGISTRATION COMPLETE'])
    @include('elements.sticky_header')

    <div id="page-wrapper">

        <div id="page-wrapper-bg-img"></div>

        <div class="container">
            <h4>Thank you for creating an account.</h4>
            <div class="row">
                <p>You are now able to login into your account with the details you have provided.</p>
            </div>
        </div>
    </div>
@stop
