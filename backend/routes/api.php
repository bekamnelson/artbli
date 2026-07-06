<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController ;
use App\Http\Controllers\LivreController ;
use App\Http\Controllers\LocationController; 


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/singup',[UserController::class,'singup']);
Route::post('/login',[UserController::class,'login']);

Route::get('/users', [UserController::class, 'index']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

Route::get('/livre', [LivreController::class, 'alllivre']); 
Route::get('/livre/{id}', [LivreController::class, 'onelivre']); 
Route::post('/livre', [LivreController::class, 'store']); 
Route::put('/livre/{id}', [LivreController::class, 'update']); 
Route::delete('/livre/{id}', [LivreController::class, 'destroy']);

Route::post('/emprunt', [LocationController::class, 'store']);
Route::get('/user/{id}/emprunts', [LocationController::class, 'userEmprunts']);