<?php

namespace App\Http\Controllers;

use App\Models\Tarif;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TarifController extends Controller
{
    public function index()
    {
        $tarifs = Tarif::all();
        return Inertia::render('Tarifs/Index', [
            'tarifs' => $tarifs,
            'breadcrumbs' => [
                ['title' => 'Tarifs', 'href' => route('tarifs.index')]
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Tarifs/Create', [
            'breadcrumbs' => [
                ['title' => 'Tarifs', 'href' => route('tarifs.index')],
                ['title' => 'Créer un tarif', 'href' => route('tarifs.create')]
            ]
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'type_taxe' => 'required|string|max:255',
            'periode' => 'required|string|in:jour,semaine,mois,année',
            'montant' => 'required|numeric|min:0',
            'is_active' => 'boolean',
            'description' => 'nullable|string'
        ]);

        Tarif::create($request->all());

        return redirect()->route('tarifs.index')->with('success', 'Tarif créé avec succès.');
    }

    public function edit(Tarif $tarif)
    {
        return Inertia::render('Tarifs/Edit', [
            'tarif' => $tarif,
            'breadcrumbs' => [
                ['title' => 'Tarifs', 'href' => route('tarifs.index')],
                ['title' => 'Modifier le tarif', 'href' => route('tarifs.edit', $tarif->id)]
            ]
        ]);
    }

    public function update(Request $request, Tarif $tarif)
    {
        $request->validate([
            'type_taxe' => 'required|string|max:255',
            'periode' => 'required|string|in:jour,semaine,mois,année',
            'montant' => 'required|numeric|min:0',
            'is_active' => 'boolean',
            'description' => 'nullable|string'
        ]);

        $tarif->update($request->all());

        return redirect()->route('tarifs.index')->with('success', 'Tarif mis à jour avec succès.');
    }

    public function destroy(Tarif $tarif)
    {
        $tarif->delete();
        return redirect()->route('tarifs.index')->with('success', 'Tarif supprimé avec succès.');
    }
}