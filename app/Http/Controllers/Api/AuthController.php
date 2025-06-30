<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Motocycliste;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Enregistrement d'un nouveau motocycliste
     */
        public function register(Request $request)
    {
        // Validation des données
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'postnom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'telephone' => 'required|string|unique:motocyclistes|max:15',
            'email' => 'required|string|email|unique:motocyclistes|max:255',
            'password' => 'required|string|min:8|confirmed',
            'photo_permis' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'photo_moto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Traitement des photos
            $photoPermisPath = null;
            $photoMotoPath = null;

            if ($request->hasFile('photo_permis')) {
                $photoPermisPath = $request->file('photo_permis')->store('permis', 'public');
            }

            if ($request->hasFile('photo_moto')) {
                $photoMotoPath = $request->file('photo_moto')->store('motos', 'public');
            }

            // Création du motocycliste
            $motocycliste = Motocycliste::create([
                'nom' => $request->nom,
                'postnom' => $request->postnom,
                'prenom' => $request->prenom,
                'telephone' => $request->telephone,
                'numero_plaque' => $request->numero_plaque ?? null, // Champ optionnel
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'photo_permis' => $photoPermisPath,
                'photo_moto' => $photoMotoPath,
                'is_active' => true // Activer le compte par défaut
            ]);

            // Connexion automatique
            $device_name = $request->header('User-Agent', 'default_device');
            $token = $motocycliste->createToken($device_name)->plainTextToken;

            // Réponse avec les données simplifiées du motocycliste
            $responseData = [
                'success' => true,
                'message' => 'Inscription et connexion réussies',
                'data' => [
                    'user' => [
                        'id' => $motocycliste->id,
                        'nom_complet' => $motocycliste->nom . ' ' . $motocycliste->postnom . ' ' . $motocycliste->prenom,
                        'telephone' => $motocycliste->telephone,
                        'email' => $motocycliste->email,
                        'numero_plaque' => $motocycliste->numero_plaque,
                        'photo_permis_url' => $motocycliste->photo_permis ? asset('storage/'.$motocycliste->photo_permis) : null,
                        'photo_moto_url' => $motocycliste->photo_moto ? asset('storage/'.$motocycliste->photo_moto) : null,
                    ],
                    'access_token' => $token,
                    'token_type' => 'Bearer',
                    'expires_in' => config('sanctum.expiration') // Durée de validité du token
                ]
            ];

            return response()->json($responseData, 201);

        } catch (\Exception $e) {
            // En cas d'erreur inattendue
            return response()->json([
                'success' => false,
                'message' => 'Une erreur est survenue lors de l\'inscription',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Connexion d'un motocycliste
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'device_name' => 'required', // Pour identifier l'appareil
        ]);

        $motocycliste = Motocycliste::where('email', $request->email)->first();

        if (!$motocycliste || !Hash::check($request->password, $motocycliste->password)) {
            throw ValidationException::withMessages([
                'email' => ['Les informations d\'identification sont incorrectes.'],
            ]);
        }

        // Vérifier si le compte est actif
        if (!$motocycliste->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'Votre compte est désactivé. Contactez l\'administration.'
            ], 403);
        }

        // Supprimer les anciens tokens (optionnel)
        $motocycliste->tokens()->where('name', $request->device_name)->delete();

        // Créer un nouveau token
        $token = $motocycliste->createToken($request->device_name)->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Connexion réussie',
            'data' => [
                'motocycliste' => $motocycliste->only(['id', 'nom', 'postnom', 'prenom', 'telephone', 'numero_plaque', 'email']),
                'access_token' => $token,
                'token_type' => 'Bearer',
            ]
        ]);
    }

    /**
     * Déconnexion
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Déconnexion réussie'
        ]);
    }

    /**
     * Récupérer le profil authentifié
     */
    public function profile(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => $request->user()
        ]);
    }
}