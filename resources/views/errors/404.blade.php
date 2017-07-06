@extends('layouts.default', ['vueContent' => 'Default'])

@section('content')

    @include('elements.page_heading')
    @include('elements.page_title', ['page_title' => 'OOPS MISSING'])
    @include('elements.sticky_header')

    <div id="page-wrapper">

        <div id="page-wrapper-bg-img"></div>

        <div class="container">
            <h4>Sorry the page you are looking for cant be found!</h4>
        </div>
    </div>
@stop
