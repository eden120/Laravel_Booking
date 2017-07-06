@extends('layouts.default', ['vueContent' => 'Default'])

@section('content')

    @include('elements.page_heading')
    @include('elements.page_title', ['page_title' => 'OOPS MISSING'])
    @include('elements.sticky_header')

    <div id="page-wrapper">

        <div id="page-wrapper-bg-img"></div>

        <div class="container">
            <h4>Sorry were experiencing a problem. We have been notified of this error.</h4>
            <h5>Please continue to are <a href="{{ route('home') }}">home page</a>.</h5>
        </div>
    </div>
@stop

