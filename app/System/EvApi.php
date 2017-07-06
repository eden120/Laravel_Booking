<?php

namespace App\System\External;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cache;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Support\Facades\Session;

class EvApi
{
    /**
     * @var Client
     */
    private $client;
    
    /**
     * @var
     */
    private $errors;
    
    /**
     * @var string
     */
    private $version = '/v1/';
    
    /**
     * Apr constructor.
     * @param Client $client
     */
    public function __construct(Client $client)
    {
        $this->client = new Client([
            'base_uri' => config('services.evapi.base_url'),
            'headers' => [
                'Authorization' => 'Bearer ' . $this->getUserToken(),
                'Content-Type' => 'application/json'
            ],
            'http_errors' => false
        ]);
    }
    
    /**
     * Get Express Club Account
     *
     * @return mixed
     */
    public function getExpressClubAccount()
    {
        $response = $this->client->request('GET', $this->version . 'account');
        return $this->handleResponse($response)->data;
    }
    
    /**
     * Get Express Club Account
     *
     * @return mixed
     */
    public function editExpressClubAccount($params)
    {
        $response = $this->client->request('PATCH', $this->version . 'account', ['json' => ['data' => $params]]);
        return $this->handleResponse($response)->data;
    }
    
    
    /**
     * Authenticate the user
     *
     * @param $params
     * @return mixed
     */
    public function auth($params)
    {
        $response = $this->client->request('POST', $this->version . 'auth', ['json' => $params]);
        return $this->handleResponse($response)->data;
    }
    
    private function getUserToken()
    {
        if (session()->has('user_bearer')) {
            return session('user_bearer');
        }
        
        $result = $this->guestRegister();
        session(['user_bearer' => $result->token]);
        Session::save();
        return $result->token;
        
    }
    
    /**
     * Register the guest user
     *
     * @return mixed
     */
    public function guestRegister()
    {
        $client = new Client([
            'base_uri' => config('services.evapi.base_url'),
            'headers' => [
                'Content-Type' => 'application/json'
            ]
        ]);
        
        $response = $client->request('POST', $this->version . 'auth');
        return $this->handleResponse($response)->data;
    }
    
    /**
     *  Get a promo code from a URI segment
     *
     * @param string $uriSegment
     * @return mixed
     */
    public function getUriPromoCode($uriSegment)
    {
        $request = $this->client->request('GET', $this->requestUrl('promo-code-uri/' . $uriSegment));
        $response = $this->handleResponse($request);
        if (!$response) {
            return false;
        }
        return $response->data;
    }
    
    /**
     * Search for all rates
     *
     * @param array $parameters
     * @return mixed
     */
    public function searchAllRates(array $parameters)
    {
        $request = $this->client->request('POST', $this->requestUrl('search'), ['json' => $parameters]);
        return $this->handleResponse($request)->data;
    }
    
    /**
     * Search for all rates
     *
     * @param array $parameters
     * @return mixed
     */
    public function searchReservationRates(array $parameters)
    {
        $request = $this->client->request('POST', $this->requestUrl('search/reservation'), ['json' => $parameters]);
        return $this->handleResponse($request);
    }
    
    /**
     * Search with coupon
     *
     * @param array $parameters
     * @return bool|mixed
     */
    public function reserveWithCoupon(array $parameters)
    {
        $request = $this->client->request('POST', $this->requestUrl('search/reservation/reserve-with-coupon'), ['json' => $parameters]);
        return $this->handleResponse($request);
    }
    
    
    /**
     * Search for prepaid cards
     *
     * @param string $promocode
     * @return mixed
     */
    public function searchPrePaidCards($promocode = '')
    {
        $request = $this->client->request('POST', $this->requestUrl('search/prepaid-card'), ['json' => ['data' => $promocode]]);
        return $this->handleResponse($request)->data;
    }
    
    /**
     * Get car care products and cache.
     *
     * @return mixed
     */
    public function getCarCare()
    {
        return Cache::get('car-care', function () {
            $request = $this->client->request('GET', $this->requestUrl('car-care'));
            return $this->handleResponse($request)->data->services;
        });
    }
    
    /**
     * Get faqs and cache.
     *
     * @return mixed
     */
    public function getFaqs()
    {
        return Cache::get('faqs', function () {
            $request = $this->client->request('GET', $this->requestUrl('faq'));
            return $this->handleResponse($request)->data->faqs;
        });
    }
    
    /**
     * Get refund policy and cache.
     *
     * @return mixed
     */
    public function getRefundPolicy()
    {
        return Cache::get('refund-policy', function () {
            $request = $this->client->request('GET', $this->requestUrl('refund-policy'));
            return $this->handleResponse($request)->data->html_content;
        });
    }
    
    /**
     * Get the shopping cart.
     *
     * @return mixed
     */
    public function getCart()
    {
        $request = $this->client->request('GET', $this->requestUrl('cart/' . session('cart_id')));
        return $this->handleResponse($request)->data;
    }
    
    /**
     * Crate a new shopping cart and save to session.
     *
     * @return mixed
     */
    public function createCart()
    {
        $request = $this->client->request('POST', $this->requestUrl('cart'), ['allow_redirects' => false]);
        $response = $this->handleResponse($request);
        session(['cart_id' => $response->data->id]);
        return $response->data->id;
    }
    
    /**
     * Checkout the cart.
     *
     * @return mixed
     */
    public function checkoutCart($params)
    {
        $request = $this->client->request('POST', $this->requestUrl('checkout/' . session('cart_id')), ['json' => $params]);
        return $this->handleResponse($request);
    }
    
    /**
     * Add an item to the cart.
     *
     * @param $item
     * @return bool|mixed
     */
    public function addItemToCart($item)
    {
        $request = $this->client->request('POST', $this->requestUrl('cart/' . session('cart_id') . '/item'), ['json' => $item]);
        return $this->handleResponse($request);
    }
    
    /**
     * Delete Item from cart.
     *
     * @param $item
     * @return mixed
     */
    public function deleteItemFromCart($item)
    {
        $request = $this->client->request('DELETE', $this->requestUrl('cart/' . session('cart_id') . '/item/' . $item));
        return $this->handleResponse($request)->data;
    }
    
    
    /**
     * Delete Item from cart.
     *
     * @param $item
     * @param $service
     * @return mixed
     */
    public function deleteItemServiceFromCart($item, $service)
    {
        $request = $this->client->request('DELETE', $this->requestUrl('cart/' . session('cart_id') . '/item/' . $item . '/service/' . $service));
        return $this->handleResponse($request)->data;
    }
    
    
    public function removeAllCartItems()
    {
        $cart = $this->getCart();
        
        collect($cart->cart_items)->each(function ($item) {
            $this->deleteItemFromCart($item->meta->cart_item_id);
        });
        
    }
    
    /**
     * Add car care to cart.
     *
     * @param $item
     * @return mixed
     */
    public function addCareToCart($item, $data)
    {
        $request = $this->client->request('POST', $this->requestUrl('cart/' . session('cart_id') . '/item/' . $item . '/service'), ['json' => $data]);
        return $this->handleResponse($request)->data;
    }
    
    /**
     * Change cart payment method for an item
     *
     * @param $item
     * @return mixed
     */
    public function editItemPaymentType($item)
    {
        $request = $this->client->request('PATCH', $this->requestUrl('cart/' . session('cart_id') . '/item/' . $item), [
            'json' => [
                'data' => [
                    'payment_method' => 'points'
                ]
            ]
        ]);
        
        return $this->handleResponse($request)->data;
    }
    
    public function subscribe($email)
    {
        $request = $this->client->request('POST', $this->requestUrl('email-subscription'), ['json' => ['data' => $email]]);
        return $this->handleResponse($request)->data;
    }
    
    /**
     * Create and Express club.
     *
     * @param $params
     * @return null|\Psr\Http\Message\ResponseInterface
     */
    public function createExpressClub($params)
    {
        $request = $this->client->request('POST', $this->requestUrl('express-club'), ['json' => ['data' => $params]]);
        return $this->handleResponse($request);
    }
    
    /**
     * Request new password.
     *
     * @param $params
     * @return null|\Psr\Http\Message\ResponseInterface
     */
    public function expressClubRequestPassword($params)
    {
        $request = $this->client->request('POST', $this->requestUrl('account/reset_password'), ['json' => ['data' => $params]]);
        return $this->handleResponse($request);
    }
    
    /**
     *  Logout of express club
     */
    public function expressClubLogout()
    {
        $this->client->request('DELETE', $this->requestUrl('auth'));
    }
    
    /**
     * @return mixed
     */
    public function getExpressClubFutureReservations()
    {
        $request = $this->client->request('GET', $this->requestUrl('account/reservations/future'));
        return $this->handleResponse($request)->data;
    }
    
    /**
     * @return mixed
     */
    public function getExpressClubPastReservations()
    {
        $request = $this->client->request('GET', $this->requestUrl('account/reservations/past'));
        return $this->handleResponse($request)->data;
    }
    
    /**
     * Submit a survey
     *
     * @param $params
     * @return bool|mixed
     */
    public function postTripSurvey($params)
    {
        $request = $this->client->request('POST', $this->requestUrl('post-trip-survey'), ['json' => ['data' => $params]]);
        return $this->handleResponse($request);
    }
    
    /**
     * Submit Corporate
     *
     * @param $params
     * @return bool|mixed
     */
    public function corporateSignup($params)
    {
        $request = $this->client->request('POST', $this->requestUrl('corporate'), ['json' => ['data' => $params]]);
        return $this->handleResponse($request);
    }
    
    /**
     * @return mixed
     */
    public function getDirections()
    {
        return Cache::get('directions', function () {
            $request = $this->client->request('GET', $this->requestUrl('contact-and-directions'));
            return $this->handleResponse($request)->data;
        });
    }
    
    /**
     * @param $reservationId
     * @param $firstname
     * @param $lastname
     * @param $email
     * @return bool|mixed
     */
    public function getReservation($reservationId, $firstname, $lastname, $email)
    {
        $request = $this->client->request('GET', $this->requestUrl("reservation/$reservationId/$firstname/$lastname/$email"));
        return $this->handleResponse($request);
    }
    
    /**
     * @param $reservationId
     * @param $firstname
     * @param $lastname
     * @param $email
     * @return bool|mixed
     */
    public function editReservation($reservationId, $firstname, $lastname, $email)
    {
        $request = $this->client->request('PATCH', $this->requestUrl("reservation/$reservationId/$firstname/$lastname/$email"));
        return $this->handleResponse($request);
    }
    
    /**
     * @param $reservationId
     * @param $firstname
     * @param $lastname
     * @param $email
     * @return bool|mixed
     */
    public function cancelReservation($reservationId, $firstname, $lastname, $email)
    {
        $request = $this->client->request('DELETE', $this->requestUrl("reservation/$reservationId/$firstname/$lastname/$email"));
        return $this->handleResponse($request);
    }
    
    /**
     * Test the promo code
     *
     * @param $code
     * @return bool|mixed
     */
    public function testPromoCode($code)
    {
        $request = $this->client->request('GET', $this->requestUrl("promo-code/$code"));
        return $this->handleResponse($request);
    }
    
    /**
     * Add Vehicle
     *
     * @param $params
     * @return bool|mixed
     */
    public function addVehicle($params)
    {
        $request = $this->client->request('POST', $this->requestUrl('account/vehicle'), ['json' => ['data' => $params]]);
        return $this->handleResponse($request);
    }
    
    /**
     * Get vehicle info
     *
     * @param $vehicleId
     * @return bool|mixed
     */
    public function getVehicle($vehicleId)
    {
        $request = $this->client->request('GET', $this->requestUrl("account/vehicle/$vehicleId"));
        return $this->handleResponse($request);
    }
    
    /**
     * Update a vehicle
     *
     * @param $vehicleId
     * @param $params
     * @return bool|mixed
     */
    public function updateVehicle($vehicleId, $params)
    {
        $request = $this->client->request('POST', $this->requestUrl('account/vehicle/' . $vehicleId), ['json' => ['data' => $params]]);
        return $this->handleResponse($request);
    }
    
    /**
     * Delete Vehicle
     *
     * @param $id
     * @return bool|mixed
     */
    public function deleteVehicle($id)
    {
        $request = $this->client->request('DELETE', $this->requestUrl('account/vehicle/' . $id));
        return $this->handleResponse($request);
    }
    
    /**
     * Return errors
     *
     * @return mixed
     */
    public function errors()
    {
        return $this->errors;
    }
    
    /**
     * Handle the client api request response.
     *
     * @param $response
     * @return bool|mixed
     */
    private function handleResponse($response)
    {
//        echo (html_entity_decode($response->getBody()->getContents()));
//        exit;
        if ($response) {
            $this->success = true;
            $this->statusCode = $response->getStatusCode();
            $response = json_decode($response->getBody());
            
            if ($this->statusCode >= 400) {
                
                if ($this->statusCode == 401) {
                    $response->errors[0]->message = 'Sorry there was a problem with your request. Please try again';
                    session()->flush();
                }
                    
                $this->errors = $response->errors;
                $this->success = false;
                
            } else {
                return $response;
            }
        }
        
        return false;
    }
    
    /**
     * Generate the request url.
     *
     * @param $path
     * @return string
     */
    private function requestUrl($path)
    {
        return $this->version . $path;
    }
    
    public function errorsArray()
    {
        $errors = [];
        
        foreach ($this->errors as $error) {
            $errors[] = $error->message;
        }
        
        return $errors;
    }
    
}