@extends('layouts.default', ['vueContent' => 'Default'])

@section('content')

    @include('elements.page_heading')
    @include('elements.page_title', ['page_title' => 'TRAVEL AGENTS'])
    @include('elements.sticky_header')

    <div id="page-wrapper">

        <div id="page-wrapper-bg-img"></div>

        <div class="container">
            <br />
            <h3 style="text-align: center">Coming Soon</h3>
            <br />
            <br />
            <h5 style="text-align: center">Contact <a href="mailto:amber@executivevalet.com">Amber@executivevalet.com<a/> at 860-668-5272 if you need assistance.</h5>
            <br />

        </div>
    </div>
@stop
