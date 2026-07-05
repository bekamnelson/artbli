<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\utilisateur; 
use Illuminate\Support\Facades\Hash;

class usercontroller extends Controller
{
  
    public function singup(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:utilisateurs',
            'password' => 'required|string|min:6',
        ]);

       
        $user = utilisateur::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'statut' => 'client' 
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Utilisateur créé avec succès',
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

    
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

      
        $user = utilisateur::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Identifiants incorrects'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Connecté avec succès',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ], 200);
    }
}