<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDeviceRequest;
use App\Http\Requests\UpdateDeviceRequest;
use App\Models\Device;

class DeviceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Device::paginate(50);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreDeviceRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreDeviceRequest $request)
    {
        $required_255_chars = 'required|max:255';

        $request->validate([
            'name' => $required_255_chars,
            'address' => $required_255_chars,
            'longitude' => 'required|numeric',
            'latitude' => 'required|numeric',
            'device_type' => $required_255_chars,
            'manufacturer' => $required_255_chars,
            'model' => $required_255_chars,
            'install_date' => 'required|date_format:Y-m-d',
            'notes' => 'nullable',
            'eui' => $required_255_chars,
            'serial_number' => 'required|unique:devices|max:255',
        ]);

        return Device::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Device  $device
     * @return \Illuminate\Http\Response
     */
    public function show(Device $id)
    {
        return Device::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateDeviceRequest  $request
     * @param  \App\Models\Device  $device
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateDeviceRequest $request, Device $id)
    {
        $device = Device::find($id)->first();
        $device->update($request->all());

        return $device;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Device  $device
     * @return \Illuminate\Http\Response
     */
    public function destroy(Device $id)
    {
        $device = Device::find($id)->first();
        return $device->delete();
    }

    /**
     * Search for the name
     *
     * @param  str  $name
     * @return \Illuminate\Http\Response
     */
    public function search($name)
    {
        return Device::where('name', 'like', '%' . $name . '%')->paginate(50);
    }
}
