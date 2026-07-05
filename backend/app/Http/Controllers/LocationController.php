<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\location;
use App\Models\livre;

class LocationController extends Controller
{
    
    public function store(Request $request) {
        try {
            
            $request->validate([
                'livre_id' => 'required',
                'utilisateur_id' => 'required'
            ]);

           
            $location = location::create([
                'livre_id' => $request->livre_id,
                'utilisateur_id' => $request->utilisateur_id
            ]);

            return response()->json(['message' => 'Livre emprunté avec succès !'], 201);

        } catch (\Exception $e) {
            
            return response()->json([
                'message' => 'Erreur lors de l\'emprunt',
                'erreur_detail' => $e->getMessage() 
            ], 500);
        }
    }

   
    public function userEmprunts($id) {
       
        $emprunts = location::with('livre')->where('utilisateur_id', $id)->get();
        return response()->json($emprunts, 200);
    }
}

