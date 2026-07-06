<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\controllers\UserController ;
use App\Http\controllers\livrecontroller ;
use App\Http\Controllers\LocationController; 


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/singup',[UserController::class,'singup']);
Route::post('/login',[UserController::class,'login']);

Route::get('/users', [UserController::class, 'index']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

Route::get('/livre', [livrecontroller::class, 'alllivre']); 
Route::get('/livre/{id}', [livrecontroller::class, 'onelivre']); 
Route::post('/livre', [livrecontroller::class, 'store']); 
Route::put('/livre/{id}', [livrecontroller::class, 'update']); 
Route::delete('/livre/{id}', [livrecontroller::class, 'destroy']);

Route::post('/emprunt', [LocationController::class, 'store']);
Route::get('/user/{id}/emprunts', [LocationController::class, 'userEmprunts']);