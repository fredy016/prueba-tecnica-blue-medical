<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AutoTipoController;
use App\Http\Controllers\AutosController;
use App\Http\Controllers\RegistroContoller;
use App\Http\Controllers\ControlMesController;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => ['api'],
    'prefix' => 'auth'
], function ($router) {

    Route::post('login', 'App\Http\Controllers\AuthController@login');
    Route::post('logout', 'App\Http\Controllers\AuthController@logout');
    Route::post('refresh', 'App\Http\Controllers\AuthController@refresh');
    Route::post('me', 'App\Http\Controllers\AuthController@me');
    Route::post('register', 'App\Http\Controllers\AuthController@register');
});

// TODO Rutas para registro de entradas y salidas
Route::group([
    'middleware' => ['api'],
    'prefix' => 'registro'
], function ($router) {
    // TODO Ruta para registrar Entrada
    Route::post('entrada', [RegistroContoller::class, 'RegistroEntrada']);

    // TODO Ruta para registrar Salida
    Route::put('salida', [RegistroContoller::class, 'RegistroSalida']);
});

Route::group([
    'middleware' => ['api'],
], function ($route) {
    // TODO Rutas para tipos de autos
    Route::apiResource('autos_tipo', AutoTipoController::class);

    // TODO Rutas para autos
    Route::get('autos/tipo/{tipo}', [AutosController::class, 'Tipo']);
    Route::apiResource('autos', AutosController::class);

    // TODO Rutas para el control del mes
    Route::post('comienza_mes', [ControlMesController::class, 'ComienzaMes']);
});
