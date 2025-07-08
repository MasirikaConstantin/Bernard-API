<?php

namespace App\Http\Controllers;

use App\Models\Motocycliste;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MotocyclisteController extends Controller
{
    public function index()
    {
        $motocyclistes = Motocycliste::orderBy('nom')->get();
        return Inertia::render('Motocyclistes/Index', [
            'motocyclistes' => $motocyclistes,
        ]);
    }

    public function create()
    {
        return Inertia::render('Motocyclistes/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'postnom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'telephone' => 'required|string|max:255|unique:motocyclistes',
            'numero_plaque' => 'required|string|max:255|unique:motocyclistes',
            'email' => 'required|string|email|max:255|unique:motocyclistes',
            'password' => 'required|string|min:8',
            'is_active' => 'boolean',
            'photo_permis' => 'nullable|image|max:2048',
            'photo_moto' => 'nullable|image|max:2048',
        ]);

        $data = $request->except(['photo_permis', 'photo_moto']);
        $data['password'] = Hash::make($request->password);

        if ($request->hasFile('photo_permis')) {
            $data['photo_permis'] = $request->file('photo_permis')->store('permis', 'public');
        }

        if ($request->hasFile('photo_moto')) {
            $data['photo_moto'] = $request->file('photo_moto')->store('motos', 'public');
        }

        Motocycliste::create($data);

        return redirect()->route('motocyclistes.index')->with('success', 'Motocycliste créé avec succès.');
    }

    public function show(Motocycliste $motocycliste)
    {
        return Inertia::render('Motocyclistes/Show', [
            'motocycliste' => $motocycliste,
        ]);
    }

    public function edit(Motocycliste $motocycliste)
    {
        return Inertia::render('Motocyclistes/Edit', [
            'motocycliste' => $motocycliste,
        ]);
    }

    public function update(Request $request, Motocycliste $motocycliste)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'postnom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'telephone' => 'required|string|max:255|unique:motocyclistes,telephone,'.$motocycliste->id,
            'numero_plaque' => 'required|string|max:255|unique:motocyclistes,numero_plaque,'.$motocycliste->id,
            'email' => 'required|string|email|max:255|unique:motocyclistes,email,'.$motocycliste->id,
            'is_active' => 'boolean',
            'photo_permis' => 'nullable|image|max:2048',
            'photo_moto' => 'nullable|image|max:2048',
        ]);

        $data = $request->except(['photo_permis', 'photo_moto']);

        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        if ($request->hasFile('photo_permis')) {
            if ($motocycliste->photo_permis) {
                Storage::disk('public')->delete($motocycliste->photo_permis);
            }
            $data['photo_permis'] = $request->file('photo_permis')->store('permis', 'public');
        }

        if ($request->hasFile('photo_moto')) {
            if ($motocycliste->photo_moto) {
                Storage::disk('public')->delete($motocycliste->photo_moto);
            }
            $data['photo_moto'] = $request->file('photo_moto')->store('motos', 'public');
        }

        $motocycliste->update($data);

        return redirect()->route('motocyclistes.index')->with('success', 'Motocycliste mis à jour avec succès.');
    }

    public function destroy(Motocycliste $motocycliste)
    {
        if ($motocycliste->photo_permis) {
            Storage::disk('public')->delete($motocycliste->photo_permis);
        }
        if ($motocycliste->photo_moto) {
            Storage::disk('public')->delete($motocycliste->photo_moto);
        }
        
        $motocycliste->delete();
        return redirect()->route('motocyclistes.index')->with('success', 'Motocycliste supprimé avec succès.');
    }
}