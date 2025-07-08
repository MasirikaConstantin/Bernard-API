<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    protected $fillable = [
        'taxe_id',
        'montant',
        'mode_paiement',
        'reference',
        'statut',
        'details',
    ];


    protected $casts = [
        'details' => 'array',
    ];

    public function taxe()
    {
        return $this->belongsTo(Taxe::class);
    }
}
