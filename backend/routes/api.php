<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\controllers\usercontroller ;
use App\Http\controllers\livrecontroller ;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/singup',[usercontroller::class,'singup']);
Route::post('/login',[usercontroller::class,'login']);

Route::get('/livre', [livrecontroller::class, 'alllivre']); 
Route::get('/livre/{id}', [livrecontroller::class, 'onelivre']); 
Route::post('/livre', [livrecontroller::class, 'store']); 
Route::put('/livre/{id}', [livrecontroller::class, 'update']); 
Route::delete('/livre/{id}', [livrecontroller::class, 'destroy']);