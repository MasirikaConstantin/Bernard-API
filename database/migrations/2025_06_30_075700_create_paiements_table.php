<?php

use App\Models\Taxe;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('paiements', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Taxe::class)->constrained()->cascadeOnDelete();
            $table->decimal('montant', 10, 2);
            $table->string('mode_paiement');
            $table->string('reference');
            $table->string('statut'); // succès, échoué, en attente
            $table->json('details')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paiements');
    }
};
