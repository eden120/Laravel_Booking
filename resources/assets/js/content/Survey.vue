<script>

    import "raty-js"
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

            setTimeout(function() {
                $('.rating').each(function () {

                    let target = $(this).data('target')

                    $(this).raty({
                        targetScore: target,
                        targetFormat: 'Rating: {score}',
                        path: '/images',
                        hints: ['Poor', 'Fair', 'Average', 'Good', 'Excellent'],
                        score: $(target).val()
                    });
                });
            }, 300)

        }

    }

</script>