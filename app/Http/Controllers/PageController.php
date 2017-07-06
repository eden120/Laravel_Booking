<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PageController extends Controller
{
    /**
     * Homepage
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function home()
    {
//        dump(session()->all());
        return response()
            ->view('welcome')
            ->header('Pragma', 'no-cache')
            ->header('Expires', 'Fri, 01 Jan 1990 00:00:00 GMT')
            ->header('Cache-Control', 'no-cache, must-revalidate, no-store, max-age=0, private');
    }
    
    public function indexAffiliate($affiliateUri)
    {
        return $this->landReferral($affiliateUri, 'home');
    }
    
    /**
     * Long term parking page.
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function long_term_parking()
    {
        return view('pages.long_term_parking');
    }
    
    /**
     * Prepaid card balance page.
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function prepaidcard_balance()
    {
        return view('pages.prepaidcard_balance');
    }
    
    /**
     * Specials page.
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function specials()
    {
        return view('pages.specials');
    }
    
    /**
     * About us page.
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function about()
    {
        return view('pages.about');
    }
    
    /**
     * Terms page.
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function terms()
    {
        return view('pages.terms');
    }
    
    /**
     * FAQS page.
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function faqs()
    {
        $api = $this->api();
        
        $faqs = $api->getFaqs();
            
        return view('pages.faqs', compact('faqs'));
    }
    
    /**
     * Directions page
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function directions()
    {
        $api = $this->api();
    
        $directions = $api->getDirections();
    
        return view('pages.directions', compact('directions'));
    }
    
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function travel()
    {
        return view('pages.travel');
    }
    
    /**
     * Testing a promo code
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function promo(Request $request)
    {
        $api = $this->api();
        
        $result = $api->testPromoCode($request->code);
        
        if($result) {
            return response()->json('success');
        }
        
        return response()->json(['error' => 'Invalid code'], 403);
    }
    
    public function redirecting()
    {
        return view('pages.redirect');
    }
}
