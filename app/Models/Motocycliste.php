<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Motocycliste extends Model
{
    use HasApiTokens, HasFactory, Notifiable; // Ajoutez HasApiTokens ici
    protected $fillable = [
        'nom',
        'postnom',
        'prenom',
        'telephone',
        'numero_plaque',
        'email',
        'password',
        'photo_permis',
        'photo_moto',
    ];

  

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $hidden = [
        'password',
        'email_verified_at' => 'datetime',
        'is_active' => 'boolean',
        'remember_token',
    ];

    
    public function getPhotoPermisAttribute($value)
    {
        return $value ? asset('storage/'.$value) : null;
    }

    public function getPhotoMotoAttribute($value)
    {
        return $value ? asset('storage/'.$value) : null;
    }
}
