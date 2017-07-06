<template>
    <div id="email-signup-tier" v-if="show_newsletter">
        <div class="container">
            <div class="row">
                <div class="span-6">
                    <h4>Get Airport Parking Deals By Email!</h4>
                </div>
                <div class="span-6">
                    <form>
                        <div class="row">
                            <div class="span-8">
                                <input type="email" placeholder="you@youremail.com" class="fi fi-envelope" v-model="email">
                            </div>
                            <div class="span-4">
                                <input type="submit" value="Subscribe" class="button button-block" @click.prevent="Subscribe">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {

        data() {
            return {
                email: null,
                show_newsletter: true,
            }
        },

        methods: {
            Subscribe() {

                this.$http.post('/newsletter/subscribe', {email: this.email}).then((response) => {

                    this.show_newsletter = false
                swal({
                    title: 'Success',
                    text: 'Successfully subscribed to are newsletter.',
                    type: 'success',
                })

            }, (response) => {

                    let string = _.map(JSON.parse(response.body), function(value) {
                        return `<li>${value}</li>`
                    })

                    swal({
                        title: 'Error',
                        text: `<ul class="list-unstyled">${_.join(string, '')}</ul>`,
                        type: 'error',
                        html: true
                    })


                });

            }
        }

    }

</script>