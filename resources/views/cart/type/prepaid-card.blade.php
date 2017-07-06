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
    <div class="span-6">
        <label>Phone</label>
        {{ Form::text('phone', $phone, ['placeholder' => 'Phone', 'class' => 'fi fi-phone']) }}
    </div>
</div>


<div class="row row-spaced">
    <div class="span-12">
        <h6>Your Address</h6>
    </div>
</div>

<div class="row row-spaced">
    <div class="span-6">
        <label>Address</label>
        {{ Form::text('address', $address, ['placeholder' => 'Address', 'class' => 'fi fi-map-marker']) }}
    </div>
    <div class="span-6">
        <label>City</label>
        {{ Form::text('city', $city, ['placeholder' => 'City', 'class' => 'fi fi-angle-right']) }}
    </div>
</div>

<div class="row row-spaced">
    <div class="span-4">
        <label>State</label>
        {{ Form::select('state', $states, old('state', 'CT'), ['class' => 'fi fi-angle-right'] ) }}
    </div>
    <div class="span-6">
        <label>Zipcode</label>
        {{ Form::text('zip_code', $zipcode, ['placeholder' => 'Zipcode', 'class' => 'fi fi-angle-right']) }}
    </div>
</div>

