<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div class="modal-header">
                        <slot name="header">
                            <h4>Customer Login <span><a href="#" @click.prevent="$emit('close')">&#10006;</a></span></h4>
                        </slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body">

                            <div class="alert alert-brand-color-1 alert-tight" v-if="errors">Wrong email or password.</div>

                            <div class="row row-spaced" style="padding-bottom: 18px;">
                                <div class="span-6">
                                    <div class="fi-group">
                                        <span class="fi-group-icon"><i class="fa fa-envelope brand-color-1"></i></span>
                                        <label>Email<span class="warning">required</span></label>
                                        <input placeholder="you@youremail.com" v-model="username" required="required" name="email" type="text" class="fi fi-envelope required-field">
                                    </div>
                                </div>
                                <div class="span-6">
                                    <div class="fi-group">
                                        <span class="fi-group-icon"><i class="fa fa-ticket brand-color-1"></i></span>
                                        <label>Password<span class="warning">required</span></label>
                                        <input placeholder="Password" v-model="password" required="required" name="password" type="password" value="" class="fi fi-ticket required-field">
                                    </div>
                                </div>
                            </div>

                            <div class="row row-spaced" style="padding-bottom: 4px;">
                                <div class="span-6">
                                    <button type="submit" class="button button-solid button-success button-small" @click.prevent="login"><i class="fa fa-check"></i> Submit</button>
                                </div>

                                <div class="span-6">
                                    <a href="/forgot_password">Forgot Password?</a>
                                </div>
                                
                            </div>

       
                            

                        </slot>
                    </div>


                </div>
            </div>
        </div>
    </transition>
</template>

<script>

    export default {


        data() {
            return {
                errors: false,
                username: '',
                password: ''
            }
        },

        methods: {
            login() {
                this.$http.post('/express/login', {'username': this.username, 'password' : this.password}).then((response) => {
                    console.log(response)
                    window.location.href = "/account";
                }, (response) => {
                    this.errors = true
                });
            }
        }

    }

</script>