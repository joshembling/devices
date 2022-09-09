<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('devices', function (Blueprint $table) {
            // there was a parsing issue for floats (long and lat), and date format was reading incorrect from google docs to microsoft excel (format issue), so I've kept them as basic varchar fields for now
            $table->id();
            $table->integer('import_id')->nullable();
            $table->string('name', 255)->nullable();
            $table->string('address', 255)->nullable();
            $table->string('longitude', 255)->nullable();
            $table->string('latitude', 255)->nullable();
            $table->string('device_type', 255)->nullable();
            $table->string('manufacturer', 255)->nullable();
            $table->string('model', 255)->nullable();
            $table->string('install_date', 255)->nullable();
            $table->mediumText('notes')->nullable();
            $table->string('eui', 255)->nullable();
            $table->string('serial_number', 255)->nullable();
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('devices');
    }
};
