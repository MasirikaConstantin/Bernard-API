import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default function TaxShow({ tax }: { tax: any }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Taxes',
            href: '/taxes',
        },
        {
            title: 'Détails de la taxe',
            href: `/taxes/${tax.id}`,
        },
    ];

    const getStatusBadge = (statut: string) => {
        switch (statut) {
            case 'payé':
                return <Badge variant="default">Payé</Badge>;
            case 'impayé':
                return <Badge variant="destructive">Impayé</Badge>;
            case 'en retard':
                return <Badge variant="warning">En retard</Badge>;
            default:
                return <Badge>{statut}</Badge>;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Détails de la taxe #${tax.id}`} />

            <div className="container py-6 px-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Détails de la taxe #{tax.id}</h1>
                    <div className="space-x-2">
                        <Button variant="outline" asChild>
                            <a href={route('taxes.index')}>Retour</a>
                        </Button>
                        <Button asChild>
                            <a href={route('taxes.edit', tax.id)}>Modifier</a>
                        </Button>
                    </div>
                </div>

                <div className=" rounded-lg shadow p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Informations générales</h2>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500">Motocycliste</p>
                                    <p>{tax.motocycliste.nom} {tax.motocycliste.prenom}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Agent</p>
                                    <p>{tax.agent ? `${tax.agent.nom} ${tax.agent.prenom}` : 'Non attribué'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Tarif</p>
                                    <p>{tax.tarif.type_taxe} - {tax.tarif.montant} ({tax.tarif.periode})</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Montant</p>
                                    <p>{parseFloat(tax.montant).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold mb-4">Détails de paiement</h2>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500">Date de paiement</p>
                                    <p>{format(new Date(tax.date_paiement), 'dd/MM/yyyy')}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Date d'expiration</p>
                                    <p>{format(new Date(tax.date_expiration), 'dd/MM/yyyy')}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Statut</p>
                                    {getStatusBadge(tax.statut)}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Mode de paiement</p>
                                    <p>{tax.mode_paiement}</p>
                                </div>
                                {tax.reference_paiement && (
                                    <div>
                                        <p className="text-sm text-gray-500">Référence de paiement</p>
                                        <p>{tax.reference_paiement}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {tax.notes && (
                            <div className="md:col-span-2">
                                <h2 className="text-lg font-semibold mb-4">Notes</h2>
                                <p className="whitespace-pre-line">{tax.notes}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}