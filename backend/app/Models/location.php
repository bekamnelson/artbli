<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\livre;

class location extends Model
{
    
    protected $table = 'locations'; 

    protected $fillable = [
        'livre_id', 
        'utilisateur_id'
    ];

    public function livre() {
        
        return $this->belongsTo(livre::class, 'livre_id', 'id');
    }
}