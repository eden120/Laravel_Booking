@extends('layouts.default', ['vueContent' => 'Default'])

@section('content')

    @include('elements.page_heading')
    @include('elements.page_title', ['page_title' => 'TITLE'])
    @include('elements.sticky_header')

    <div id="page-wrapper">

        <div id="page-wrapper-bg-img"></div>

        <div class="container">
            <h4>Heading</h4>
            <div class="row">
                <div class="span-6">Left</div>
                <div class="span-6">Right</div>
            </div>
        </div>
    </div>
@stop
