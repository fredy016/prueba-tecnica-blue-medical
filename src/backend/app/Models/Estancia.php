<?php

namespace App\Models;

use Carbon\Carbon;
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

    public function getDiffInDaysAttribute()
    {
        if (!empty($this->entrada) && !empty($this->salida)) {
            $to = Carbon::createFromFormat('Y-m-d H:i:s', $this->entrada);
            $from = Carbon::createFromFormat('Y-m-d H:i:s', $this->salida);
            return $to->diffInMinutes($from);
        }
        return 0;
    }
}
