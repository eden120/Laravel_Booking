@foreach($cart->cart_items as $line)
    @include('cart.items.' . str_slug($line->rate_type), ['line' => $line])
@endforeach

@unless($search && $search->prepaid)
    <div id="cart-total-area">
        <div class="row">
            <div class="span-12">
                <p class="small">NOTE: Price is only valid if reservation is prepaid online. If prepayment is not made,
                    standard rate will apply at the lot. Reservations have a 2-hour grace period.</p>
            </div>
        </div>
        <div class="row">
            <div class="span-12">
                <div class="cart-total">
                    @if ($cart->total_due_at_checkout > 0)
                        <strong>Total Due Now:</strong> <span class="cart-subtotal">${!! $cart->parking_due_at_checkout !!}</span><br>
                    @endif
                    @if ($cart->total_due_at_lot > 0)
                        <strong>Total Due At Lot:</strong> <span class="cart-subtotal">${!! $cart->total_due_at_lot !!}</span><br>
                    @endif
                    @if ($cart->total_taxes_and_fees > 0)
                        <strong>Taxes &amp; Fees :</strong> <span class="cart-tax">${!! $cart->total_taxes_and_fees !!}</span><br>
                    @endif
                    <h4><strong>Grand Total:</strong> <span class="cart-grand-total">${!! $cart->grand_total !!}</span></h4>
                </div>
            </div>
        </div>

    </div>
@endif