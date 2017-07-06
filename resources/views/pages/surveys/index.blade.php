@section('title', 'Executive Valet BDL Surveys')

@extends('layouts.default', ['vueContent' => 'Survey'])

@section('content')

    @include('elements.page_heading')
    @include('elements.page_title', ['page_title' => 'POST TRIP SURVEY'])
    @include('elements.sticky_header')

    <div id="page-wrapper">

        <div id="page-wrapper-bg-img"></div>

        <div class="general-page-section">

            <div class="container">

                <p>Your opinion is very important to us and we thank you for sharing this information about your experience at Executive Valet Parking. Every month, there will be a random winner picked from the list of these customer survey responses. The winner will receive a coupon for 3 free days of Parking with Executive Valet Parking.</p>
                <br />
                <br />
                @include('shared.errors')

                <form action="{{ route('surveys.store') }}" method="POST">

                    <div class="row">

                        {{ csrf_field() }}
                        <div class="span-6">

                            <div class="row row-spaced">
                                <div class="span-6">
                                    <label>first name *</label>
                                    {{ Form::text('first_name', null, ['placeholder' => 'first name', 'class' => 'fi fi-user required-field', 'required' => 'required']) }}
                                </div>
                                <div class="span-6">
                                    <label>last name *</label>
                                    {{ Form::text('last_name', null, ['placeholder' => 'last name', 'class' => 'fi fi-user required-field', 'required' => 'required']) }}
                                </div>
                            </div>

                            <div class="row row-spaced">
                                <div class="span-6">
                                    <label>email *</label>
                                    {{ Form::text('email', null, ['placeholder' => 'you@youremail.com', 'class' => 'fi fi-envelope required-field', 'required' => 'required']) }}
                                </div>
                                <div class="span-6">
                                    <label>phone</label>
                                    {{ Form::text('phone', null, ['placeholder' => 'phone', 'class' => 'fi fi-phone']) }}
                                </div>
                            </div>

                            <div class="row row-spaced">
                                <div class="span-6">
                                    <label>ticket number *</label>
                                    {{ Form::text('ticket_number', null, ['placeholder' => 'ticket number', 'class' => 'fi fi-angle-right required-field', 'required' => 'required']) }}
                                </div>
                            </div>

                            <div class="row row-spaced">
                                <div class="span-12">
                                    <label style="font-size: 12px">what can we do to improve our service? *</label>
                                    {{ Form::textarea('suggestion', null, ['class' => 'required-field', 'required' => 'required']) }}
                                </div>
                            </div>


                        </div>

                        <div class="span-6" style="text-align: right">

                            <div class="row row-spaced-small">
                                <div class="span-6">check-in *</div>
                                <div class="span-6" style="text-align: left">
                                    <span class="rating" data-target="#rating_check_in"></span>
                                    {{ Form::hidden('rating_check_in', null, ['id' => 'rating_check_in']) }}
                                </div>
                            </div>

                            <div class="row row-spaced-small">
                                <div class="span-6">friendliness of staff *</div>
                                <div class="span-6" style="text-align: left">
                                    <span class="rating" data-target="#rating_friendliness"></span>
                                    {{ Form::hidden('rating_friendliness', null, ['id' => 'rating_friendliness']) }}
                                </div>
                            </div>


                            <div class="row row-spaced-small">
                                <div class="span-6">shuttle to airport *</div>
                                <div class="span-6" style="text-align: left">
                                    <span class="rating" data-target="#rating_shuttle"></span>
                                    {{ Form::hidden('rating_shuttle', null, ['id' => 'rating_shuttle']) }}
                                </div>
                            </div>

                            <div class="row row-spaced-small">
                                <div class="span-6">busses *</div>
                                <div class="span-6" style="text-align: left">
                                    <span class="rating" data-target="#rating_busses"></span>
                                    {{ Form::hidden('rating_busses', null, ['id' => 'rating_busses']) }}
                                </div>
                            </div>

                            <div class="row row-spaced-small">
                                <div class="span-6">bus driver *</div>
                                <div class="span-6" style="text-align: left">
                                    <span class="rating" data-target="#rating_driver"></span>
                                    {{ Form::hidden('rating_driver', null, ['id' => 'rating_driver']) }}
                                </div>
                            </div>

                            <div class="row row-spaced-small">
                                <div class="span-6">shuttle pick-up *</div>
                                <div class="span-6" style="text-align: left">
                                    <span class="rating" data-target="#rating_pick_up"></span>
                                    {{ Form::hidden('rating_pick_up', null, ['id' => 'rating_pick_up']) }}
                                </div>
                            </div>

                            <div class="row row-spaced-small">
                                <div class="span-6">check-out *</div>
                                <div class="span-6" style="text-align: left">
                                    <span class="rating" data-target="#rating_check_out"></span>
                                    {{ Form::hidden('rating_check_out', null, ['id' => 'rating_check_out']) }}
                                </div>
                            </div>

                            <div class="row row-spaced-small">
                                <div class="span-6">cashier *</div>
                                <div class="span-6" style="text-align: left">
                                    <span class="rating" data-target="#rating_cashier"></span>
                                    {{ Form::hidden('rating_cashier', null, ['id' => 'rating_cashier']) }}
                                </div>
                            </div>

                            <div class="row row-spaced-small">
                                <div class="span-6">directions *</div>
                                <div class="span-6" style="text-align: left">
                                    <span class="rating" data-target="#rating_directions"></span>
                                    {{ Form::hidden('rating_directions', null, ['id' => 'rating_directions']) }}
                                </div>
                            </div>

                            @if(session('express_user'))
                                <div class="row row-spaced-small">
                                    <div class="span-6">express club *</div>
                                    <div class="span-6" style="text-align: left">
                                        <span class="rating" data-target="#rating_express_club"></span>
                                        {{ Form::hidden('rating_express_club', null, ['id' => 'rating_express_club']) }}
                                    </div>
                                </div>
                            @endif
                        </div>

                    </div>
                    <br />

                    <div class="row row-spaced">
                        <div class="span-6">
                            <label>can we contact you? *</label>
                            <br />
                            {{ Form::radio('contact_customer_ok', 1, true) }} yes, you may contact me<br />
                            {{ Form::radio('contact_customer_ok', 0) }} no, please do not contact me
                        </div>
                    </div>


                    <div class="row row-spaced">
                        <br />
                        <div class="span-5">&nbsp;</div>
                        <div class="span-4">
                            <button class="button button-solid button-success"><i class="fa fa-check"></i> submit</button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    </div>
@stop
