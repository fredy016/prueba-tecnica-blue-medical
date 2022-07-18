<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\AutoTipo;

class CreateAutosTipo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('autos_tipo', function (Blueprint $table) {
            $table->id();
            $table->string('descripcion', 100);
            $table->smallInteger('forma_pago');
            $table->timestamps();
        });

        // TODO Crear los tipos de auto que se usarán
        AutoTipo::create(['descripcion' => 'Vehiculos oficiales', 'forma_pago' => 1]);
        AutoTipo::create(['descripcion' => 'Vehiculos residentes', 'forma_pago' => 2]);
        AutoTipo::create(['descripcion' => 'Vehiculos visitantes', 'forma_pago' => 3]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('autos_tipo');
    }
}
