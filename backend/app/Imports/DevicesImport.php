<?php

namespace App\Imports;

use App\Models\Device;
use Maatwebsite\Excel\Concerns\ToModel;
use Illuminate\Contracts\Queue\ShouldQueue;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithChunkReading;

class DevicesImport implements ToModel, WithHeadingRow, WithChunkReading, ShouldQueue
{
    protected $import_id = 1;

    public function __construct($import_id)
    {
        $this->import_id = $import_id;
    }

    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new Device([
            'name' => $row['name'],
            'address' => $row['address'],
            'longitude' => $row['longitude'],
            'latitude' => $row['latitude'],
            'device_type' => $row['device_type'],
            'manufacturer' => $row['manufacturer'],
            'model' => $row['model'],
            'install_date' => $row['install_date'],
            'notes' => $row['notes'],
            'eui' => $row['eui'],
            'serial_number' => $row['serial_number'],
            'import_id' => $this->import_id
        ]);
    }

    public function chunkSize(): int
    {
        return 500;
    }
}
