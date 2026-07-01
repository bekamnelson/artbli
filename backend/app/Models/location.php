<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\location;
class location extends Model
{
    protected $table = 'locations';
    public $timestamps = true;
    protected $fillable=[
        'livre_id',
        'utilisateur_id'
    ];

    

}
