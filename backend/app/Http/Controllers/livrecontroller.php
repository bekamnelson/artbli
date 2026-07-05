<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Livre; // Assure-toi d'avoir créé le modèle Livre

class livrecontroller extends Controller
{
    
    public function alllivre() {
        $livres = Livre::all();
        return response()->json($livres, 200);
    }

    
    public function onelivre($id) {
        $livre = Livre::find($id);
        
        if(!$livre) {
            return response()->json(['message' => 'Livre introuvable'], 404);
        }
        
        return response()->json($livre, 200);
    }

   
    public function store(Request $request) {
        $request->validate([
            'nom' => 'required|string',
            'auteur' => 'required|string',
            'categorie' => 'required|string',
            'description' => 'required|string'
        ]);

        $livre = Livre::create($request->all());
        return response()->json($livre, 201);
    }

   
    public function update(Request $request, $id) {
        $livre = Livre::find($id);
        
        if(!$livre) {
            return response()->json(['message' => 'Livre introuvable'], 404);
        }

        $livre->update($request->all());
        return response()->json($livre, 200);
    }

    
    public function destroy($id) {
        $livre = Livre::find($id);
        
        if(!$livre) {
            return response()->json(['message' => 'Livre introuvable'], 404);
        }

        $livre->delete();
        return response()->json(['message' => 'Livre supprimé avec succès'], 200);
    }
}