
<div id="cart-item-{!! $line->meta->cart_item_id !!}">

    <div class="frame frame-cozy frame-margin-tight cart-item">

        <div class="cart-item-col-1">
            <strong>{{ $line->days }}-Day Prepaid Card Rate</strong>
        </div>

        <div class="cart-item-col-4 ">
            <div class="cart-item-price">
                Prepaid Parking: ${!! number_format($line->parking, 2) !!}<br>
                Tax & Fees: ${!! number_format($line->taxes, 2) !!}<br>
                Subtotal: ${!! number_format($line->total, 2) !!}
            </div>
        </div>
        <div class="cart-item-col-5">
            <a href="#" @click.prevent="removeItem({!! $line->meta->cart_item_id !!})" class="cart-item-removal"><i class="fa fa-times"></i> Remove</a>
        </div>
    </div>

</div>