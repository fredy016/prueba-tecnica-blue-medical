<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTiempoEstacionadoToAutosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('autos', function (Blueprint $table) {
            // TODO Agregar la nueva columna (tiempo_estacionado)
            $table->mediumInteger('tiempo_estacionado')->default(0)->after('id_tipo');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('autos', function (Blueprint $table) {
            // TODO Eliminar la columna (tiempo_estacionado) 
            $table->dropColumn('tiempo_estacionado');
        });
    }
}
