import Cart from './content/Cart.vue'
import Home from './content/Home.vue'
import Search from './content/Search.vue'
import Survey from './content/Survey.vue'
import Default from './content/Default.vue'


/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


const app = new Vue({
    el: '#app',

    components: {
        Home, Default, Search, Cart, Survey
    }

});


