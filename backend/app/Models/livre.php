<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\utilisateur;
use App\Models\location;
class livre extends Model
{
    protected $fillable=[
        'nom',
        'auteur',
        'categorie',
        'description'
    ];
      public function utilisateurs()
    {
        
        return  $this->belongsToMany(Utilisateur::class, 'locations')
                    ->using(location::class) 
                    ->withTimestamps();
    }
}
