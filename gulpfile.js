const elixir = require('laravel-elixir');

require('laravel-elixir-vue-2');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application as well as publishing vendor resources.
 |
 */

elixir((mix) => {
    mix.less('main.less')
       .webpack('app.js', 'resources/build/app.js');
       mix.webpack('global.js', 'resources/build/global.js');

    mix.scripts([
        'build/global.js',
        'build/app.js',
        'vendor/js/jquery.slides.js',
        'vendor/js/plugins.js',
        'vendor/js/custom.js',
        'vendor/js/ui-kit.js',
        'vendor/js/sweetalert.js',
        'vendor/js/imagesloaded.pkgd.min.js',
        'vendor/js/video.js',
        'vendor/js/bigvideo.min.js',


    ], null, 'resources');

    mix.version(['css/main.css', 'js/all.js']);

});
