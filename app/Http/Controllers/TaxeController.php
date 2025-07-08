<?php

namespace App\Http\Controllers;

use App\Models\Taxe;
use App\Models\Motocycliste;
use App\Models\Agent;
use App\Models\Tarif;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaxeController extends Controller
{
    public function index()
    {
        $taxes = Taxe::with(['motocycliste', 'agent', 'tarif'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Taxes/Index', [
            'taxes' => $taxes,
        ]);
    }

    public function create()
    {
        $motocyclistes = Motocycliste::all();
        $agents = Agent::all();
        $tarifs = Tarif::where('is_active', true)->get();

        return Inertia::render('Taxes/Create', [
            'motocyclistes' => $motocyclistes,
            'agents' => $agents,
            'tarifs' => $tarifs,
            'modesPaiement' => ['cash', 'mobile money', 'carte'],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'motocycliste_id' => 'required|exists:motocyclistes,id',
            'agent_id' => 'nullable|exists:agents,id',
            'tarif_id' => 'required|exists:tarifs,id',
            'montant' => 'required|numeric|min:0',
            'date_paiement' => 'required|date',
            'date_expiration' => 'required|date|after_or_equal:date_paiement',
            'statut' => 'required|in:payé,impayé,en retard',
            'mode_paiement' => 'required|in:cash,mobile money,carte',
            'reference_paiement' => 'nullable|string|unique:taxes,reference_paiement',
            'notes' => 'nullable|string',
        ]);

        Taxe::create($validated);

        return redirect()->route('taxes.index')->with('success', 'Taxe créée avec succès.');
    }

    public function show(string $taxe)
    {
        $taxe = Taxe::where('id',$taxe)->firstOrFail();
        return Inertia::render('Taxes/Show', [
            'tax' => $taxe->load(['motocycliste', 'agent', 'tarif']),
        ]);
    }

    public function edit(string $taxe)
    {
        $taxe = Taxe::where('id',$taxe)->firstOrFail();
        $motocyclistes = Motocycliste::all();
        $agents = Agent::all();
        $tarifs = Tarif::where('is_active', true)->get();

        return Inertia::render('Taxes/Edit', [
            'tax' => $taxe,
            'motocyclistes' => $motocyclistes,
            'agents' => $agents,
            'tarifs' => $tarifs,
            'modesPaiement' => ['cash', 'mobile money', 'carte'],
        ]);
    }

    public function update(Request $request, Taxe $taxe)
    {
        $validated = $request->validate([
            'motocycliste_id' => 'required|exists:motocyclistes,id',
            'agent_id' => 'nullable|exists:agents,id',
            'tarif_id' => 'required|exists:tarifs,id',
            'montant' => 'required|numeric|min:0',
            'date_paiement' => 'required|date',
            'date_expiration' => 'required|date|after_or_equal:date_paiement',
            'statut' => 'required|in:payé,impayé,en retard',
            'mode_paiement' => 'required|in:cash,mobile money,carte',
            'reference_paiement' => 'nullable|string|unique:taxes,reference_paiement,' . $taxe->id,
            'notes' => 'nullable|string',
        ]);

        $taxe->update($validated);

        return redirect()->route('taxes.index')->with('success', 'Taxe mise à jour avec succès.');
    }

    public function destroy(Taxe $taxe)
    {
        $taxe->delete();

        return redirect()->route('taxes.index')->with('success', 'Taxe supprimée avec succès.');
    }
}