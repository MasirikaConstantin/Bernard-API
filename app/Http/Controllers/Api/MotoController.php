<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Motocycliste;
use App\Models\Taxe;
use App\Models\Tarif;
use App\Models\Solde;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class MotoController extends Controller
{
    /**
     * Vérifier le statut de paiement de taxe
     * 
     * @param int $motocyclisteId
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkTaxStatus($motocyclisteId)
    {
        try {
            $motocycliste = Motocycliste::findOrFail($motocyclisteId);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Le motocycliste introuvable',
            ], 404);
        }
        $today = Carbon::today();
        $hasPaid = Taxe::where('motocycliste_id', $motocyclisteId)
            ->where('date_expiration', '>=', $today)
            ->where('statut', 'payé')
            ->exists();
        
        return response()->json([
            'motocycliste_id' => $motocyclisteId,
            'nom' => $motocycliste->nom,
            'prenom' => $motocycliste->prenom,
            'a_paye_taxe' => $hasPaid,
            'date_verification' => $today->toDateString(),
        ]);
    }

    /**
     * Lister toutes les transactions d'un motocycliste
     * 
     * @param int $motocyclisteId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTransactions($motocyclisteId)
    {
        $transactions = Taxe::with(['tarif', 'agent'])
            ->where('motocycliste_id', $motocyclisteId)
            ->orderBy('date_paiement', 'desc')
            ->get()
            ->map(function ($taxe) {
                return [
                    'id' => $taxe->id,
                    'type_taxe' => $taxe->tarif->type_taxe,
                    'periode' => $taxe->tarif->periode,
                    'montant' => $taxe->montant,
                    'date_paiement' => $taxe->date_paiement,
                    'date_expiration' => $taxe->date_expiration,
                    'statut' => $taxe->statut,
                    'mode_paiement' => $taxe->mode_paiement,
                    'reference_paiement' => $taxe->reference_paiement,
                    'agent' => $taxe->agent ? $taxe->agent->nom . ' ' . $taxe->agent->prenom : null,
                ];
            });
        
        return response()->json([
            'motocycliste_id' => $motocyclisteId,
            'transactions' => $transactions,
            'count' => $transactions->count(),
        ]);
    }

    /**
     * Payer une taxe
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function payTax(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'motocycliste_id' => 'required|exists:motocyclistes,id',
            'tarif_id' => 'required|exists:tarifs,id',
            'mode_paiement' => 'required|in:cash,mobile money,carte',
            'type_solde' => 'required_if:mode_paiement,mobile money|in:airtel,orange,vodacom',
            'numero_compte' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $motocycliste = Motocycliste::findOrFail($request->motocycliste_id);
        $tarif = Tarif::findOrFail($request->tarif_id);

        // Vérifier si le motocycliste a déjà payé cette taxe aujourd'hui
        $today = Carbon::today();
        $existingTax = Taxe::where('motocycliste_id', $motocycliste->id)
            ->where('tarif_id', $tarif->id)
            ->where('date_paiement', $today)
            ->first();

        if ($existingTax) {
            return response()->json([
                'success' => false,
                'message' => 'Vous avez déjà payé cette taxe aujourd\'hui'
            ], 400);
        }

        // Calculer la date d'expiration
        $dateExpiration = $this->calculateExpirationDate($today, $tarif->periode);

        // Si paiement mobile money, vérifier le solde
        if ($request->mode_paiement === 'mobile money') {
            $solde = Solde::where('motocycliste_id', $motocycliste->id)
                ->where('type_solde', $request->type_solde)
                ->first();

            if (!$solde || $solde->montant < $tarif->montant) {
                return response()->json([
                    'success' => false,
                    'message' => 'Solde insuffisant pour effectuer ce paiement'
                ], 400);
            }

            // Débiter le solde
            $solde->montant -= $tarif->montant;
            $solde->save();
        }

        // Enregistrer la taxe
        $taxe = Taxe::create([
            'motocycliste_id' => $motocycliste->id,
            'agent_id' => auth()->id(), // Si l'API est utilisée par un agent
            'tarif_id' => $tarif->id,
            'montant' => $tarif->montant,
            'date_paiement' => $today,
            'date_expiration' => $dateExpiration,
            'statut' => 'payé',
            'mode_paiement' => $request->mode_paiement,
            'reference_paiement' => $request->numero_compte ?? $this->generatePaymentReference(),
            'notes' => 'Paiement via API',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Paiement effectué avec succès',
            'taxe' => [
                'id' => $taxe->id,
                'reference' => $taxe->reference_paiement,
                'montant' => $taxe->montant,
                'date_expiration' => $taxe->date_expiration,
            ],
            'solde_restant' => $request->mode_paiement === 'mobile money' ? $solde->montant : null,
        ]);
    }

    /**
     * Calculer la date d'expiration en fonction de la période
     */
    private function calculateExpirationDate(Carbon $date, string $periode): Carbon
    {
        return match ($periode) {
            'jour' => $date->copy()->addDay(),
            'semaine' => $date->copy()->addWeek(),
            'mois' => $date->copy()->addMonth(),
            'année' => $date->copy()->addYear(),
            default => $date->copy()->addDay(),
        };
    }

    /**
     * Générer une référence de paiement
     */
    private function generatePaymentReference(): string
    {
        return 'TAX-' . now()->format('YmdHis') . '-' . rand(100, 999);
    }

    /**
     * Obtenir le solde d'un motocycliste
     */
    public function getSoldes($motocyclisteId)
    {
        $soldes = Solde::where('motocycliste_id', $motocyclisteId)
            ->get()
            ->map(function ($solde) {
                return [
                    'type' => $solde->type_solde,
                    'montant' => $solde->montant,
                    'numero_compte' => $solde->numero_compte,
                ];
            });

        return response()->json([
            'motocycliste_id' => $motocyclisteId,
            'soldes' => $soldes,
        ]);
    }

    /**
 * Lister tous les tarifs disponibles
 * 
 * @return \Illuminate\Http\JsonResponse
 */
public function getTarifs()
{
    $tarifs = Tarif::where('is_active', true)
        ->orderBy('type_taxe')
        ->get()
        ->map(function ($tarif) {
            return [
                'id' => $tarif->id,
                'type_taxe' => $tarif->type_taxe,
                'periode' => $tarif->periode,
                'montant' => $tarif->montant,
                'description' => $tarif->description,
            ];
        });
    
    return response()->json([
        'success' => true,
        'tarifs' => $tarifs,
        'count' => $tarifs->count(),
    ]);
}
}