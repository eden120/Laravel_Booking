<script>

    import Newsletter from '../components/Newsletter.vue'
    import ExpressLogin from '../components/ExpressLogin.vue'

    export default {

        components: { Newsletter, ExpressLogin },

        data() {
            return {
                showExpressModal: false
            }
        },

        mounted() {

//            $(function() {
//                $('#checkout-exp-date').datetimepicker({
//                    timepicker:false,
//                    format:'m/y',
//                });
//            })
        },

        methods: {
            removeItem(itemId) {
                this.$http.delete(`/cart/${itemId}`).then((response) => {

                    $("#cart-item-" + itemId).remove();

                    swal({
                        title: "Success!",
                        text: "Item removed from your cart",
                        type: "success",
                        timer: 1500,
                        showConfirmButton: false
                    })

                  location.reload();

                }, (response) => {
                    swal({
                        title: "Error!",
                        text: "Sorry we are unable to remove this from your cart!",
                        type: "error",
                        timer: 1500,
                        showConfirmButton: false
                    })
                })
            },

            removeService(itemId, serviceId) {
                this.$http.delete(`/cartservice/${itemId}/${serviceId}`).then((response) => {

                    $("#cart-service-item-" + serviceId).remove();

                    swal({
                        title: "Success!",
                        text: "Item removed from your cart",
                        type: "success",
                        timer: 1500,
                        showConfirmButton: false
                    })

                    location.reload();

                }, (response) => {
                    swal({
                        title: "Error!",
                        text: "Sorry we are unable to remove this from your cart!",
                        type: "error",
                        timer: 1500,
                        showConfirmButton: false
                    })
                })
            }
        }

    }

</script>