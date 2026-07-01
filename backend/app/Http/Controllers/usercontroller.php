<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\utilisateur; 
use Illuminate\Support\Facades\Hash;
class usercontroller extends Controller
{
    function singup(Request $request){
          $donneesValides = $request->validate([
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:utilisateurs,email',
            'password' => 'required|string|min:6',
            'confirmpassword' => 'required|same:password', 
        ]);

        $utilisateur = utilisateur::create([
            'username' => $donneesValides['username'],
            'email' => $donneesValides['email'],
            'password' => Hash::make($donneesValides['password']), 
        ]);
         return response()->json($utilisateur, 201);
    }

    function login(Request $request){
         $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $utilisateur = Utilisateur::where('email', $request->email)->first();

        if (!$utilisateur || !Hash::check($request->password, $utilisateur->password)) {


        return response()->json([
                'error' => 'Identifiants incorrects. Veuillez réessayer.'
            ], 401);
        }

       
        return response()->json($utilisateur, 200);
    }
}
