<!doctype html>
<html class="no-js" lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>@yield('title', 'Bradley Airport Parking (BDL) | Executive Valet Parking Long Term')</title>
    <meta name="csrf_token" content={{ csrf_token() }}>
    <meta name="description" content="@yield('description', '')">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Metro Icon -->
    <meta name="msapplication-TileColor" content="#FFFFFF">
    <meta name="msapplication-TileImage" content="favicon-144.png">

    <!-- Apple / iOS -->
    <link rel="apple-touch-icon" href="favicon-32.png">

    <!-- For iPad with high-resolution Retina display running iOS ≥ 7: -->
    <link rel="apple-touch-icon-precomposed" sizes="152x152" href="favicon-152.png">

    <!-- For iPad with high-resolution Retina display running iOS ≤ 6: -->
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="favicon-144.png">

    <!-- For iPhone with high-resolution Retina display running iOS ≥ 7: -->
    <link rel="apple-touch-icon-precomposed" sizes="120x120" href="favicon-120.png">

    <!-- For iPhone with high-resolution Retina display running iOS ≤ 6: -->
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="favicon-114.png">

    <!-- For first- and second-generation iPad: -->
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="favicon-72.png">

    <!-- For non-Retina iPhone, iPod Touch, and Android 2.1+ devices: -->
    <link rel="apple-touch-icon-precomposed" href="favicon-57.png">

    <!-- Generic -->
    <link rel="icon" href="favicon-32.png" sizes="32x32">

    <link rel="stylesheet" href="{{ elixir('css/main.css') }}">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

    <script>
        window.Laravel = {!!  json_encode(['csrfToken' => csrf_token()]) !!}

        window.onbeforeunload = function () { }
    </script>

</head>

<body onload="clearLoader()">

<script>

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-2279816-2', 'executivevalet.com');
    ga('require', 'displayfeatures');
    ga('send', 'pageview');

</script>

<div id="app">
<component is="{{ $vueContent }}" inline-template>
    <div>
        @include('elements.sticky_header')

        @yield('content')

        <newsletter></newsletter>

        <div id="reviews-tier">
            <div class="container">
                <h4>What They're Saying...</h4>
                @include('shared.shopper_approved_reviews')
            </div>
        </div>


        <footer>
            <div class="container">

                <div id="footer-col-1">
                    <address id="footer-biz-info">
                        <strong class="light subhead">Executive Valet Parking</strong><br>
                        1186 South St<br>
                        Suffield, CT 06078<br>
                        (860) 668-5272<br>
                    </address>

                    <div id="footer-shopper-approved-widget">
                        <div style="margin-top: 10px"><a href="http://www.shopperapproved.com/reviews/executivevalet.com/" onclick="var nonwin=navigator.appName!='Microsoft Internet Explorer'?'yes':'no'; var certheight=screen.availHeight-90; window.open(this.href,'shopperapproved','location='+nonwin+',scrollbars=yes,width=620,height='+certheight+',menubar=no,toolbar=no'); return false;"><img src="https://c683207.ssl.cf2.rackcdn.com/16011-r.gif" style="border: 0" alt="" oncontextmenu="var d = new Date(); alert('Copying Prohibited by Law - This image and all included logos are copyrighted by Shopper Approved \251 '+d.getFullYear()+'.'); return false;" /></a></div>
                    </div>

                    <div id="footer-social-links">
                        <a href="https://twitter.com/ExecutiveValet1" target="_blank" class="inverse-link"><i
                                class="fa fa-twitter-square"></i></a>
                        <a href="https://www.facebook.com/ExecutiveValetParking" target="_blank" class="inverse-link"><i
                                class="fa fa-facebook-square"></i></a>
                        <a href="https://www.linkedin.com/company/executive-valet-parking" target="_blank"
                           class="inverse-link"><i class="fa fa-linkedin-square"></i></a>
                    </div>

                </div>

                <div id="footer-col-2">
                    <div class="footer-menu">
                        <ul>
                            <li><a href="{{ route('directions') }}"><i class="fa fa-angle-right"></i> Contact &amp; Directions</a></li>
                            <li><a href="{!! route('specials') !!}"><i class="fa fa-angle-right"></i> Specials</a></li>
                            <li><a href="{{ route('redirecting') }}"><i
                                        class="fa fa-angle-right"></i> RSW Parking</a></li>
                            <li><a href="{!! route('faqs') !!}"><i class="fa fa-angle-right"></i> FAQ's</a></li>
                        </ul>
                    </div>
                    <div class="footer-menu">
                        <ul>
                            <li><a href="{!! route('long_term_parking') !!}"><i class="fa fa-angle-right"></i> Long Term
                                    Parking</a></li>
                            <li><a href="{{ route('surveys.index')  }}"><i class="fa fa-angle-right"></i> Post-Trip Survey</a></li>

                            <li><a href="{!! route('about') !!}"><i class="fa fa-angle-right"></i> About Us</a></li>
                            <li><a href="{!! route('terms') !!}"><i class="fa fa-angle-right"></i> Terms of Use</a></li>
                        </ul>
                    </div>
                </div>

                <div id="footer-col-3">
                    <a href="http://www.shopperapproved.com/reviews/executivevalet.com/" class="shopperlink"><img src="https://c813008.ssl.cf2.rackcdn.com/16011-sm-bottom-medal-black.png" style="border: 0" alt="Shopper Award" oncontextmenu="var d = new Date(); alert('Copying Prohibited by Law - This image and all included logos are copyrighted by shopperapproved \251 '+d.getFullYear()+'.'); return false;" /></a><script type="text/javascript">(function() { var js = window.document.createElement("script"); js.src = '//www.shopperapproved.com/seals/certificate.js'; js.type = "text/javascript"; document.getElementsByTagName("head")[0].appendChild(js); })();</script>
                </div>


                {{--<div id="footer-col-3">--}}
                    {{--@include('shared.travel_agent_signin')--}}
                {{--</div>--}}

                {{--<div id="footer-facebook-feed">--}}
                    {{--<h4>Recently on Facebook...</h4>--}}
                    {{--@include('shared.facebook_feed')--}}
                {{--</div>--}}

            </div>
        </footer>

        <express-login v-if="showExpressModal" @close="showExpressModal=false"></express-login>
    </div>

</component>
</div>
<script src="{{ elixir('js/all.js') }}"></script>

@yield('footer_js')
<script>
    function clearLoader()
    {
        $(".loading").css('display', 'none');
    }
</script>

</body>
</html>
