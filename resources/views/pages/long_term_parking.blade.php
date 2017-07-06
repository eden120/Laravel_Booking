@section('title', 'Long Term Parking Bradley Airport (BDL) - Prepaid Discounts')
@section('description', 'Executive Valet offers great savings on long term parking with a range of online prepay options. Reserve your BDL parking space today')

@extends('layouts.default', ['vueContent' => 'Default'])

@section('content')

    @include('elements.page_heading')
    @include('elements.page_title', ['page_title' => 'BRADLEY AIRPORT LONG TERM PARKING (BDL) & FREQUENT FLIER DEALS'])
    @include('elements.sticky_header')

    <div id="page-wrapper">

        <div id="page-wrapper-bg-img" style="background-image: url('/assets/images/prepaid_cards.jpg')"></div>

        <div class="container">
            <p>If you travel regularly or require long term parking for Bradley International Airport then our prepaid cards are the best deal you will find! For frequent short stay fliers prepaid cards are a great way to save and a more convenient way to purchase parking compared to making multiple transactions.</p>
            <br/>
            <div class="row">

                <div class="row">
                    <div class="span-6" style="text-align: center">
                        <h4>Prepaid Cards</h4>
                        <img src="{{ asset('assets/images/prepaid-card.png') }}" alt="">
                        <h6 style="color: #BD2E2B">SAVE WITH OUR PREPAID CARDS — ONLY $7.50 A DAY!</h6>
                        <a href="{!! route('prepaidcards.index') !!}" class="button button-solid button-brand-color-1">Order
                            Now</a>
                        <h6 style="color: #BD2E2B">Already Have a Prepaid Card?</h6>
                        <a href="{!! route('prepaidcard_balance') !!}" class="button button-solid button-brand-color-2">Check
                            Prepaid Card Balance</a>
                    </div>
                    <div class="span-5 offset-1">
                        <div class="box box-dark box-jumbo box-margin-nil">
                            <ul>
                                <li>Prepaid parking is now available for $7.50 a day with a minimum 10 day purchase.
                                    Our regular posted rate is $11.95 a day.
                                </li>
                                <li>Prepaid parking cards are reusable, transferable, and never expire!</li>
                                <li>If you travel frequently and need flexibility but want to save money, then this is the product for you. These cards are good for single or multiple days of parking.</li>
                                <li>*Prices are subject to CT Sales Tax and Airport Access Fee.</li>
                            </ul>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
@stop
