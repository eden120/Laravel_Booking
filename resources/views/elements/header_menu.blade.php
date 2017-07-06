<div id="header-menu-wrap">

    <div id="mobile-menu-trigger-wrap">
        <a href="#a" id="mobile-menu-trigger" class="mobile-menu-trigger">
            <i class="fa fa-bars"></i><br>
            Menu
        </a>
    </div>

    <ul id="header-menu" class="evp-menu">

        <li class="header-menu-item-has-children">
            <a class="header-menu-parent-link" href="{{ route('coupons.index') }}">Reservations</a>

            <div class="header-menu-dropdown">
                <ul>
                    <li><a class="header-menu-child-link" href="{{ route('coupons.index') }}">Already Prepaid - I Just need a reservation</a></li>
                    <li><a class="header-menu-child-link" href="{{ route('home') }}">Search for a rate &amp; Purchase a New Reservation</a></li>
                    <li><a class="header-menu-child-link" href="{{ route('reservation.index') }}">Edit or Cancel a Reservation</a></li>
                </ul>
            </div>

        </li>

        <li class="header-menu-item-has-children">
            <a class="header-menu-parent-link" href="{{ route('long_term_parking') }}">Prepaid Cards</a>

            <div class="header-menu-dropdown">
                <ul>
                    <li><a class="header-menu-child-link" href="{{ route('prepaidcards.index') }}">Buy Prepaid Cards</a>
                    </li>
                    <li><a class="header-menu-child-link" href="{{ route('prepaidcard_balance') }}">Check Card
                            Balance</a></li>
                </ul>
            </div>

        </li>
        @if(! session('express_user'))
            <li><a class="header-menu-parent-link" href="{{ route('expressclub.index') }}">Express Club</a></li>
        @endif
        <li><a class="header-menu-parent-link" href="{{ route('carcare') }}">Car Care</a></li>
        <li><a class="header-menu-parent-link" href="{{ route('faqs') }}">FAQ's</a></li>
        <li class="header-menu-cart-link">
            <a href="{{ route('cart.index') }}">
                <i class="fa fa-shopping-cart"></i><br>
                Cart
            </a>
        </li>

        @if(session('express_user'))
            <li><a class="header-menu-parent-link" href="{{ route('account') }}">My Account</a></li>
        @else
            <li class="header-menu-express-club-btn">
                <a href="#" @click="showExpressModal = true" class="button button-mini button-2-line button-2-line-icon button-inverse">
                    <i class="fa fa-sign-in"></i>
                    <div class="button-line-1">
                        Returning Members
                    </div>
                    <div class="button-line-2">
                        <i class="elf-express-club"></i>
                    </div>
                </a>
            </li>
        @endif

    </ul>

</div>