@section('title', 'About Executive Valet BDL')

@extends('layouts.default', ['vueContent' => 'Default'])

@section('content')

    @include('elements.page_heading')
    @include('elements.page_title', ['page_title' => 'ABOUT US'])
    @include('elements.sticky_header')

    <div id="page-wrapper">

        <div id="page-wrapper-bg-img"></div>

        <div class="container">
            <h4>About Us</h4>
            <p>The idea for Airport Valet parking at Bradley International Airport originated at a small mom and pop
                pizza shop. One day in 1978, a random person pulled in to Piccolo's Pizza Shop on Route 75 in Windsor
                Locks looking for a place to park for the duration of their vacation and a ride to the airport. Thus
                began Guy Piccolo's multi-dimensional entry and highly successful career in the world of valet
                parking.</p>
            <p>Guy's philosophy is simple: "Provide the people a good service and customers will keep coming back." This
                attitude has been the backbone of the business since its inception. Since 1978, Guy's valet parking
                facilities have grown to be Bradley International Airport's most popular parking spots. With his
                acquisition of Executive Valet Parking in 1997, now his sole business at Bradley, he has proven once
                again that this philosophy works.</p>
            <p>Executive Valet's popularity has been such that in 2011, across the street from the little old farmhouse
                the business started in, Guy built a brand new, state of the art home for Executive Valet Parking. The
                new facility boasts electric car chargers, and several more perks to enhance the
                user experience. Executive Valet is also ahead of the curve in technology, utilizing a system that
                assists in vehicle organization and customer recognition to ensure that customer expectations are
                exceeded.</p>
        </div>
    </div>
@stop
