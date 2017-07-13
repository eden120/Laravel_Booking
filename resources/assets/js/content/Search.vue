<script>

    import Newsletter from '../components/Newsletter.vue'
    import ExpressLogin from '../components/ExpressLogin.vue'

    export default {

        components: { Newsletter, ExpressLogin },

        data() {
            return {
                services: false,
                showExpressModal: false,
                showLoading: false,
                showCheckout: false
            }
        },

        mounted() {

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
                    scrollInput: false,
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

        },

        methods: {

            addToCart(digest, group) {

                this.$http.post('/cart', {'digest': digest}).then((response) => {

                    if(group == 'Prepay') {
                        this.services = true
                        window.location.hash = '#results-area-addons';
                    } else {
                        window.location = '/cart'
                    }

                    swal({
                        title: "Success!",
                        text: "Parking added to your basket!",
                        type: "success",
                        timer: 1500,
                        showConfirmButton: false
                    })

                    this.showCheckout = true

                }, (response) => {
                    swal({
                        title: "Error!",
                        text: "Sorry we are unable to add this product to your cart!",
                        type: "error",
                        timer: 1500,
                        showConfirmButton: false
                    })
                })
            },

            addCarCare(itemId) {
                this.showLoading = true
                this.$http.post('/car-care', {'item': itemId}).then((response) => {
                    swal({
                        title: "Success!",
                        text: "Service added to your basket!",
                        type: "success",
                        timer: 1500,
                        showConfirmButton: false
                    })
                    this.showLoading = false
                }, (response) => {
                    swal({
                        title: "Error!",
                        text: "Sorry we are unable to add this service to your cart!",
                        type: "error",
                        timer: 1500,
                        showConfirmButton: false
                    })
                    this.showLoading = false
                })
            },

            showLoader() {
                this.showLoading = true;

                $(".loading").css('display', 'block');
                $('#carCaremodal').modal("hide");

                //
                let code = $('input[name=promo_code]').val();

                if(code) {
                    this.$http.post('/promo', { code: code}).then((response) => {
                        // $('#basic-booking-form').submit();
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
                        $('input[name=promo_code]').val('')
                    })

                } else {
                    let code = $('input[name=promo_code]').val();
                    let arrival_date = $('input[name=arrivalDate]').val();
                    let arrivalTime = $('select[name=arrivalTime] option:selected').val();
                    let return_date = $('input[name=returnDate]').val();
                    let returnTime = $('select[name=returnTime] option:selected').val();
                    let CCID = $('input[name=carcareID]').val();

                    this.$http.post('/search/getCC', {arrivalTime:arrivalTime, returnTime:returnTime, code:code,arrival_date:arrival_date,return_date:return_date,ccId:CCID }).then((response) => {
                        this.showLoading = false;

                    $(".loading").css('display', 'none');
                    swal({
                        title: "Success!",
                        text: "Parking added to your basket!",
                        type: "success",
                        timer: 1500,
                        showConfirmButton: false
                    })

                    window.location = '/cart';

                }, (response) => {
                        this.showLoading = false;

                        $(".loading").css('display', 'none');
                        swal({
                            title: "Error!",
                            text: "Sorry no any result!",
                            type: "error",
                            timer: 2500,
                            showConfirmButton: false
                        })
                    })
                }

            }

        }

    }

</script>