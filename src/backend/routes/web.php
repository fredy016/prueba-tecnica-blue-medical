<?php

use Illuminate\Support\Facades\Route;

use Barryvdh\DomPDF\PDF;

use App\Models\Auto;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/{nombrearchivo}', function ($nombrearchivo) {

    $pdf = app('dompdf.wrapper');

    /*******************************Cuerpo del Reporte en HTML*******************************/
    $autos = Auto::where('id_tipo', 2)->where('tiempo_estacionado', '>', 0)->get();
    $filas = '<tr><td>Núm. placa</td><td>Tiempo estacionado (min.)</td><td align="right">Cantidad a pagar</td></tr>';
    foreach ($autos as $auto) {
        $filas .= '<tr><td>' . $auto->placa . '</td><td>'.$auto->tiempo_estacionado.'</td><td align="right">'.number_format($auto->tiempo_estacionado * 0.05, 2).'</td></tr>';
    }

    $html = '
    <html>
        <body>
            <table width="100%">
                ' . $filas . '
            </table>
        </body>
    </html>';


    /*******************************Cuerpo del Reporte en HTML*******************************/

    $pdf = $pdf->loadHTML($html);
//
//    return $pdf->stream($nombrearchivo.'.pdf');
    return $pdf->download($nombrearchivo.'.pdf');
});
