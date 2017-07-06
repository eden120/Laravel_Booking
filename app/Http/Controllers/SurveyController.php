<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SurveyController extends Controller
{
    public function index()
    {
        return view('pages.surveys.index', compact('account'));
        
    }
    
    public function store(Request $request)
    {
        $api = $this->api();
    
        $this->validate($request, $this->getValidationsArray());
        
        $result = $api->postTripSurvey($request->all());
        
        if ($result) {
            return view('pages.surveys.thanks');
        }
    
        return back()->withInput()->withErrors([
            'ticket_number' => 'Please check you have the correct ticker number'
        ]);
    }
    
    private function getValidationsArray()
    {
        $data = [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
            'ticket_number' => 'required',
            'rating_check_in' => 'required',
            'rating_friendliness' => 'required',
            'rating_shuttle' => 'required',
            'rating_busses' => 'required',
            'rating_driver' => 'required',
            'rating_pick_up' => 'required',
            'rating_check_out' => 'required',
            'rating_cashier' => 'required',
            'rating_directions' => 'required',
            'contact_customer_ok' => 'required|boolean'
        ];
        
        if (session('express_user')) {
            return array_merge($data, ['rating_express_club' => 'required']);
        }
        
        return $data;
    }
}
