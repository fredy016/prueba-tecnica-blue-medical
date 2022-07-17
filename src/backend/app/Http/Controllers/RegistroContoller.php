<?php

namespace App\Http\Controllers;

use App\Models\Auto;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

use App\Models\Estancia;

class RegistroContoller extends Controller
{
    public function RegistroEntrada(Request $request)
    {
        // TODO Validar la información
        $validator = Validator::make($request->all(), [
            'placa' => 'required',
            'id_user' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Ah ocurrido un error al registrar la entrada',
                'data' => [$validator->errors()]
            ], 400);
        }

        // TODO Validar si existe la placa ingresada
        $parametros = $request->all();
        $datos = [
            'placa' => $parametros['placa'],
            'id_user' => $parametros['id_user'],
            'id_auto' => null
        ];
        $auto = Auto::where('placa','=', $parametros['placa'])->first();

        // TODO Si el auto no existe lo insertamos como un visitante
        if (!$auto) {
             $dataInserted = Auto::create([
                'placa' => $parametros['placa'],
                'id_tipo' => 3
            ]);
            $datos['id_auto'] = $dataInserted->id;
        }else{
            $datos['id_auto'] = $auto->id;
        }

        // TODO Registrar la estancia
        Estancia::create($datos);

        return response()->json([
            'status' => true,
            'message' => 'Registro de entrada',
            'data' => []
        ]);
    }

    public function RegistroSalida(Request $request)
    {
        // TODO Validar la información
        $validator = Validator::make($request->all(), [
            'placa' => 'required',
            'id_user' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Ah ocurrido un error al registrar la salida',
                'data' => [$request->all()]
            ], 400);
        }

        $parametros = $request->all();

        // TODO Valores a retornar
        $message = 'Salida de auto realizada correctamente';
        $status = true;

        // TODO Obtener la info del auto
        $auto = Auto::where('placa', $parametros['placa'])->first();
        if($auto){

            // TODO Obtener la estancia del auto
            $estanciaActual = $auto->estancias->whereNull('salida')->first();
            if($estanciaActual){
                // TODO Guardar la salida de la estancia
                $estanciaActual->salida = DB::raw('CURRENT_TIMESTAMP');
                $estanciaActual->save();
            }else{
                $message = 'El auto no tiene una estancia activa';
                $status = false;
            }
        }else{
            $message = 'El auto ingresado no existe en el sistema';
            $status = false;
        }

        // TODO Retornar la respuesta en formato json según el caso ocurrido
        return response()->json([
            'status' => $status,
            'message' => $message,
            'data' => []
        ]);
    }
}