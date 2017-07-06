<?php

namespace App\Http\Controllers;

use App\System\Models\State;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function index()
    {
        return view('pages.reservations.index');
    }
    
    public function show(Request $request)
    {
        $this->validate($request, [
            'reservation_id' => 'required',
            'first_name'     => 'required',
            'last_name'      => 'required',
            'email'          => 'required|email',
        ]);
        
        $api = $this->api();
        
        $result = $api->getReservation($request->reservation_id, $request->first_name, $request->last_name, $request->email);
        
        if ($result) {
    
            $states = State::all()->pluck('state', 'code')->toArray();
            
            $reservation = $this->buildData($result->data);
            return view('pages.reservations.edit', compact('reservation', 'states'));
        }
        
        return back()->withInput()->withErrors($api->errorsArray());
    }
    
    public function update()
    {
        
    }
    
    public function destroy(Request $request)
    {
        $this->validate($request, [
            'reservation_id' => 'required',
            'first_name'     => 'required',
            'last_name'      => 'required',
            'email'          => 'required|email',
        ]);
        
        $api = $this->api();
        
    }
    
    private function buildData($data)
    {
        $arrival = explode("T", $data->arrival_date);
        $return = explode("T", $data->return_date);
        
        return [
            'first_name' => $data->first_name,
            'last_name' => $data->last_name,
            'email' => $data->email,
            'phone' => $data->phone,
            'arrival_date' => $arrival[0],
            'arrival_time' => $arrival[1],
            'return_date' => $return[0],
            'return_time' => $return[1],
            'vehicle_model' => $data->vehicle_model ?? null,
            'vehicle_color' => $data->vehicle_color ?? null,
            'vehicle_license_plate' => $data->vehicle_license_plate ?? null,
            'vehicle_state' => $data->vehicle_state ?? null,
        ];
    }
    
    
}
