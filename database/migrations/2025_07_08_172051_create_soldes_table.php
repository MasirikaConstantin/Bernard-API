<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('soldes', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\Motocycliste::class)->constrained()->cascadeOnDelete();
            $table->decimal('montant', 10, 2)->default(0);
            $table->enum('type_solde', ['airtel', 'orange', 'vodacom', 'especes'])->default('especes');
            $table->string('numero_compte')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
            
            $table->unique(['motocycliste_id', 'type_solde']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('soldes');
    }
};