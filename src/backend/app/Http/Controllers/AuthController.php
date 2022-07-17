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

        if (! $token = auth()->attempt($credentials)) {
            return response()->json([
                'status'    => false,
                'message'   => 'Usuario no autorizado',
                'data'      => []
            ], 401);
        }


        return $this->respondWithToken($token);
    }

    // TODO Obtener la información del usuario
    public function me()
    {
        return response()->json([
            'status'   => true,
            'message'       =>  'Información de usuario',
            'data'      => [
                auth()->user()
            ]
        ]);
    }

    // TODO Cierre de sesión
    public function logout()
    {
        auth()->logout();

        return response()->json([
            'status'    => true,
            'message'   => 'Successfully logged out',
            'data'      => []
        ]);
    }

    // TODO Actualizar el token
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    // TODO retornar un json con status true y la info del token
    protected function respondWithToken($token)
    {
        return response()->json([
            'status' => true,
            'message' => 'token',
            'data' =>[
                [
                    'access_token' => $token,
                    'token_type' => 'bearer',
                    'expires_in' => auth()->factory()->getTTL() * 60
                ]
            ]
        ]);
    }

    // TODO Creación de nuevo usuario
    public function register(Request $request){

        // Validar los datos enviados
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:6'
        ]);

        // En caso de existir un error se retorna un json con status fall y la lista de errores
        if($validator->fails()){
            return response()->json([
                'status'    => false,
                'message'   => 'Ah ocurrido un error al guardar el usuario',
                'data'   => [$validator->errors()]
            ], 400);
        }

        // Crear un nuevo usuario con los datos enviados y sustituir la contraseña por la misma pero encriptada con bcrypt
        $user = User::create(array_merge(
            $validator->validate(),
            ['password' => bcrypt($request->password)]
        ));

        // Retornar un json con status true y la información del usuario
        return response()->json([
            'status'    =>  true,
            'message'   => 'Usuario Registrado exitosamente',
            'data'      =>  [
                $user
            ]
        ], 201);
    }
}
