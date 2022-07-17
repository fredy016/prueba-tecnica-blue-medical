<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estancia extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_auto',
        'id_user'
    ];

    public function auto(){
        return $this->belongsTo(Auto::class, 'id');
    }
}
