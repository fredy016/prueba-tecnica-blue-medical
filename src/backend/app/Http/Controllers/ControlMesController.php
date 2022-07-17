<?php

namespace App\Http\Controllers;

use App\Models\Auto;
use Illuminate\Http\Request;

use Tymon\JWTAuth\Exceptions\UserNotDefinedException;

use App\Models\Estancia;

class ControlMesController extends Controller
{
    public function ComienzaMes(Request $request)
    {
        // TODO Validar la sesión
        try {
            auth()->userOrFail();
        } catch (UserNotDefinedException $e) {
            return $this->mensajeRespuesta(false, 'Usuario no autorizado', null, false);
        }

        // TODO Eliminar las estancias registradas en los coches oficiales
        $estancias = Estancia::whereNotNull('salida')->whereHas('auto', function ($estancia) {
            $estancia->where('id_tipo', 1);
        })->get();

        foreach ($estancias as $estancia) {
            $estancia->delete();
        }

        Auto::where('id_tipo', 2)->update(['tiempo_estacionado' => 0]);

        return $this->mensajeRespuesta(true,'Proceso de iniciar mes, completado correctamente');
    }

    public function mensajeRespuesta($status, $message, $data = null, $logeado = true)
    {
        return response()->json([
            'status' => $status,
            'logeado' => $logeado,
            'message' => $message,
            'data' => $data
        ]);
    }
}
