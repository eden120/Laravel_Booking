
<?php
//echo "<pre>";
//print_r($search);die;

?>

<div id="cart-item-{!! $line->meta->cart_item_id !!}">
    <div class="frame frame-cozy frame-margin-tight cart-item">

        <div class="cart-item-col-1">
            @if($line->rate_group == 'Prepay')
                <strong>{{ $line->days }}-Day Prepaid Rate<br /> Pay Online Now &amp; Save!</strong>
            @else
                <strong>{{ $line->days }}-Day Posted Rate<br /> This Amount Due at Check-In</strong>
            @endif
        </div>

        <div class="cart-item-col-2">
            <div class="cart-item-col-label">
                Arrival
            </div>
            {!! $line->arrival_date !!}
        </div>

        <div class="cart-item-col-3">
            <div class="cart-item-col-label">
                Return
            </div>
            {!! $line->return_date !!}
        </div>

        <div class="cart-item-edit-col">
            <a href="/cart/clean"><i class="fa fa-pencil"></i> Edit</a>
        </div>


        @if(isset($search) && !$search->prepaid)
            <div class="cart-item-col-4 ">
                <div class="cart-item-price">
                    ${!! $line->parking !!}
                    @if($points && $points > 45)
                        @if( ! isset($line->payment_method) && $line->payment_method !=  'points')
                        &nbsp; &nbsp;   <a href="/cart/points/{{$line->meta->cart_item_id}}">Use Points (45)</a>
                        @else
                            (45 points used)
                        @endif
                    @endif
                </div>
            </div>
        @endif

        <div class="cart-item-col-5">
            <a href="#" @click.prevent="removeItem({!! $line->meta->cart_item_id !!})" class="cart-item-removal"><i class="fa fa-times"></i> Remove</a>
        </div>
    </div>

    @if(isset($line->requested_services) && count($line->requested_services))

        @foreach($line->requested_services as $extra)

            <div class="frame frame-cozy frame-margin-tight cart-item" id="cart-service-item-{{ $extra->car_care_id }}">
                <div class="cart-item-col-1">
                    <strong>{!! $extra->description !!}</strong>
                </div>
                <div class="cart-item-col-4 cart-item-regular-product">
                    @if(isset($extra->fpp_cost))
                        <div class="cart-item-price ">{!! $extra->fpp_cost !!} points</div>
                    @else§
                        <div class="cart-item-price ">${!! $extra->price !!}</div>
                    @endif
                </div>
                <div class="cart-item-col-5">
                <a href="#" @click.prevent="removeService({{  $line->meta->cart_item_id  }}, {{ $extra->car_care_id }})" class="cart-item-removal"><i class="fa fa-times"></i> Remove</a>
                </div>
            </div>
        @endforeach
    @endif
</div>