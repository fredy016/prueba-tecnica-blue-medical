<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\Auto;

class AutosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // TODO Obtener todos los datos de Autos
        $tipos = Auto::all();
        return response()->json([
            'status' => true,
            'message' => 'Lista de autos',
            'data' => $tipos
        ]);
    }

    public function store(Request $request)
    {
        // TODO Validar la información
        $validator = Validator::make($request->all(), [
            'placa' => 'required|max:20',
            'id_tipo' => 'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'status'    => false,
                'message'   => 'Ah ocurrido un error al crear el auto',
                'data'   => [$validator->errors()]
            ], 400);
        }

        // TODO Crear un nuevo tipo de auto
        Auto::create($request->all());

        // TODO Retornar un mensaje con el estado
        return response()->json([
            'status' => true,
            'message' => 'Auto creado exitosamente',
            'data' => null
        ]);
    }

    public function show($id)
    {
        // TODO Obtener todos los datos de un Auto
        $tipo = Auto::find($id);

        $message = 'Auto '.$id;
        $status = true;
        if (!$tipo) {
            $status = false;
            $message = 'No se ha encontrado el auto solicitado';
        }

        return response()->json(array(
            'status' => $status,
            'message' => $message,
            'data' => $tipo ? $tipo : []
        ));
    }

    public function update(Request $request, $id)
    {
        // TODO Buscar un auto
        $tipo = Auto::find($id);

        $message = 'No se ha encontrado el auto solicitado';
        $status = false;

        // TODO Si se encuentra el elemento, entonces se actualiza
        if ($tipo) {
            $tipo->update($request->all());
            $status = true;
            $message = 'Auto actualizado corectamente';
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
        $elementosEliminados = Auto::destroy($id);

        $status = true;
        $message = 'Auto eliminado correctamente';

        if($elementosEliminados != null || $elementosEliminados <= 0){
            $status=false;
            $message='No se ha encontrado el auto solicitado';
        }

        return response()->json(array(
            'status' => $status,
            'message' => $message,
            'data' => null
        ));
    }
}
