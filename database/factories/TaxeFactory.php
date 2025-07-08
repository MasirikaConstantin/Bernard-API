<?php

namespace Database\Factories;

use App\Models\Taxe;
use App\Models\Motocycliste;
use App\Models\Agent;
use App\Models\Tarif;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaxeFactory extends Factory
{
    protected $model = Taxe::class;

    public function definition(): array
    {
        $datePaiement = $this->faker->dateTimeBetween('-1 month', 'now');
        $dateExpiration = (clone $datePaiement)->modify('+1 year');

        return [
            'motocycliste_id' => Motocycliste::inRandomOrder()->first()?->id,
            'agent_id' => Agent::inRandomOrder()->first()?->id,
            'tarif_id' => Tarif::inRandomOrder()->first()?->id,
            'montant' => $this->faker->randomFloat(2, 1000, 10000),
            'date_paiement' => $datePaiement->format('Y-m-d'),
            'date_expiration' => $dateExpiration->format('Y-m-d'),
            'statut' => $this->faker->randomElement(['payé', 'impayé', 'en retard']),
            'mode_paiement' => $this->faker->randomElement(['cash', 'mobile money', 'carte']),
            'reference_paiement' => $this->faker->uuid,
            'notes' => $this->faker->optional()->sentence,
        ];
    }
}
