@extends('layouts.default', ['vueContent' => 'Cart'])

@section('content')

    @include('elements.page_heading')
    @include('elements.page_title', ['page_title' => 'RESERVATION DETAILS'])
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

                            <div class="row row-spaced">
                                <div class="span-12">
                                    <label><input type="checkbox" name="terms" class=""> I agree to the <a href="#">Terms of Use</a></label>
                                </div>
                            </div>

                            <div class="row row-spaced">
                                <div class="span-6">
                                    <button class="button button-solid button-success"><i class="fa fa-check"></i>
                                        COMPLETE RESERVATION
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
