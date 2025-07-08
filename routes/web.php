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
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

