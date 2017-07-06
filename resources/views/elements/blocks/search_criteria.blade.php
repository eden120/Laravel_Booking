<div class="container">
    <div id="search-criteria" class="clearfix">
        <!-- Arrival Date & Time -->
        <div class="search-criteria-column  match-height">

            <h4>Parking Arrival</h4>

            <div class="search-criteria-item">
                <i class="fa fa-calendar"></i> <span
                    id="search-criteria-arrival-date">{{ $search->arrivalDate() }}</span>
            </div>

            <div class="search-criteria-item">
                <i class="fa fa-clock-o"></i> <span
                    id="search-criteria-arrival-time">{{ $search->arrivalTime() }}</span>
            </div>


        </div>

        <!-- Return Date & Time -->
        <div class="search-criteria-column match-height">

            <h4>Parking Return</h4>

            <div class="search-criteria-item">
                <i class="fa fa-calendar"></i> <span id="search-criteria-return-date">{{ $search->returnDate() }}</span>
            </div>

            <div class="search-criteria-item">
                <i class="fa fa-clock-o"></i> <span id="search-criteria-return-time">{{ $search->returnTime() }}</span>
            </div>


        </div>

        <!-- Total Days -->
        <div class="search-criteria-column match-height">

            <div class="search-criteria-total">
                <h2>{{ $search->diffInDays() }}</h2>
            </div>

            <div class="search-criteria-total-label">
                Days of Parking
            </div>

            <div class="search-criteria-startover">
                <a href="#basic-booking-form" class="smooth-scroll"><i class="fa fa-refresh"></i> Search Again</a>
            </div>


        </div>

    </div>
</div>
