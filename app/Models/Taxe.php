<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Taxe extends Model
{
    use HasFactory;

    protected $fillable = [
        'motocycliste_id',
        'agent_id',
        'montant',
        'tarif_id',
        'date_paiement',
        'date_expiration',
        'statut',
        'mode_paiement',
        'reference_paiement',
        'notes',
    ];

    protected $casts = [
        'date_paiement' => 'date',
        'date_expiration' => 'date',
    ];

    public function motocycliste()
    {
        return $this->belongsTo(Motocycliste::class);
    }

    public function agent()
    {
        return $this->belongsTo(Agent::class);
    }

    public function tarif()
    {
        return $this->belongsTo(Tarif::class);
    }
}