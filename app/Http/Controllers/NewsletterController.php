<?php

namespace App\Http\Controllers;

use App\System\External\EvApi;
use Illuminate\Http\Request;

class NewsletterController extends Controller
{
    /**
     * NewsletterController constructor.
     * @param EvApi $api
     */
    public function __construct(EvApi $api)
    {
        $this->api = $api;
    }
    
    public function store(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email'
        ]);
        
        
    }
}
