<?php

use App\Http\Controllers\DeviceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
	return $request->user();
});

Route::get('/devices', [DeviceController::class, 'index']);
Route::get('/devices/{id}', [DeviceController::class, 'show']);
Route::get('/devices/search/{name}', [DeviceController::class, 'search']);


/**
 * PROTECTED
 */
Route::group(['middleware' => ['auth:sanctum']], function () {
	Route::post('/devices', [DeviceController::class, 'store']);
	Route::put('/devices/{id}', [DeviceController::class, 'update']);
	Route::delete('/devices/{id}', [DeviceController::class, 'destroy']);
	Route::get('/import', [DeviceController::class, 'import']);
	Route::post('/import', [DeviceController::class, 'import']);
});
