<?php

namespace App\Http\Controllers;

use App\System\Models\State;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    /**
     * VehicleController constructor.
     */
    public function __construct()
    {
        if (session('express_user')) {
            return redirect()->route('account');
        }
    }
    
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $states = State::all()->pluck('state', 'code')->toArray();
        
        return view('pages.vehicle.create', compact('states'));
    }
    
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($vehicleId)
    {
        $api = $this->api();
    
        $vehicle = $api->getVehicle($vehicleId)->data;
        
        $states = State::all()->pluck('state', 'code')->toArray();
        
        return view('pages.vehicle.edit', compact('states', 'vehicle'));
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
            'make' => 'required',
            'model' => 'required',
            'color' => 'required',
            'state' => 'required',
            'license' => 'required',
        ]);
        
        $api = $this->api();
    
        $result = $api->addVehicle($request->all());
    
        if ($result) {
            return redirect()->route('account');
        }
    
        return back()->withInput()->withErrors('license', 'Please check you have filled in all information');
        
    }
    
    
    /**
     * Update a  resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $vehicleId)
    {
        $this->validate($request, [
            'make' => 'required',
            'model' => 'required',
            'color' => 'required',
            'state' => 'required',
            'license' => 'required',
        ]);
        
        $api = $this->api();
        
        $result = $api->updateVehicle($vehicleId, $request->all());
        
        if ($result) {
            return redirect()->route('account');
        }
        
        return back()->withInput()->withErrors('license', 'Please check you have filled in all information');
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $api = $this->api();
    
        $api->deleteVehicle($id);
    
        return redirect()->route('account');
    }
}
