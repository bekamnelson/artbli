<?php

namespace App\Models;


use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

use App\Models\livre;
use App\Models\location;


class utilisateur extends Authenticatable
{
    use HasApiTokens, Notifiable; 

    protected $fillable = [
        'username',
        'email',
        'password',
        'statut',
    ];

    
    protected $hidden = [
        'password',
    ];

    public function livres()
    {
        
        return $this->belongsToMany(livre::class, 'locations')
                    ->using(location::class) 
                    ->withTimestamps();
    }
}