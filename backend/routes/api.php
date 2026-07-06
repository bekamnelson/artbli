<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\controllers\Usercontroller ;
use App\Http\controllers\livrecontroller ;
use App\Http\Controllers\LocationController; 


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/singup',[Usercontroller::class,'singup']);
Route::post('/login',[Usercontroller::class,'login']);

Route::get('/users', [Usercontroller::class, 'index']);
Route::delete('/users/{id}', [Usercontroller::class, 'destroy']);

Route::get('/livre', [livrecontroller::class, 'alllivre']); 
Route::get('/livre/{id}', [livrecontroller::class, 'onelivre']); 
Route::post('/livre', [livrecontroller::class, 'store']); 
Route::put('/livre/{id}', [livrecontroller::class, 'update']); 
Route::delete('/livre/{id}', [livrecontroller::class, 'destroy']);

Route::post('/emprunt', [LocationController::class, 'store']);
Route::get('/user/{id}/emprunts', [LocationController::class, 'userEmprunts']);