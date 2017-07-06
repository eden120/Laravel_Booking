<script>

    import Newsletter from '../components/Newsletter.vue'
    import ExpressLogin from '../components/ExpressLogin.vue'

    window.$ = window.jQuery = require('jquery');

    var Modernizr = require('browsernizr');

    export default {

        components: { Newsletter, ExpressLogin },

        data() {
            return {
                showExpressModal: false,
                showLoading: false,
                promoCode: null
            }
        },

        mounted() {

            // Parking Arrival form elements
            var parkingArrivalDate = '<label>Parking Arrival Date</label><input type="text" onfocus="(this.type=\'date\')"  class="fi fi-calendar bbf-field" placeholder="Parking Arrival">';

            var parkingArrivalTime = '<label>Parking Arrival Time</label><select class="fi fi-clock-o bbf-field"><?php foreach ($timesArr as $key=>$time): ?><option value="<?php echo $key; ?>"><?php echo $time; ?></option><?php endforeach; ?></select>';

            // Parking Return form elements
            var parkingReturnDate = '<label>Parking Return Date</label><input type="text" onfocus="(this.type=\'date\')"  class="fi fi-calendar bbf-field" placeholder="Parking Return">';

            var parkingReturnTime = '<label>Parking Return Time</label><select class="fi fi-clock-o bbf-field"><?php foreach ($timesArr as $key=>$time): ?><option value="<?php echo $key; ?>"><?php echo $time; ?></option><?php endforeach; ?></select>';

            this.showLoading = false

            if (Modernizr.touch) {

                // First up, the arrival fields...

                // identify the arrival fields
                var arrivalFieldWrap = $('.bbf-col-1').find('.bbf-date-field-wrap');
                var arrivalFieldWrapTime = $('.bbf-col-1').find('.bbf-time-field-wrap');

                // First, lets hang onto the contents in a var
                var bigScreenArrivalField = $(arrivalFieldWrap).html();
                var bigScreenArrivalFieldTime = $(arrivalFieldWrapTime).html();

                // Clean it out
                $(arrivalFieldWrap).empty();
                $(arrivalFieldWrapTime).empty();

                // Plunk in a couple new divs with the touch friendly fields.
                $(arrivalFieldWrap).append('<div id="bbf-touch-arrival-date-wrap" class="bbf-touch-col-1">' + parkingArrivalDate + '</div>');
                $(arrivalFieldWrapTime).append('<div id="bbf-touch-arrival-time-wrap" class="bbf-touch-col-2">' + parkingArrivalTime + '</div>');

                // Second up, the return fields...

                // identify the return fields
                var returnFieldWrap = $('.bbf-col-2').find('.bbf-date-field-wrap');
                var returnFieldWrapTime = $('.bbf-col-2').find('.bbf-time-field-wrap');

                // First, lets hang onto the contents in a var
                var bigScreenReturnField = $(returnFieldWrap).html();
                var bigScreenReturnFieldTime = $(returnFieldWrapTime).html();

                // Clean it out
                $(returnFieldWrap).empty();
                $(returnFieldWrapTime).empty();

                // Plunk in a couple new divs with the touch friendly fields.
                $(returnFieldWrap).append('<div id="bbf-touch-return-date-wrap" class="bbf-touch-col-1">' + parkingReturnDate + '</div>');
                $(returnFieldWrapTime).append('<div id="bbf-touch-return-time-wrap" class="bbf-touch-col-2">' + parkingReturnTime + '</div>');


                // HEADS UP!!! This is the placeholder image for when we're on a touch device because
                // most of them don't support background videos.
                // it can be changed in less/build/pages/index.less - look for class "splash-cover-image"
                // change the background image to whatever you like.
                $('#splash-tier').prepend('<div class="splash-cover-image" />');
                $('#splash-tier').prepend('<div class="splash-cover-overlay" />');


            } else {

                jQuery(function () {
                    jQuery('#date-picker-start').datetimepicker({

                        onShow: function (ct) {
                            this.setOptions({
                                maxDate: jQuery('#date-picker-end').val() ? jQuery('#date-picker-end').val() : false
                            })
                        },
                        timepicker: false,
                        minDate: 0,
                        format: 'm/d/Y',
                        formatDate: 'm/d/Y',
                        scrollMonth: false,
                        scrollInput: false
                    });

                    jQuery('#date-picker-end').datetimepicker({

                        onShow: function (ct) {
                            this.setOptions({
                                minDate: jQuery('#date-picker-start').val() ? jQuery('#date-picker-start').val() : false
                            })
                        },
                        timepicker: false,
                        format: 'm/d/Y',
                        formatDate: 'm/d/Y',
                        scrollMonth: false,
                        scrollInput: false
                    });
                });

            }

        },

        methods: {
            showLoader() {
                this.showLoading = true

                $(".loading").css('display', 'block');

                let code = $('input[name=promoCode]').val()

                if(code) {

                    this.$http.post('/promo', { code: code}).then((response) => {
                        $('#basic-booking-form').submit();
                    }, (response) => {
                        swal({
                            title: "Error!",
                            text: "Sorry this Promo Code is invalid!",
                            type: "error",
                            timer: 2500,
                            showConfirmButton: false
                        })

                        $(".loading").css('display', 'none');

                        this.showLoading = false
                        $('input[name=promoCode]').val('')
                    })

                } else {
                    $('#basic-booking-form').submit();
                }

            }
        }

    }

</script>