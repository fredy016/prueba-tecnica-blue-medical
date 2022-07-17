<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\AutoTipo;

class AutoTipoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // TODO Obtener todos los datos de autoTipo
        $tipos = AutoTipo::all();
        return response()->json([
            'status' => true,
            'message' => 'Tipo de autos',
            'data' => $tipos
        ]);
    }

    public function store(Request $request)
    {
        // TODO Validar la información
        $validator = Validator::make($request->all(), [
            'descripcion' => 'required|max:100',
            'forma_pago' => 'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'status'    => false,
                'message'   => 'Ah ocurrido un error al crear el tipo de auto',
                'data'   => [$validator->errors()]
            ], 400);
        }

        // TODO Crear un nuevo tipo de auto
        AutoTipo::create($request->all());

        // TODO Retornar un mensaje con el estado
        return response()->json([
            'status' => true,
            'message' => 'Tipo de auto creado exitosamente',
            'data' => null
        ]);
    }

    public function show($id)
    {
        // TODO Obtener todos los datos de un autoTipo
        $tipo = AutoTipo::find($id);

        $message = 'Tipo de auto por id';
        $status = true;
        if (!$tipo) {
            $status = false;
            $message = 'No se ha encontrado el tipo de auto';
        }

        return response()->json(array(
            'status' => $status,
            'message' => $message,
            'data' => $tipo ? $tipo : []
        ));
    }

    public function update(Request $request, $id)
    {
        // TODO Buscar el tipo de auto
        $tipo = AutoTipo::find($id);

        $message = 'No se ha encontrado el tipo de auto solicitado';
        $status = false;

        // TODO Si se encuentra el elemento, entonces se actualiza
        if ($tipo) {
            $tipo->update($request->all());
            $status = true;
            $message = 'Tipo de auto actualizado corectamente';
        }
        return response()->json(array(
            'status' => $status,
            'message' => $message,
            'data' => $request->all()
        ));

    }

    public function destroy($id)
    {
        // TODO Eliminar un elemento
        $elementosEliminados = AutoTipo::destroy($id);

        $status = true;
        $message = 'Tipo de auto eliminado correctamente';

        if($elementosEliminados != null || $elementosEliminados <= 0){
            $status=false;
            $message='No se ha encontrado el tipo de auto solicitado';
        }

        return response()->json(array(
            'status' => $status,
            'message' => $message,
            'data' => null
        ));
    }
}
