@extends('layouts.default', ['vueContent' => 'Default'])

@section('content')

    @include('elements.page_heading')
    @include('elements.page_title', ['page_title' => ''])
    @include('elements.sticky_header')

    <div id="page-wrapper">

        <div id="page-wrapper-bg-img"></div>

        <div class="container">
            <br />
            <br />
            <br />
            <h4 style="text-align: center">You are now being redirected to <a href="http://www.executivevaletftmyers.com">www.executivevaletftmyers.com</a></h4>
            <br />
            <br />
            <br />
        </div>
    </div>
@stop

@section('footer_js')
    <script>
        setTimeout(function(){
            window.location = 'http://www.executivevaletftmyers.com';
        }, 2000);
    </script>
@stop
