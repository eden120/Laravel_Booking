<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CorporateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('pages.corporate.index');
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed
     */
    public function store(Request $request)
    {
        $this->validate($request, [
           'contact_name' => 'required',
           'company_name' => 'required',
           'address' => 'required',
           'city' => 'required',
           'state' => 'required',
           'zip' => 'required',
           'email' => 'required|email',
           'phone' => 'required',
           'number_employees' => 'required|numeric',
        ]);
        
        $api = $this->api();
    
        $result = $api->corporateSignup($request->all());
    
        if ($result) {
            return view('pages.corporate.thanks');
        }
    
        return back()->withInput()->withErrors('error', 'Please check you have filled in all information');
    }

}
