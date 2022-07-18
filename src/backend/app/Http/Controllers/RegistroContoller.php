<?php

namespace App\Http\Controllers;

use App\Models\Auto;
use App\Models\Pagos;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

use Tymon\JWTAuth\Exceptions\UserNotDefinedException;

use App\Models\Estancia;

class RegistroContoller extends Controller
{
    public function RegistroEntrada(Request $request)
    {
        // TODO Validar la sesión
        $usuario = null;
        try {
            $usuario = auth()->userOrFail();
        } catch (UserNotDefinedException $e) {
            return $this->mensajeRespuesta(false, 'Usuario no autorizado', null, false);
        }

        // TODO Validar la información
        $validator = Validator::make($request->all(), [
            'placa' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->mensajeRespuesta(false,'Ah ocurrido un error al registrar la entrada', [$validator->errors()]);
        }

        // TODO Validar si existe la placa ingresada
        $parametros = $request->all();
        $datos = [
            'placa' => $parametros['placa'],
            'id_user' => $usuario->id,
            'id_auto' => null
        ];
        $auto = Auto::where('placa', '=', $parametros['placa'])->first();

        // TODO Si el auto no existe lo insertamos como un visitante
        if (!$auto) {
            $dataInserted = Auto::create([
                'placa' => $parametros['placa'],
                'id_tipo' => 3
            ]);
            $datos['id_auto'] = $dataInserted->id;
        } else {
            $datos['id_auto'] = $auto->id;
        }

        // TODO Validar que no intenten ingresar un auto que ya está estacionado
        $estanciaActual = $auto->estancias->whereNull('salida')->first();
        if($estanciaActual){
            return $this->mensajeRespuesta(false,'La placa ingresada ya se encuentra dentro del estacionamiento');
        }

        // TODO Registrar la estancia
        Estancia::create($datos);

        return $this->mensajeRespuesta(true,'Registro de entrada');
    }

    public function RegistroSalida(Request $request)
    {
        // TODO Validar la sesión
        try {
            auth()->userOrFail();
        } catch (UserNotDefinedException $e) {
            return $this->mensajeRespuesta(false, 'Usuario no autorizado', null, false);
        }

        // TODO Validar la información
        $validator = Validator::make($request->all(), [
            'placa' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->mensajeRespuesta(false,'Ah ocurrido un error al registrar la salida', [$validator->errors()]);
        }

        $parametros = $request->all();

        // TODO Valores a retornar
        $message = 'Salida de auto realizada correctamente';
        $status = true;

        // TODO Obtener la info del auto
        $auto = Auto::where('placa', $parametros['placa'])->first();
        if ($auto) {

            // TODO Obtener la estancia del auto
            $estanciaActual = $auto->estancias->whereNull('salida')->first();
            if ($estanciaActual) {
                // TODO Guardar la salida de la estancia
                $tiempoSalida = Carbon::now();
                $estanciaActual->salida = $tiempoSalida;
                $estanciaActual->save();

                /*
                 * Formas de pago
                 * 1 - No pagan, solo se registran las estancias
                 * 2 - Paga al final de mes un monto por minuto transcurrido
                 * 3 - Paga la estancia transcurrida, los minutos que estuvo estacionado
                 * */

                // TODO Validar la forma de pago del tipo de auto
                $tipoAuto = $auto->autos_tipo;
                if ($tipoAuto->forma_pago == 2) {
                    $auto->tiempo_estacionado = $auto->tiempo_estacionado + $estanciaActual->getDiffInDaysAttribute();
                    $auto->save();
                }

                if ($tipoAuto->forma_pago == 3) {
                    Pagos::create([
                        'id_auto' => $auto->id,
                        'id_estancia' => $estanciaActual->id,
                        'monto' => $estanciaActual->getDiffInDaysAttribute() * 0.05,
                        'concepto' => 'Pago de visitante',
                    ]);
                }
            } else {
                $message = 'El auto no tiene una estancia activa';
                $status = false;
            }
        } else {
            $message = 'El auto ingresado no existe en el sistema';
            $status = false;
        }

        // TODO Retornar la respuesta en formato json según el caso ocurrido
        return $this->mensajeRespuesta($status,$message);
    }

    public function mensajeRespuesta($status, $message, $data = null, $logeado = true){
        return response()->json([
            'status' => $status,
            'logeado' => $logeado,
            'message' => $message,
            'data' => $data
        ]);
    }
}
