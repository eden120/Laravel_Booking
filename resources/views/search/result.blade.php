<div class="span-6">
    <div class="frame frame-nil parking-product-item match-height">

        <div class="parking-product-col-1">

            @if($rate->rate_group == 'Prepay')
                <div class="parking-product-best-rate-ribbon">
                    <i class="elf-best-rate"></i>
                </div>
                <div class="parking-product-item-title">
                    <h5>{{ $rate->days }}-Day Prepaid Rate<br /> Pay Online Now &amp; Save!</h5>
                </div>
            @else
                <div class="parking-product-item-title">
                    <h5>{{ $rate->days }}-Day Posted Rate<br /> This Amount Due at Check-In</h5>
                </div>
            @endif

        </div>

        <div class="parking-product-col-2">
            <div class="parking-product-item-price">
                ${{ $rate->parking }}
            </div>
        </div>

        <div class="parking-product-item-addtocart">
            <a href="#"
               @click.prevent="addToCart('{{$rate->meta->digest}}', '{{$rate->rate_group}}')"
               class="button button-solid button-success parking-item-add-to-cart"
            ><i class="fa fa-plus"></i> Add To Cart</a>
        </div>

    </div>
</div>
