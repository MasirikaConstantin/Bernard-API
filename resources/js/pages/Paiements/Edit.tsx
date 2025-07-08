import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Taxe {
    id: number;
    nom: string;
}

interface Paiement {
    id: number;
    taxe: Taxe;
    montant: number;
    mode_paiement: string;
    reference: string;
    statut: string;
    details: object;
    created_at: string;
    updated_at: string;
}

interface Props {
    paiement: Paiement;
}

const statusColors: Record<string, string> = {
    'succès': 'bg-green-500',
    'échoué': 'bg-red-500',
    'en attente': 'bg-yellow-500',
};

export default function PaiementShow({ paiement }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Paiements',
            href: '/paiements',
        },
        {
            title: 'Détails du paiement',
            href: `/paiements/${paiement.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Détails du paiement ${paiement.reference}`} />

            <div className="container py-6 px-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Détails du paiement</h1>
                    <div className="space-x-2">
                        <Button variant="outline" asChild>
                            <a href={route('paiements.index')}>Retour</a>
                        </Button>
                        <Button asChild>
                            <a href={route('paiements.edit', paiement.id)}>Modifier</a>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informations générales</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500">Référence</p>
                                <p className="font-medium">{paiement.reference}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Taxe</p>
                                <p className="font-medium">{paiement.taxe.nom}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Montant</p>
                                <p className="font-medium">{paiement.montant.toLocaleString()} FCFA</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Mode de paiement</p>
                                <p className="font-medium">{paiement.mode_paiement}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Statut</p>
                                <Badge className={statusColors[paiement.statut]}>
                                    {paiement.statut}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Détails supplémentaires</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <p className="text-sm text-gray-500">Date de création</p>
                                <p className="font-medium">
                                    {new Date(paiement.created_at).toLocaleString()}
                                </p>
                            </div>

                            <div className="mb-4">
                                <p className="text-sm text-gray-500">Dernière modification</p>
                                <p className="font-medium">
                                    {new Date(paiement.updated_at).toLocaleString()}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 mb-2">Détails techniques</p>
                                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                                    {JSON.stringify(paiement.details, null, 2)}
                                </pre>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}