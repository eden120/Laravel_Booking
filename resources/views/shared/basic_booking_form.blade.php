@include('shared.errors')

<form id="basic-booking-form" class="basic-booking-form" method="POST" action="{{ route('search.store') }}">

    {{ csrf_field() }}

    <input type="hidden" name="prepaid" value="0">

    <div class="bbf-col-1">
        <div class="bbf-date-field-wrap">
            <label>Parking Arrival</label>
            <input type="text" name="arrivalDate" value="{{ session('arrivalDate') }}" id="date-picker-start"
                   readonly="readonly" class="fi fi-calendar bbf-field" placeholder="Parking Arrival">
        </div>
        <div class="bbf-time-field-wrap">
            {{ Form::select('arrivalTime', $times, session('arrivalTime', '06:00'), ['class' => 'fi fi-clock-o bbf-field']) }}
        </div>
    </div>

    <div class="bbf-col-2">
        <div class="bbf-date-field-wrap">
            <label>Parking Return</label>
            <input type="text" name="returnDate" value="{{ session('returnDate') }}" id="date-picker-end"
                   readonly="readonly" class="fi fi-calendar bbf-field" placeholder="Parking Return">
        </div>
        <div class="bbf-time-field-wrap">
            {{ Form::select('returnTime', $times, session('returnTime', '19:00'), ['class' => 'fi fi-clock-o bbf-field']) }}
        </div>
    </div>

    <div class="bbf-col-3">
        <div class="bbf-promocode-field-wrap">
            <label>Promo Code</label>
            <input type="text" name="promo_code" value="{{ session('promo_code') }}" class="fi fi-hand-o-right bbf-field"
                   placeholder="Promo Code">
        </div>
    </div>

    <div class="bbf-col-4">
        <button id="bbf-submit-button" @click.prevent='showLoader()'><i class="fa fa-long-arrow-right bbf-submit-button"></i> Search Rates</button>
    </div>
</form>


