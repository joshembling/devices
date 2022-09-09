<?php

namespace App\Imports;

use App\Models\Device;
use Maatwebsite\Excel\Concerns\ToModel;

class DevicesImport implements ToModel
{
    protected $fileName;
    protected $import_id;
    public function  __construct($import_id)
    {
        $this->import_id = $import_id;
    }

    public function fromFile(string $fileName)
    {
        $this->fileName = $fileName;
        return $this;
    }

    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new Device([
            'import_id' => $this->import_id,
            'name' => $row[0],
            'address' => $row[1],
            'longitude' => $row[2],
            'latitude' => $row[3],
            'device_type' => $row[4],
            'manufacturer' => $row[5],
            'model' => $row[6],
            'install_date' => $row[7],
            'notes' => $row[8],
            'eui' => $row[9],
            'serial_number' => $row[10],
            'file_name' => $this->fileName
        ]);
    }
}
