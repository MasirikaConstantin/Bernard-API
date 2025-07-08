<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solde extends Model
{
    use HasFactory;

    protected $fillable = [
        'motocycliste_id',
        'montant',
        'type_solde',
        'numero_compte',
        'description',
    ];

    protected $casts = [
        'montant' => 'decimal:2',
    ];

    public function motocycliste()
    {
        return $this->belongsTo(Motocycliste::class);
    }

    public static function typesSolde(): array
    {
        return [
            'airtel' => 'Airtel Money',
            'orange' => 'Orange Money',
            'vodacom' => 'M-PESA',
            'especes' => 'Espèces',
        ];
    }

    public function getTypeSoldeAttribute($value): string
    {
        return self::typesSolde()[$value] ?? $value;
    }

    public function ajouterMontant(float $montant): void
    {
        $this->update(['montant' => $this->montant + $montant]);
    }

    public function retirerMontant(float $montant): void
    {
        $this->update(['montant' => $this->montant - $montant]);
    }
}