@extends('layouts.default', ['vueContent' => 'Default'])

@section('content')

    @include('elements.page_heading')
    @include('elements.page_title', ['page_title' => 'Shopping Cart'])
    @include('elements.sticky_header')

    <div id="page-wrapper">

        <div id="page-wrapper-bg-img"></div>

        <div class="container">
            <br/>
            <br/>
            <br/>
            <h3 style="text-align: center">Currently you have no items in your cart.</h3>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    </div>
@stop
