import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

interface Solde {
    id: number;
    montant: number;
    type_solde: string;
    motocycliste: {
        nom: string;
        prenom: string;
    };
}

interface Props {
    solde: Solde;
    action: 'ajouter' | 'retirer';
}

export default function SoldeAjouter({ solde, action }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        montant: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route(`soldes.${action}`, solde.id));
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Soldes',
            href: '/soldes',
        },
        {
            title: action === 'ajouter' ? 'Ajouter un montant' : 'Retirer un montant',
            href: '#',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={action === 'ajouter' ? 'Ajouter un montant' : 'Retirer un montant'} />

            <div className="container py-6 px-6">
                <h1 className="text-2xl font-bold mb-6">
                    {action === 'ajouter' ? 'Ajouter un montant' : 'Retirer un montant'}
                </h1>

                <div className="p-6 rounded-lg shadow">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold">Solde actuel</h2>
                        <p className="text-2xl font-bold">{solde.montant.toLocaleString()} FC</p>
                        <p className="text-gray-500">
                            {solde.motocycliste.nom} {solde.motocycliste.prenom} - {solde.type_solde}
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <Label htmlFor="montant">
                                Montant à {action === 'ajouter' ? 'ajouter' : 'retirer'} (FC)
                            </Label>
                            <Input
                                id="montant"
                                type="number"
                                value={data.montant}
                                onChange={(e) => setData('montant', e.target.value)}
                                required
                            />
                            {errors.montant && <p className="text-sm text-red-500">{errors.montant}</p>}
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button type="button" variant="outline" asChild>
                                <a href={route('soldes.index')}>Annuler</a>
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className={action === 'ajouter' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
                            >
                                {processing ? (
                                    'Enregistrement...'
                                ) : action === 'ajouter' ? (
                                    'Ajouter le montant'
                                ) : (
                                    'Retirer le montant'
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}