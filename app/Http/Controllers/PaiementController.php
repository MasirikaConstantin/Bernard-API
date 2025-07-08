<?php

namespace App\Http\Controllers;

use App\Models\Paiement;
use App\Models\Taxe;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaiementController extends Controller
{
    public function index()
    {
        $paiements = Paiement::with('taxe')->latest()->paginate(10);
        
        return Inertia::render('Paiements/Index', [
            'paiements' => $paiements,
        ]);
    }

    public function create()
    {
        $taxes = Taxe::all();
        
        return Inertia::render('Paiements/Create', [
            'taxes' => $taxes,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'taxe_id' => 'required|exists:taxes,id',
            'montant' => 'required|numeric|min:0',
            'mode_paiement' => 'required|string|max:255',
            'reference' => 'required|string|max:255|unique:paiements',
            'statut' => 'required|in:succès,échoué,en attente',
            'details' => 'nullable|array',
        ]);

        Paiement::create($validated);

        return redirect()->route('paiements.index')->with('success', 'Paiement créé avec succès.');
    }

    public function show(Paiement $paiement)
    {
        return Inertia::render('Paiements/Show', [
            'paiement' => $paiement->load('taxe'),
        ]);
    }

    public function edit(Paiement $paiement)
    {
        $taxes = Taxe::all();
        
        return Inertia::render('Paiements/Edit', [
            'paiement' => $paiement,
            'taxes' => $taxes,
        ]);
    }

    public function update(Request $request, Paiement $paiement)
    {
        $validated = $request->validate([
            'taxe_id' => 'required|exists:taxes,id',
            'montant' => 'required|numeric|min:0',
            'mode_paiement' => 'required|string|max:255',
            'reference' => 'required|string|max:255|unique:paiements,reference,'.$paiement->id,
            'statut' => 'required|in:succès,échoué,en attente',
            'details' => 'nullable|array',
        ]);

        $paiement->update($validated);

        return redirect()->route('paiements.index')->with('success', 'Paiement mis à jour avec succès.');
    }

    public function destroy(Paiement $paiement)
    {
        $paiement->delete();

        return redirect()->route('paiements.index')->with('success', 'Paiement supprimé avec succès.');
    }
}