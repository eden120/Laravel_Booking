<div class="span-6">
    <div class="frame frame-nil parking-product-item match-height">

        <div class="parking-product-col-1">
            <div class="parking-product-best-rate-ribbon">
                <i class="elf-best-rate"></i>
            </div>
            <div class="parking-product-item-title">
                <h5>{{ $rate->rate }}</h5>
            </div>

        </div>

        <div class="parking-product-col-2">
            <div class="parking-product-item-price">

            </div>
        </div>

        <div>You have made a reservation for the above dates and will provide a receipt of the prepayment at checkin</div>

        <div class="parking-product-item-addtocart">
            <a href="#"
               @click.prevent="addToCart('{{$rate->meta->digest}}', '{{$rate->rate_group}}')"
               class="button button-solid button-success parking-item-add-to-cart"
            ><i class="fa fa-plus"></i> Make Reservation</a>
        </div>

    </div>
</div>