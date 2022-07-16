<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePagosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pagos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_auto');
            $table->unsignedBigInteger('id_estancia')->nullable();
            $table->unsignedDecimal('monto', 12, 2);
            $table->string('concepto');
            $table->timestamps();

            // TODO Definir las llaves foraneas
            $table->foreign('id_auto')->references('id')->on('autos');
            $table->foreign('id_estancia')->references('id')->on('estancias');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('pagos', function (Blueprint $table){
            $table->dropForeign('pagos_id_auto_foreign');
            $table->dropForeign('pagos_id_estancia_foreign');
        });
        Schema::dropIfExists('pagos');
    }
}
