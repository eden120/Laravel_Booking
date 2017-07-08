<?php

Route::get('/', ['as' => 'home', 'uses' => 'PageController@home']);
Route::get('home/{affiliateUri}', 'PageController@indexAffiliate');
Route::get('long_term_parking', ['as' => 'long_term_parking', 'uses' => 'PageController@long_term_parking']);
Route::get('about', ['as' => 'about', 'uses' => 'PageController@about']);
Route::get('terms', ['as' => 'terms', 'uses' => 'PageController@terms']);
Route::get('faqs', ['as' => 'faqs', 'uses' => 'PageController@faqs']);
Route::get('redirecting', ['as' => 'redirecting', 'uses' => 'PageController@redirecting']);
Route::get('travel_agent', ['as' => 'travel_agent', 'uses' => 'PageController@travel']);
Route::get('bradley_airport_parking_coupons', ['as' => 'specials', 'uses' => 'PageController@specials']);
Route::get('contact_and_directions', ['as' => 'directions', 'uses' => 'PageController@directions']);

Route::resource('prepaidcards', 'PrePaidCardController', ['only' => ['index', 'store']]);
Route::get('prepaidcards/{affiliateUri}', 'PrePaidCardController@indexAffiliate');

Route::get('prepaidcard_balance', ['as' => 'prepaidcard_balance', 'uses' => 'PageController@prepaidcard_balance']);

Route::resource('coupons', 'CouponsController', ['only' => ['index', 'store']]);
Route::get('coupons/{affiliateUri}', 'CouponsController@indexAffiliate');
Route::get('reservation_details', 'CouponsController@show')->name('res_details');

Route::get('car-care', ['as' => 'carcare', 'uses' => 'CarCareController@index']);
Route::post('car-care', ['as' => 'carcare', 'uses' => 'CarCareController@store']);

Route::post('promo', ['as' => 'test-promo', 'uses' => 'PageController@promo']);

Route::resource('expressclub', 'ExpressClubController');

Route::resource('corporate', 'CorporateController', ['only' => ['index', 'store']]);

Route::post('express/login', 'ExpressClubAuthController@store');
//Route::get('expressclub', ['as' => 'expressclub', 'uses' => 'ExpressClubController@index']);
//Route::post('expressclub', ['as' => 'expressclub', 'uses' => 'ExpressClubController@store']);
Route::get('account', 'ExpressClubController@account')->name('account');
Route::get('account/logout', 'ExpressClubController@logout')->name('account.logout');
Route::get('account/edit', 'ExpressClubController@edit')->name('account.edit');
Route::put('account/update', 'ExpressClubController@update')->name('account.update');
Route::get('expressclub/confirmation', ['as' => 'expressclub-thanks', 'uses' => 'ExpressClubController@show']);
Route::get('forgot_password', 'ExpressClubController@forgot');
Route::post('forgot_password/requested', ['as' => 'expressclub.requested', 'uses' => 'ExpressClubController@requested']);

Route::resource('vehicle', 'VehicleController', ['only' => ['create', 'store', 'edit', 'update']]);
Route::get('vehicle/{id}/destroy', 'VehicleController@destroy')->name('vehicle.destroy');

Route::resource('search', 'SearchController', ['only' => [
    'store', 'update', 'show'
]]);

Route::post('search/getCC', 'SearchController@getCC');


Route::get('edit_reservation', ['as' => 'reservation.index', 'uses' => 'ReservationController@index']);
Route::post('reservation/show', ['as' => 'reservation.show', 'uses' => 'ReservationController@show']);
Route::post('reservation/update', ['as' => 'reservation.update', 'uses' => 'ReservationController@update']);


Route::get('cart/points/{item}', 'CartController@points');
Route::resource('cart', 'CartController', ['only' => ['index', 'store', 'destroy']]);
Route::delete('cartservice/{item}/{service}', 'CartController@destroy_service');

Route::resource('checkout', 'CheckoutController', ['only' => ['store']]);

Route::get('receipt', ['as' => 'receipt', 'uses' => 'ReceiptController@show']);

Route::post('newsletter/subscribe', 'NewsletterController@store');

Route::resource('surveys', 'SurveyController');