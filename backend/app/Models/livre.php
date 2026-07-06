<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Livre extends Model
{
    
    protected $table = 'livres'; 

    protected $fillable=[
        'nom',
        'auteur',
        'categorie',
        'description'
    ];
}