<?php

namespace App\Http\Controllers;

use App\System\Models\State;
use Illuminate\Http\Request;

class ExpressClubController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (session('express_user')) {
            return redirect()->route('account');
        }
        
        $states = State::all()->pluck('state', 'code')->toArray();
        
        return view('pages.expressclub.index', compact('states'));
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'first_name' => 'required',
            'last_name' => 'required',
            'password' => 'required|min:6',
            'credit_card.number' => 'required|integer',
            'credit_card_year' => 'required',
            'credit_card_month' => 'required',
        ]);
        
        $fields = $this->buildParams($request);
        
        $api = $this->api();
        
        $response = $api->createExpressClub($fields);
        
        if (! $response) {
            return back()->withErrors($api->errors())->withInput($request->all());
        }

        return redirect()->route('expressclub-thanks');
    }
    
    protected function buildParams($request)
    {
        $params = $request->all();
        $params['credit_card']['expiration'] = $request->input('credit_card_month') . $request->input('credit_card_year');
        return $params;
    }
    
    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        return view('pages.expressclub.thanks');
    }
    
    public function account()
    {
        $api = $this->api();
        
        $response = $api->getExpressClubAccount();
        $future = $api->getExpressClubFutureReservations();
        $past = $api->getExpressClubPastReservations();
        
        if ($response) {
            return view('pages.expressclub.account', compact('response', 'future', 'past'));
        }
        
        return redirect()->route('home');
    }
    
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit()
    {
        $api = $this->api();
        
        $account = $api->getExpressClubAccount();
        
        if ($account) {
    
            $states = State::all()->pluck('state', 'code')->toArray();
            
            return view('pages.expressclub.edit', compact('account', 'states'));
        }
    
        return redirect()->route('home');

    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $this->validate($request, [
            'first_name' => 'required',
            'last_name' => 'required',
        ]);
        
        $api = $this->api();
    
        $response = $api->editExpressClubAccount(array_filter($request->all()));
    
        if (! $response) {
            return back()->withErrors($this->api->errors())->withInput($request->all());
        }
    
        return redirect()->route('account')->with('success', 'Account updated.');
    }
    
    public function logout(Request $request)
    {
        $api = $this->api();
        
        $api->expressClubLogout();
    
        $request->session()->flush();
        
        return redirect()->route('home');
    }
    
    public function forgot()
    {
        return view('pages.expressclub.forgot');
    }
    
    public function requested(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
        ]);
        
        $api = $this->api();
        
        $api->expressClubRequestPassword(['email' => $request->email]);
    
        return view('pages.expressclub.confirmed');
        
    }
}
