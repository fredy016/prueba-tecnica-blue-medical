<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use Mockery\Exception;
use Tymon\JWTAuth\Exceptions\UserNotDefinedException;

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
        // TODO Validar la sesión
        $usuario = null;
        try {
            $usuario = auth()->userOrFail();
        } catch (UserNotDefinedException $e) {
            return $this->mensajeRespuesta(false, 'Usuario no autorizado', null, false);
        }

        // TODO Obtener todos los datos de Autos
        $autos = Auto::all();
        return $this->mensajeRespuesta(true, 'Lista de autos', $autos);
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

    public function store(Request $request)
    {
        // TODO Validar la sesión
        try {
            auth()->userOrFail();
        } catch (UserNotDefinedException $e) {
            return $this->mensajeRespuesta(false, 'Usuario no autorizado', null, false);
        }

        // TODO Validar la información
        $parametros = $request->all();
        $validator = Validator::make($parametros, [
            'placa' => 'required|max:20',
            'id_tipo' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->mensajeRespuesta(false, 'Ah ocurrido un error al crear el auto', [$validator->errors()]);
        }

        // TODO Valiodar si el auto existe
        $auto = Auto::where('placa', $parametros['placa'])->first();
        if ($auto) {
            // TODO Retornar un mensaje advirtiendo que el auto ya existe
            return $this->mensajeRespuesta(false, 'El auto ingresado ya se encuentra en la lista de autos', null);
        }
        // TODO Crear un nuevo tipo de auto
        Auto::create($request->all());

        // TODO Retornar un mensaje con el estado
        return $this->mensajeRespuesta(true, 'Auto creado exitosamente', null);
    }

    public function show($id)
    {
        // TODO Validar la sesión
        try {
            auth()->userOrFail();
        } catch (UserNotDefinedException $e) {
            return $this->mensajeRespuesta(false, 'Usuario no autorizado', null, false);
        }

        // TODO Obtener todos los datos de un Auto
        $tipo = Auto::find($id);

        $message = 'Auto ' . $id;
        $status = true;
        if (!$tipo) {
            $status = false;
            $message = 'No se ha encontrado el auto solicitado';
        }

        return $this->mensajeRespuesta($status, $message, $tipo ? $tipo : []);
    }

    public function update(Request $request, $id)
    {
        // TODO Validar la sesión
        try {
            auth()->userOrFail();
        } catch (UserNotDefinedException $e) {
            return $this->mensajeRespuesta(false, 'Usuario no autorizado', null, false);
        }

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
        return $this->mensajeRespuesta($status, $message, null);

    }

    public function destroy($id)
    {
        // TODO Validar la sesión
        try {
            auth()->userOrFail();
        } catch (UserNotDefinedException $e) {
            return $this->mensajeRespuesta(false, 'Usuario no autorizado', null, false);
        }

        // TODO Validar si el auto tiene estancias
        $auto = Auto::find($id);
        if(!$auto)
            return $this->mensajeRespuesta(false, 'No se ha encontrado el auto a eliminar');
        $estancias = $auto->estancias;
        if($estancias)
            return $this->mensajeRespuesta(false, 'No se puede eliminar el auto debido a que tiene estancias registradas');

        // TODO Eliminar un elemento
        $elementosEliminados = Auto::destroy($id);

        $status = true;
        $message = 'Auto eliminado correctamente';


        if ($elementosEliminados != null || $elementosEliminados <= 0) {
            $status = false;
            $message = 'No se ha encontrado el auto solicitado';
        }

        return $this->mensajeRespuesta($status, $message);
    }

    public function Tipo(Request $request, $tipo)
    {
        // TODO Validar la sesión
        $usuario = null;
        try {
            $usuario = auth()->userOrFail();
        } catch (UserNotDefinedException $e) {
            return $this->mensajeRespuesta(false, 'Usuario no autorizado', null, false);
        }

        // TODO Obtener todos los datos de Autos
        $autos = Auto::where('id_tipo', $tipo)->get();
        return $this->mensajeRespuesta(true, 'Lista de autos', $autos);
    }
}
