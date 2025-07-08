<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AgentController;
use App\Http\Controllers\MotocyclisteController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});
Route::resource("controlleurs", UserController::class)->middleware(['auth', 'verified']);




Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('agents', AgentController::class);
});



Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('motocyclistes', MotocyclisteController::class);
});
Route::resource('tarifs', \App\Http\Controllers\TarifController::class);
Route::resource('paiements', \App\Http\Controllers\PaiementController::class)
    ->middleware(['auth', 'verified']);

    Route::resource('tarifs', \App\Http\Controllers\TarifController::class)
    ->middleware(['auth', 'verified']);

Route::resource('taxes', \App\Http\Controllers\TaxeController::class)
    ->middleware(['auth', 'verified']);
    Route::resource('soldes', \App\Http\Controllers\SoldeController::class)
    ->middleware(['auth', 'verified']);

Route::post('soldes/{solde}/ajouter', [\App\Http\Controllers\SoldeController::class, 'ajouter'])
    ->name('soldes.ajouter')
    ->middleware(['auth', 'verified']);

Route::post('soldes/{solde}/retirer', [\App\Http\Controllers\SoldeController::class, 'retirer'])
    ->name('soldes.retirer')
    ->middleware(['auth', 'verified']);

    // Dans routes/web.php
Route::get('soldes/{solde}/du-ajouter', function (\App\Models\Solde $solde) {
    return Inertia::render('Soldes/Ajouter', [
        'solde' => $solde->load('motocycliste'),
        'action' => 'ajouter',
    ]);
})->name('soldes.ajouter');

Route::get('soldes/{solde}/du-retirer', function (\App\Models\Solde $solde) {
    return Inertia::render('Soldes/Ajouter', [
        'solde' => $solde->load('motocycliste'),
        'action' => 'retirer',
    ]);
})->name('soldes.retirer');
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

