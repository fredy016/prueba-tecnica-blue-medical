<?php

namespace App\Http\Controllers;

use App\Models\Auto;
use Illuminate\Http\Request;

use App\Models\Estancia;

class ControlMesController extends Controller
{
    public function ComienzaMes(Request $request)
    {
        // TODO Eliminar las estancias registradas en los coches oficiales
//        $autosOficiales = Auto::where('id_tipo', 1)->get();
//        foreach ($autosOficiales as $autos){
//            $autos->estancias;
//        }

        $estancias = Estancia::whereNotNull('salida')->whereHas('auto', function ($estancia){
            $estancia->where('id_tipo', 1);
        })->get();

        foreach ($estancias as $estancia){
            $estancia->delete();
        }

        Auto::where('id_tipo', 2)->update(['tiempo_estacionado' => 0]);

        return response()->json([
            'status' => true,
            'message' => 'Proceso de iniciar mes, completado correctamente',
            'data' => null
        ]);
    }
}
