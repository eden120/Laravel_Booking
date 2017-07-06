<div class="row row-spaced">
    <div class="span-12">
        <h6>Your Information</h6>
    </div>
</div>

<div class="row row-spaced">
    <div class="span-6">
        <label>First Name</label>
        {{ Form::text('first_name', $first_name, ['placeholder' => 'First Name', 'class' => 'fi fi-user required-field', 'required' => 'required']) }}
    </div>
    <div class="span-6">
        <label>Last Name</label>
        {{ Form::text('last_name', $last_name, ['placeholder' => 'Last Name', 'class' => 'fi fi-user required-field', 'required' => 'required']) }}
    </div>
</div>

<div class="row row-spaced">
    <div class="span-6">
        <label>Email</label>
        {{ Form::text('email', $email, ['placeholder' => 'you@youremail.com', 'class' => 'fi fi-envelope required-field', 'required' => 'required']) }}
    </div>
    <div class="span-3">
        <label>Phone</label>
        {{ Form::text('phone', $phone, ['placeholder' => 'Phone', 'class' => 'fi fi-phone required-field', 'required' => 'required']) }}
    </div>
    <div class="span-3">
        <label>Zip Code</label>
        {{ Form::text('zipcode', $zipcode, ['placeholder' => 'Zipcode', 'class' => 'fi fi-angle-right']) }}
    </div>
</div>

<div class="row row-spaced">
    <div class="span-12">
        <h6>Flight Information</h6>
    </div>
</div>

<div class="row row-spaced">
    <div class="span-12">
        <label>Return Flight Number and Airline</label>
        <input type="text" placeholder="Return Flight Number and Airline" class="fi fi-plane">
    </div>
</div>

<div class="row row-spaced">
    <div class="span-12">
        <h6>Your Vehicle</h6>
    </div>
</div>

<div class="row row-spaced">
    <div class="span-6">
        <label>Vehicle Model</label>
        {{ Form::text('vehicle_model', null, ['placeholder' => 'Vehicle Model', 'class' => 'fi fi-car']) }}
    </div>
    <div class="span-6">
        <label>Vehicle Color</label>
        {{ Form::text('vehicle_color', null, ['placeholder' => 'Vehicle Color', 'class' => 'fi fi-angle-right']) }}
    </div>
</div>

<div class="row row-spaced">
    <div class="span-6">
        <label>Vehicle License Plate</label>
        {{ Form::text('vehicle_license_plate', null, ['placeholder' => 'Vehicle License Plate', 'class' => 'fi fi-angle-right']) }}
    </div>
    <div class="span-6">
        <label>Vehicle Registration State</label>
        {{ Form::select('vehicle_state', $states, old('vehicle_state', 'CT'), ['class' => 'fi fi-angle-right'] ) }}
    </div>
</div>
