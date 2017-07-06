@extends('layouts.default', ['vueContent' => 'Default'])

@section('content')

    @include('elements.page_heading')
    @include('elements.page_title', ['page_title' => 'Frequently Asked Questions'])
    @include('elements.sticky_header')

    <div id="page-wrapper">

        <div id="page-wrapper-bg-img"></div>

        <div class="container">

            @foreach($faqs as $faq)
            <button class="accordion">{!! $faq->question !!}</button>
            <div class="panel">
                <p>{!! $faq->answer !!}</p>
            </div>
            @endforeach

        </div>
    </div>
@stop

@section('footer_js')

    <script>
        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].onclick = function(){
                this.classList.toggle("active");
                this.nextElementSibling.classList.toggle("show");
            }
        }
    </script>
@stop
