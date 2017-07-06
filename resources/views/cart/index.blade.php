@extends('layouts.default', ['vueContent' => 'Cart'])

@section('content')

    @include('elements.page_heading')
    @include('elements.page_title', ['page_title' => 'Cart'])
    @include('elements.sticky_header')

    <div id="checkout-search-criteria" class="general-page-section">

        <div class="container">
            <div class="row">

                <div class="span-4">
                    <h6>Cart Contents</h6>
                    @include('elements.blocks.cart_contents')
                </div>

                <div class="span-8">

                    @include('shared.errors')

                    <form validation method="POST"  action="{{ route('checkout.store') }}">

                        {{ csrf_field() }}

                        <div class="frame">

                            @include('cart.type.' . str_slug(collect($cart->cart_items)->first()->rate_type))

                            @if ($card_required)
                                <div class="row row-spaced">
                                    <div class="span-12">
                                        <h6>Credit Card Details</h6>
                                    </div>
                                </div>

                                <div class="row row-spaced">
                                    <div class="span-8">
                                        <label>Card Number</label>
                                        {{ Form::number('credit_card_number', null, ['placeholder' => 'Credit Card Number', 'class' => 'fi fi-lock required-field', 'required' => 'required']) }}
                                    </div>
                                    <div class="span-4">
                                        {{ Form::select('credit_card_type', $cards, null, ['class' => 'fi fi-angle-right'] ) }}
                                    </div>
                                </div>

                                <div class="row row-spaced">
                                    <div class="span-8">
                                        <label>Exp Date</label>
                                        <div class="row">
                                            <div class="span-6">
                                                {{ Form::select('credit_card_year', $years, null, ['class' => 'fi fi-angle-right'] ) }}
                                            </div>
                                            <div class="span-6">
                                                {{ Form::select('credit_card_month', $months, null, ['class' => 'fi fi-angle-right'] ) }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span-4">
                                        <label>CVV Code</label>
                                        <div class="row">
                                            <div class="span-6">
                                                {{ Form::text('credit_card_cvv', null, ['placeholder' => 'CVV', 'class' => 'fi fi-angle-right required-field', 'required' => 'required']) }}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            @endif

                            <div class="row row-spaced">
                                <div class="span-12">
                                    <label>
                                        <input type="checkbox" class=""> I would like to sign up for the Express club,
                                        the first year is free</label>
                                </div>
                                <div class="span-12">
                                    <label><input type="checkbox" name="terms" class=""> I agree to the <a href="{{ route('terms') }}">Terms of Use</a></label>
                                </div>
                            </div>

                            <div class="row row-spaced">
                                <div class="span-12">
                                    <h6>Cancellation/Refund Policy</h6>
                                    <p>
                                        {{ $refund_policy }}
                                    </p>
                                </div>
                            </div>

                            <div class="row row-spaced">
                                <div class="span-6">
                                    <button class="button button-solid button-success"><i class="fa fa-check"></i>
                                        Submit &amp; Reserve
                                    </button>
                                </div>

                                <div id="checkout-form-trust" class="span-6">
                                    <span id="checkout-form-starfield" class="checkout-form-trust-item">
                                        <img src="/assets/images/VS_PL_light.gif" alt="Starfield SSL Secure">
                                    </span>
                                </div>

                            </div>

                        </div>
                    </form>

                </div>

            </div>
        </div>

    </div>

@stop
