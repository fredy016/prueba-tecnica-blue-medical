<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AutoTipo extends Model
{
    use HasFactory;

    protected $fillable = [
        'descripcion',
        'forma_pago'
    ];

    protected $table = 'autos_tipo';
}
