<?php

use App\Models\Agent;
use App\Models\Motocycliste;
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
        Schema::create('taxes', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Motocycliste::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Agent::class)->nullable()->constrained()->cascadeOnDelete();
            $table->decimal('montant', 10, 2);
            $table->string('type_taxe'); // journalière, mensuelle, etc.
            $table->date('date_paiement');
            $table->date('date_expiration');
            $table->string('statut')->default('payé'); // payé, impayé, en retard
            $table->string('mode_paiement'); // cash, mobile money, carte
            $table->string('reference_paiement')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('taxes');
    }
};
