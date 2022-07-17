<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Auto extends Model
{
    use HasFactory;

    protected $fillable = [
        'placa',
        'id_tipo'
    ];

    public function autos_tipo(){
        return $this->belongsTo(AutoTipo::class, 'id_tipo');
    }

    public function estancias(){
        return $this->hasMany(Estancia::class, 'id_auto');
    }
}
