<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tarif extends Model
{
    protected $fillable = [
        'type_taxe',
        'periode',
        'montant',
        'is_active',
        'description'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'montant' => 'decimal:2'
    ];
}
