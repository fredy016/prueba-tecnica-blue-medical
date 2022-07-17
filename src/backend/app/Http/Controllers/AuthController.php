<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthController extends Controller
{
    // TODO Constructor, solo las funciones de login y register pueden pasar sin necesitar estar autorizado
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    // TODO Iniciar sesión
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return $this->mensajeRespuesta(false, 'Usuario no autorizado');
        }

        return $this->respondWithToken($token);
    }

    // TODO Obtener la información del usuario

    public function mensajeRespuesta($status, $message, $data = null, $logeado = true)
    {
        return response()->json([
            'status' => $status,
            'logeado' => $logeado,
            'message' => $message,
            'data' => $data
        ]);
    }

    // TODO Cierre de sesión

    protected function respondWithToken($token)
    {
        return $this->mensajeRespuesta(true, 'token', [
            [
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => auth()->factory()->getTTL() * 60
            ]
        ]);
    }

    // TODO Actualizar el token

    public function me()
    {
        return $this->mensajeRespuesta(true, 'Información de usuario', [auth()->user()]);
    }

    // TODO retornar un json con status true y la info del token

    public function logout()
    {
        auth()->logout();

        return $this->mensajeRespuesta(true, 'Cierre de sesión exitoso');
    }

    // TODO Creación de nuevo usuario

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    public function register(Request $request)
    {

        // Validar los datos enviados
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:6'
        ]);

        // En caso de existir un error se retorna un json con status fall y la lista de errores
        if ($validator->fails()) {
            return $this->mensajeRespuesta(false, 'Ah ocurrido un error al guardar el usuario', [$validator->errors()]);
        }

        // Crear un nuevo usuario con los datos enviados y sustituir la contraseña por la misma pero encriptada con bcrypt
        $user = User::create(array_merge(
            $validator->validate(),
            ['password' => bcrypt($request->password)]
        ));

        // TODO Retornar un json con status true y la información del usuario
        return $this->mensajeRespuesta(true, 'Usuario Registrado exitosamente', [$user]);
    }
}
