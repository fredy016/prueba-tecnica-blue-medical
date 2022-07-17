<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use Tymon\JWTAuth\Exceptions\UserNotDefinedException;

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
        // TODO Validar la sesión
        try {
            auth()->userOrFail();
        } catch (UserNotDefinedException $e) {
            return $this->mensajeRespuesta(false, 'Usuario no autorizado', null, false);
        }

        // TODO Obtener todos los datos de autoTipo
        $tipos = AutoTipo::all();
        return $this->mensajeRespuesta(true,'Tipo de autos', $tipos);
    }

    public function store(Request $request)
    {
        // TODO Validar la sesión
        try {
            auth()->userOrFail();
        } catch (UserNotDefinedException $e) {
            return $this->mensajeRespuesta(false, 'Usuario no autorizado', null, false);
        }

        // TODO Validar la información
        $validator = Validator::make($request->all(), [
            'descripcion' => 'required|max:100',
            'forma_pago' => 'required'
        ]);

        if($validator->fails()){
            return $this->mensajeRespuesta(false,'Ah ocurrido un error al crear el tipo de auto', [$validator->errors()]);
        }

        // TODO Crear un nuevo tipo de auto
        AutoTipo::create($request->all());

        // TODO Retornar un mensaje con el estado
        return $this->mensajeRespuesta(true,'Tipo de auto creado exitosamente', null);
    }

    public function show($id)
    {
        // TODO Validar la sesión
        try {
            auth()->userOrFail();
        } catch (UserNotDefinedException $e) {
            return $this->mensajeRespuesta(false, 'Usuario no autorizado', null, false);
        }

        // TODO Obtener todos los datos de un autoTipo
        $tipo = AutoTipo::find($id);

        $message = 'Tipo de auto por id';
        $status = true;
        if (!$tipo) {
            $status = false;
            $message = 'No se ha encontrado el tipo de auto';
        }

        return $this->mensajeRespuesta($status,$message, $tipo ? $tipo : []);
    }

    public function update(Request $request, $id)
    {
        // TODO Validar la sesión
        try {
            auth()->userOrFail();
        } catch (UserNotDefinedException $e) {
            return $this->mensajeRespuesta(false, 'Usuario no autorizado', null, false);
        }

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
        return $this->mensajeRespuesta($status,$message);
    }

    public function destroy($id)
    {
        // TODO Validar la sesión
        try {
            auth()->userOrFail();
        } catch (UserNotDefinedException $e) {
            return $this->mensajeRespuesta(false, 'Usuario no autorizado', null, false);
        }

        // TODO Eliminar un elemento
        $elementosEliminados = AutoTipo::destroy($id);

        $status = true;
        $message = 'Tipo de auto eliminado correctamente';

        if($elementosEliminados != null || $elementosEliminados <= 0){
            $status=false;
            $message='No se ha encontrado el tipo de auto solicitado';
        }

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
