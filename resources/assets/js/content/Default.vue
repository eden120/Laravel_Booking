<script>

    import Newsletter from '../components/Newsletter.vue'
    import ExpressLogin from '../components/ExpressLogin.vue'

    export default {

        components: { Newsletter, ExpressLogin },

        data() {
            return {
                prepaid_card: 'true',
                showExpressModal: false,
                showLoading: false,
            }
        },

        mounted(){

            if($('#date-picker-start').length > 0) {

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

            addCarCare(itemId) {
                this.showLoading = true
                this.$http.post('/car-care', {'item': itemId}).then((response) => {
                    swal({
                        title: "Success!",
                        text: "Parking added to your basket!",
                        type: "success",
                        timer: 1500,
                        showConfirmButton: false
                    })
                    this.showLoading = false
                }, (response) => {

                    let message = response.body.error ? response.body.error : "Sorry we are unable to add this product to your cart!";

                    swal({
                        title: "Error!",
                        text: message,
                        type: "error",
                        timer: 2500,
                        showConfirmButton: false
                    })
                    this.showLoading = false
                })
            }


        }

    }

</script>