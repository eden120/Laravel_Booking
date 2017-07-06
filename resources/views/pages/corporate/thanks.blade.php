@extends('layouts.default', ['vueContent' => 'Default'])

@section('content')

    @include('elements.page_heading')
    @include('elements.page_title', ['page_title' => 'FORM SUBMITTED'])
    @include('elements.sticky_header')

    <div id="page-wrapper">

        <div id="page-wrapper-bg-img"></div>

        <div class="container">
            <h4>Signup Submitted</h4>
            <p>Thank you for your interest in our corporate program. We will contact you about your application.</p>
        </div>
    </div>
@stop
