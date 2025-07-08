<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MotoController;
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/profile', [AuthController::class, 'profile']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});



    // Vérifier statut de paiement
    Route::get('/moto/{motocyclisteId}/tax-status', [MotoController::class, 'checkTaxStatus']);
    
    // Lister les transactions
    Route::get('/moto/{motocyclisteId}/transactions', [MotoController::class, 'getTransactions']);
    
    // Payer une taxe
    Route::post('/moto/pay-tax', [MotoController::class, 'payTax']);
    
    // Obtenir les soldes
    Route::get('/moto/{motocyclisteId}/soldes', [MotoController::class, 'getSoldes']);
    
    // Obtenir les tarifs
    Route::get('/moto/tarifs', [MotoController::class, 'getTarifs']);
    Route::put('/motocyclistes/{id}', [MotoController::class, 'updateMotocycliste']);
    Route::get('/le-motocycliste/{id}', [MotoController::class, 'getMotocycliste']);
    