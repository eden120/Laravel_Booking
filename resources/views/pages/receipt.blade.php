@extends('layouts.default', ['vueContent' => 'Default'])

@section('content')

    @include('elements.page_heading')
    @include('elements.page_title', ['page_title' => 'YOUR ORDER IS COMPLETE'])
    @include('elements.sticky_header')

    <div id="page-wrapper">

        <div id="page-wrapper-bg-img"></div>

        <div class="container">
            <p>A complete summary of your reservation confirmation will be sent to your email momentarily. Please print this page or the e-mail and bring it with you for check-in.</p>
            <p>A summary of your order is displayed below.</p>
            <h4 class="red">THANK YOU FOR USING EXECUTIVE VALET!</h4>

            <hr>

            <h4>Order Details</h4>

            @foreach($receipt->products as $product)

                <div class="box box-nil">
                    <div class="box box-secondary">{!! $product->product_type !!}</div>
                    <div class="box box-margin-cozy">

                        <div class="row">
                            <div class="span-6">

                                @if(isset($product->arrival_date))
                                    <b>Parking Arrival:</b> &nbsp;{!! $product->arrival_date !!}<br />
                                    <b>Parking Return:</b> &nbsp;{!! $product->return_date !!}<br />
                                @endif

                                <p>{!! DNS1D::getBarcodeHTML($product->id, "C128", 2, 70) !!}
                                <p>#{!! $product->id !!}</p>

                            </div>
                            <div class="span-6" style="text-align: right">

                                <div class="row">
                                    <div class="span-9">Prepaid Parking</div>
                                    <div class="span-3">${!! $product->parking !!}</div>
                                </div>

                                @if (isset($product->promo_code) && $product->promo_code)
                                    <div class="row">
                                        <div class="span-9">Promo Code</div>
                                        <div class="span-3">{!! $product->promo_code !!}</div>
                                    </div>
                                @endif

                                @if ($product->services > 0)
                                    @foreach($product->requested_services as $service)
                                        <div class="row">
                                            <div class="span-9">{{ $service->description }}</div>
                                            <div class="span-3">${!! $service->price !!}</div>
                                        </div>
                                    @endforeach
                                @endif

                                @if ($product->parking_sales_tax > 0)
                                    <div class="row">
                                        <div class="span-9">Sales Tax</div>
                                        <div class="span-3">${!! $product->parking_sales_tax !!}</div>
                                    </div>
                                @endif

                                @if ($product->parking_airport_tax > 0)
                                    <div class="row">
                                        <div class="span-9">Airport Access Fee</div>
                                        <div class="span-3">${!! $product->parking_airport_tax !!}</div>
                                    </div>
                                @endif

                                @if ($product->services_sales_tax > 0)
                                    <div class="row">
                                        <div class="span-9">Sales Tax</div>
                                        <div class="span-3">${!! $product->services_sales_tax !!}</div>
                                    </div>
                                @endif

                                @if ($product->services_airport_tax > 0)
                                    <div class="row">
                                        <div class="span-9">Airport Services Tax</div>
                                        <div class="span-3">${!! $product->services_airport_tax !!}</div>
                                    </div>
                                @endif

                                @if ($product->options > 0)
                                    <div class="row">
                                        <div class="span-9">Fuel Surcharge</div>
                                        <div class="span-3">${!! $product->options !!}</div>
                                    </div>
                                @endif

                                <div class="row">
                                    <div class="span-9">Total</div>
                                    <div class="span-3">${!! $product->total !!}</div>
                                </div>

                                @if ( ! isset($receipt->fpp_total) && $receipt->grand_total == 0)
                                    <br />
                                    <div class="frame frame-brand-color-1">This reservation has been prepaid, please bring your prepaid form of payment with you to present at check in.</div>
                                @endif

                            </div>
                        </div>



                    </div>
                </div>

            @endforeach

            @if (isset($receipt->fpp_total))
                <h4 style="text-align: right">Grand Total ${!! $receipt->grand_total !!} ({{$receipt->fpp_total}} points used) </h4>
            @else
                <h4 style="text-align: right">Grand Total ${!! $receipt->grand_total !!}</h4>
            @endif

        </div>
    </div>
@stop

@section('footer_js')
    <script>
        ga('require', 'ecommerce');

        ga('ecommerce:addTransaction', {
            'id': '{{ $receipt->order_id }}',
            'affiliation': '',
            'revenue': '{{ $receipt->grand_total }}',
            'shipping': '',
            'tax': '{{ $receipt->total_taxes_and_fees }}'
        });

        @foreach($receipt->products as $product)
            ga('ecommerce:addItem', {
                'id': '{{ $product->id }}',       // Transaction ID. Required.
                'name': '{{ $product->product_type }}',   // Product name. Required.
                'sku': 'DD23444',                 // SKU/code.
                'category': '',         // Category or variation.
                'price': '{{ $product->total }}',
                'quantity': '1'                   // Quantity.
            });
        @endforeach

       ga('ecommerce:send');

    </script>

    <script type="application/javascript">(function(w,d,t,r,u){w[u]=w[u]||[];w[u].push({'projectId':'10001784459623','properties':{'pixelId':'424897'}});var s=d.createElement(t);s.src=r;s.async=true;s.onload=s.onreadystatechange=function(){var y,rs=this.readyState,c=w[u];if(rs&&rs!="complete"&&rs!="loaded"){return}try{y=YAHOO.ywa.I13N.fireBeacon;w[u]=[];w[u].push=function(p){y([p])};y(c)}catch(e){}};var scr=d.getElementsByTagName(t)[0],par=scr.parentNode;par.insertBefore(s,scr)})(window,document,"script","https://s.yimg.com/wi/ytc.js","dotq");</script>

    <script type="text/javascript"> if (!window.mstag) mstag = {loadTag : function(){},time : (new Date()).getTime()};</script> <script id="mstag_tops" type="text/javascript" src="//flex.msn.com/mstag/site/efccdac0-f59d-481c-9fa6-ec5df7da8169/mstag.js"></script> <script type="text/javascript"> mstag.loadTag("analytics", {dedup:"1",domainId:"3087880",type:"1",revenue:"{{ $receipt->grand_total }}",actionid:"243437"})</script> <noscript> <iframe src="//flex.msn.com/mstag/tag/efccdac0-f59d-481c-9fa6-ec5df7da8169/analytics.html?dedup=1&domainId=3087880&type=1&revenue=&actionid=243437" frameborder="0" scrolling="no" width="1" height="1" style="visibility:hidden;display:none"> </iframe> </noscript>

    <img src="https://track.flexlinks.com/tracker.aspx?AID=573efe67-b634-4544-9b46-379d72dacd70&AMT={{ $receipt->grand_total }}&CMM=&UID={{ $receipt->order_id }}" width="1" height="1" alt=""/>

@stop