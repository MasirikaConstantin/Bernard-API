import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Motocycliste } from '@/types';
import AppLayout from '@/layouts/app-layout';

export default function MotocyclisteShow({ motocycliste }: { motocycliste: Motocycliste }) {
    return (
        <AppLayout >
            <Head title={`Détails de ${motocycliste.nom} ${motocycliste.prenom}`} />

            <div className="container py-6 px-6" >
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">
                        Détails du motocycliste: {motocycliste.nom} {motocycliste.prenom}
                    </h1>
                    <div className="space-x-2">
                        <Button variant="outline" asChild>
                            <Link href={route('motocyclistes.index')}>Retour</Link>
                        </Button>
                        <Button asChild>
                            <Link href={route('motocyclistes.edit', motocycliste.id)}>Modifier</Link>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informations personnelles</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Nom complet</p>
                                <p className="font-medium">
                                    {motocycliste.nom} {motocycliste.postnom} {motocycliste.prenom}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Téléphone</p>
                                <p className="font-medium">{motocycliste.telephone}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Email</p>
                                <p className="font-medium">{motocycliste.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Statut</p>
                                <Badge variant={motocycliste.is_active ? 'default' : 'destructive'}>
                                    {motocycliste.is_active ? 'Actif' : 'Inactif'}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Informations moto</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Numéro de plaque</p>
                                <p className="font-medium">{motocycliste.numero_plaque}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Photo du permis</p>
                                {motocycliste.photo_permis ? (
                                    <img 
                                        src={`/storage/${motocycliste.photo_permis}`} 
                                        alt="Permis" 
                                        className="h-32 object-contain"
                                    />
                                ) : (
                                    <p className="text-muted-foreground">Aucune photo</p>
                                )}
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Photo de la moto</p>
                                {motocycliste.photo_moto ? (
                                    <img 
                                        src={`/storage/${motocycliste.photo_moto}`} 
                                        alt="Moto" 
                                        className="h-32 object-contain"
                                    />
                                ) : (
                                    <p className="text-muted-foreground">Aucune photo</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}