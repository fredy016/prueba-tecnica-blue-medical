<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAutosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('autos', function (Blueprint $table) {
            $table->id();
            $table->string('placa', 20)->unique();
            $table->unsignedBigInteger('id_tipo');
            $table->timestamps();

            // TODO Definir la llave foranea
            $table->foreign('id_tipo')->references('id')->on('autos_tipo');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('autos', function (Blueprint $table){
            $table->dropForeign('autos_id_tipo_foreign');
        });
        Schema::dropIfExists('autos');
    }
}
