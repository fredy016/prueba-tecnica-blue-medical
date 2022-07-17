<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateEstanciasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('estancias', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_auto');
            $table->unsignedBigInteger('id_user');
            $table->timestamp('entrada')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->time('salida')->nullable();
            $table->timestamps();

            // TODO Definir las llaves foranea
            $table->foreign('id_auto')->references('id')->on('autos');
            $table->foreign('id_user')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('estancias', function (Blueprint $table) {
            $table->dropForeign('estancias_id_auto_foreign');
            $table->dropForeign('estancias_id_user_foreign');
        });
        Schema::dropIfExists('estancias');
    }
}
