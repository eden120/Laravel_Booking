<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class ReceiptController extends Controller
{
    public function show(Request $request)
    {
        $receipt = session('receipt');
    
        $request->session()->reflash();
        
//        dd($receipt);
        
        if ($receipt == null) {
            return redirect('cart');
        }
    
        $request->session()->forget('cart_id');

        return view('pages.receipt', compact('receipt', 'render'));
    }
}
