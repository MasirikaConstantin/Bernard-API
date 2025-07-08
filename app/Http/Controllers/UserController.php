<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::query()
            ->when($request->input('search'), function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString()
            ->through(fn ($user) => [
                'id' => $user->id,
                'ref' => $user->ref,
                'name' => $user->name,
                'email' => $user->email,
                'is_active' => $user->is_active,
                'created_at' => $user->created_at->format('d/m/Y H:i'),
            ]);

        return Inertia::render('Users/Index', [
            'controlleurs' => $users,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Users/Create');
    }

    public function store(StoreUserRequest $request)
    {
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'is_active' => $request->is_active,
        ]);

        return redirect()->route('controlleurs.index')->with('success', 'Utilisateur créé avec succès.');
    }

    public function edit(string $ref)
    {
        $user = User::where('ref', $ref)->first();
        return Inertia::render('Users/Edit', [
            'user' => [
                'id' => $user->id,
                'ref' => $user->ref,
                'name' => $user->name,
                'email' => $user->email,
                'is_active' => $user->is_active,
            ],
        ]);
    }

    public function update(UpdateUserRequest $request, string $ref)
    {
        $user = User::where('ref', $ref)->first();
        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'is_active' => $request->is_active,
        ];

        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return redirect()->route('controlleurs.index')->with('success', 'Utilisateur mis à jour avec succès.');
    }

    public function destroy(string $ref)
    {
        $user = User::where('ref', $ref)->first();
        $user->delete();

        return redirect()->route('controlleurs.index')->with('success', 'Utilisateur supprimé avec succès.');
    }
}