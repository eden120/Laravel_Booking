<div class="product-item span-4" data-vehicle="{{$plan->vehicle_size}}" data-type="{{$plan->vehicle_size}}">
    <div class="frame match-height" style="height: 542px;">
        <div class="product-item-graphic">
            <div class="product-item-img" style="background-image: url({{ $plan->image }});"></div>
        </div>
        <div class="product-item-title">
            <strong>{{ $plan->description }}</strong>
        </div>
        <div class="product-item-desc">
            {{ $plan->notes }}
            <div class="product-item-fineprint">
                (*{{ strtoupper($plan->vehicle_size) }})
            </div>
            <div class="product-item-pricing">

                @if(isset($plan->fpp_cost))
                    <div class="product-item-sale-price">
                        <strong>{{ $plan->fpp_cost }} points</strong>
                    </div>
                @else
                    @if($plan->original_price < $plan->price)
                        <div class="product-item-base-price product-item-on-sale">${{ $plan->original_price }}</div>
                    @endif
                    <div class="product-item-sale-price">
                        @if($plan->original_price < $plan->price)
                            <span class="sticker sticker-brand-color-1">On Sale!</span><br>
                        @endif
                        <strong>${{ $plan->price }}</strong>
                    </div>
                @endif

            </div>
            <div class="product-item-footing">
                <div class="product-item-cart-action">
                    {{--<a href="#" @click.prevent="addCarCare({!! $plan->car_care_id !!})"--}}
                       {{--class="product-item-add-to-cart button button-solid button-success">--}}
                        {{--<i class="fa fa-plus"></i> Add to Cart</a> --}}
                    <button type="button"   class="product-item-add-to-cart button button-solid button-success " data-ccid="{{$plan->car_care_id}}"> <i class="fa fa-plus"></i> Add to Cart</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="carCaremodal" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
                <div id="home-booking-form" class="date_modal">
                    <div id="home-booking-form-inner">
                        <div id="home-booking-form-heading">
                            {{--<h1 class="fit-text">Find BDL Parking Rates</h1>--}}
                            {{--<p>Search for the best short stay &amp; long term Bradley Airport parking deals!</p>--}}
                        </div>
                        <div id="home-booking-form-wrap">
                            @include('shared.basic_booking_form')
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

{{--<div id="dialog" title="Dialog Title" style="display:none"> Some text</div>--}}
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

