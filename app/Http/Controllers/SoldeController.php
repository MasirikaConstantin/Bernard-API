<?php

namespace App\Http\Controllers;

use App\Models\Solde;
use App\Models\Motocycliste;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SoldeController extends Controller
{
    public function index()
    {
        $soldes = Solde::with('motocycliste')
            ->latest()
            ->paginate(10);

        return Inertia::render('Soldes/Index', [
            'soldes' => $soldes,
        ]);
    }

    public function create()
    {
        $motocyclistes = Motocycliste::all();
        
        return Inertia::render('Soldes/Create', [
            'motocyclistes' => $motocyclistes,
            'typesSolde' => Solde::typesSolde(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'motocycliste_id' => 'required|exists:motocyclistes,id',
            'montant' => 'required|numeric|min:0',
            'type_solde' => 'required|in:airtel,orange,vodacom,especes',
            'numero_compte' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        // Vérifier si un solde de ce type existe déjà pour ce motocycliste
        $soldeExist = Solde::where('motocycliste_id', $validated['motocycliste_id'])
            ->where('type_solde', $validated['type_solde'])
            ->first();

        if ($soldeExist) {
            return back()->withErrors([
                'type_solde' => 'Un solde de ce type existe déjà pour ce motocycliste',
            ]);
        }

        Solde::create($validated);

        return redirect()->route('soldes.index')->with('success', 'Solde créé avec succès.');
    }

    public function show(Solde $solde)
    {
        return Inertia::render('Soldes/Show', [
            'solde' => $solde->load('motocycliste'),
        ]);
    }

    public function edit(Solde $solde)
    {
        $motocyclistes = Motocycliste::all();
        
        return Inertia::render('Soldes/Edit', [
            'solde' => $solde,
            'motocyclistes' => $motocyclistes,
            'typesSolde' => Solde::typesSolde(),
        ]);
    }

    public function update(Request $request, Solde $solde)
    {
        $validated = $request->validate([
            'motocycliste_id' => 'required|exists:motocyclistes,id',
            'montant' => 'required|numeric|min:0',
            'type_solde' => 'required|in:airtel,orange,vodacom,especes',
            'numero_compte' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        // Vérifier si un autre solde de ce type existe déjà pour ce motocycliste
        $soldeExist = Solde::where('motocycliste_id', $validated['motocycliste_id'])
            ->where('type_solde', $validated['type_solde'])
            ->where('id', '!=', $solde->id)
            ->first();

        if ($soldeExist) {
            return back()->withErrors([
                'type_solde' => 'Un solde de ce type existe déjà pour ce motocycliste',
            ]);
        }

        $solde->update($validated);

        return redirect()->route('soldes.index')->with('success', 'Solde mis à jour avec succès.');
    }

    public function destroy(Solde $solde)
    {
        $solde->delete();

        return redirect()->route('soldes.index')->with('success', 'Solde supprimé avec succès.');
    }

    public function ajouter(Request $request, Solde $solde)
    {
        $validated = $request->validate([
            'montant' => 'required|numeric|min:0',
        ]);

        $solde->ajouterMontant($validated['montant']);

        return back()->with('success', 'Montant ajouté avec succès.');
    }

    public function retirer(Request $request, Solde $solde)
    {
        $validated = $request->validate([
            'montant' => 'required|numeric|min:0|max:' . $solde->montant,
        ]);

        $solde->retirerMontant($validated['montant']);

        return back()->with('success', 'Montant retiré avec succès.');
    }
}