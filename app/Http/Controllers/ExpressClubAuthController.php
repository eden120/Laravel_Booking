<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ExpressClubAuthController extends Controller
{
    public function store(Request $request)
    {
        $this->validate($request, [
            'username' => 'required',
            'password' => 'required'
        ]);
        
        $api = $this->api();
        
        $params = [
            'account_type' => 'Express',
            'account_id' => $request->username,
            'password' => $request->password,
        ];
        
        $attempt = $api->auth(['data' => $params]);

        if ($attempt) {
            session(['user_bearer' => $attempt->token]);
            session(['express_user' => true]);
            session()->forget('cart_id');
            return response()->json('success');
        }
        
        return response()->json($api->errorsArray(), 422);
    }
}
