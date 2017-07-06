@section('title', 'Executive Valet BDL Prepaid Cards')
@section('description', 'Save 30% or more on airport parking with Prepaid Parking Cards. Good for single day use!')


@extends('layouts.default', ['vueContent' => 'Default'])

@section('content')

    @include('elements.page_heading')
    @include('elements.page_title', ['page_title' => 'ORDER PREPAID CARDS'])
    @include('elements.sticky_header')

    <div id="page-wrapper">

        <div id="page-wrapper-bg-img"></div>

        <div class="container">
            <div class="row">
                <div class="span-6">
                    <h2>PREPAID CARDS</h2>
                    <p>EXECUTIVE VALET PREPAID CARDS ARE THE BEST DEAL IN BRADLEY AIRPORT PARKING!</p>
                    <br/>
                    <p>For faster check-in, please make a reservation in addition to your prepaid card order.</p>
                    <hr/>
                    <p>Prices shown in the drop down menu are plus 6.35% CT Sales Tax and 10.6% Airport Access Fee. Cards
                        must be purchased prior to 2 days before you travel and are non-refundable. Cards have no
                        expiration date. 10 Day minimum purchase required.</p>
                    <p>Additional days are $7.50 per day plus a 6.35% CT Sales Tax, and 10.6% Airport Access Fee.</p>

                </div>
                <div class="span-6">

                    <h2>Card Selection</h2>

                    @if (count($errors) > 0)
                        <div class="alert alert-danger">
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <form action="{{ route('prepaidcards.store') }}" method="POST">
                        {{ csrf_field() }}

                        <div class="row row-spaced">
                            <div class="span-12">
                                <h6>Select Card</h6>
                            </div>
                        </div>

                        <div class="row row-spaced">
                            <div class="span-6">
                                <label>Card Number</label>
                                {{ Form::select('card', $cards, null, ['class' => 'fi fi-angle-right'] ) }}
                            </div>
                            <div class="span-6">
                                <h5>NEW OR EXISTING CARD?</h5>
                                <input type="radio" name="new_card" value="true" checked v-model="prepaid_card"> Create
                                a new card<br/>
                                <input type="radio" name="new_card" value="false" v-model="prepaid_card"> Add the days
                                to my existing card

                                <div v-if="prepaid_card == 'false'">
                                    <br/>
                                    <h5>ENTER YOUR PREPAID CARD ID OR EXPRESS NUMBER:</h5>
                                    {{ Form::text('card_number', null, ['placeholder' => 'Card ID', 'class' => 'fi fi-angle-right']) }}
                                    <br/>
                                    Not sure what your number is?<br/>
                                    <ul>
                                        <li>Check the back of the card below the barcode</li>
                                        <li>A prepaid card ID is the letter 'P' followed by numbers</li>
                                        <li>Contact us if you're still unable to locate your number</li>
                                    </ul>
                                </div>

                            </div>
                        </div>


                        <div class="row row-spaced">
                            <div class="span-6">
                                <button class="button button-solid button-success"><i class="fa fa-check"></i> Add To Cart
                                </button>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    </div>
@stop
