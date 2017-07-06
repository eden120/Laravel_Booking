@section('title', 'Executive Valet BDL Prepaid Card Balance Check')
@section('description', '')

@extends('layouts.default', ['vueContent' => 'Default'])

@section('content')

    @include('elements.page_heading')
    @include('elements.page_title', ['page_title' => 'PREPAID CARD BALANCE & HISTORY'])
    @include('elements.sticky_header')

    <div id="page-wrapper">

        <div id="page-wrapper-bg-img"></div>

        <div class="container">
            <h4>Prepaid Card Balance</h4>
            <p>Please enter your prepaid card number and the last name on the card to check your balance.</p>
            <form action="">

                <div class="row row-spaced">
                    <div class="span-6">
                        <label>PREPAID CARD NUMBER</label>
                        <input type="text" placeholder="First Name" class="fi fi-user required-field" required>
                    </div>
                    <div class="span-6">
                        <label>Last Name</label>
                        <input type="text" placeholder="Last Name" class="fi fi-user required-field" required>
                    </div>
                </div>

                <div class="row row-spaced">
                    <div class="span-12">
                        <button class="button button-solid button-success">Get Balance</button>
                    </div>
                </div>

            </form>

        </div>
    </div>
@stop
