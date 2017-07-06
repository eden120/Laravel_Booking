@extends('layouts.default', ['vueContent' => 'Default'])

@section('content')

    @include('elements.page_heading')
    @include('elements.page_title', ['page_title' => 'SURVEY COMPLETE'])
    @include('elements.sticky_header')

    <div id="page-wrapper">

        <div id="page-wrapper-bg-img"></div>

        <div class="container">
            <h4>Thank You</h4>
            <p>Thanks for taking the time to fill out our survey!</p>
        </div>
    </div>
@stop
