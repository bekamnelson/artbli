<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\livre;
class utilisateur extends Model
{
    protected $fillable=[
        'username',
        'email',
        'password'
    ];
    public function livres()
    {
        
        return $this->belongsToMany(livre::class, 'location')
                     ->using(location::class) 
                    ->withTimestamps();;
    }
}
