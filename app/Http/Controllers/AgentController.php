<?php

namespace App\Http\Controllers;

use App\Models\Agent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AgentController extends Controller
{
    public function index()
    {
        $agents = Agent::orderBy('nom')->get();
        return Inertia::render('Agents/Index', [
            'agents' => $agents,
        ]);
    }

    public function create()
    {
        return Inertia::render('Agents/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'matricule' => 'required|string|max:255|unique:agents',
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:agents',
            'telephone' => 'required|string|max:255|unique:agents',
            'password' => 'required|string|min:8',
            'zone_affectation' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        Agent::create([
            'matricule' => $request->matricule,
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'password' => Hash::make($request->password),
            'zone_affectation' => $request->zone_affectation,
            'is_active' => $request->is_active ?? true,
        ]);

        return redirect()->route('agents.index')->with('success', 'Agent créé avec succès.');
    }

    public function show(Agent $agent)
    {
        return Inertia::render('Agents/Show', [
            'agent' => $agent,
        ]);
    }

    public function edit(Agent $agent)
    {
        return Inertia::render('Agents/Edit', [
            'agent' => $agent,
        ]);
    }

    public function update(Request $request, Agent $agent)
    {
        $request->validate([
            'matricule' => 'required|string|max:255|unique:agents,matricule,'.$agent->id,
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:agents,email,'.$agent->id,
            'telephone' => 'required|string|max:255|unique:agents,telephone,'.$agent->id,
            'zone_affectation' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $agent->update([
            'matricule' => $request->matricule,
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'zone_affectation' => $request->zone_affectation,
            'is_active' => $request->is_active,
        ]);

        if ($request->filled('password')) {
            $agent->update(['password' => Hash::make($request->password)]);
        }

        return redirect()->route('agents.index')->with('success', 'Agent mis à jour avec succès.');
    }

    public function destroy(Agent $agent)
    {
        $agent->delete();
        return redirect()->route('agents.index')->with('success', 'Agent supprimé avec succès.');
    }
}