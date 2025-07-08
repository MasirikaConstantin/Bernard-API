import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface Taxe {
    id: number;
    nom: string;
}

interface Props {
    taxes: Taxe[];
}

export default function PaiementCreate({ taxes }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        taxe_id: '',
        montant: '',
        mode_paiement: '',
        reference: '',
        statut: 'succès',
        details: {},
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('paiements.store'));
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Paiements',
            href: '/paiements',
        },
        {
            title: 'Créer un paiement',
            href: '/paiements/create',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Créer un paiement" />

            <div className="container py-6 px-6">
                <h1 className="text-2xl font-bold mb-6">Créer un nouveau paiement</h1>

                <div className="p-6 rounded-lg shadow">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="taxe_id">Taxe</Label>
                                <Select
                                    value={data.taxe_id}
                                    onValueChange={(value) => setData('taxe_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionnez une taxe" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {taxes.map((taxe) => (
                                            <SelectItem key={taxe.id} value={taxe.id.toString()}>
                                                {taxe.nom}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.taxe_id && <p className="text-sm text-red-500">{errors.taxe_id}</p>}
                            </div>

                            <div>
                                <Label htmlFor="montant">Montant</Label>
                                <Input
                                    id="montant"
                                    type="number"
                                    value={data.montant}
                                    onChange={(e) => setData('montant', e.target.value)}
                                    required
                                />
                                {errors.montant && <p className="text-sm text-red-500">{errors.montant}</p>}
                            </div>

                            <div>
                                <Label htmlFor="mode_paiement">Mode de paiement</Label>
                                <Input
                                    id="mode_paiement"
                                    value={data.mode_paiement}
                                    onChange={(e) => setData('mode_paiement', e.target.value)}
                                    required
                                />
                                {errors.mode_paiement && (
                                    <p className="text-sm text-red-500">{errors.mode_paiement}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="reference">Référence</Label>
                                <Input
                                    id="reference"
                                    value={data.reference}
                                    onChange={(e) => setData('reference', e.target.value)}
                                    required
                                />
                                {errors.reference && <p className="text-sm text-red-500">{errors.reference}</p>}
                            </div>

                            <div>
                                <Label htmlFor="statut">Statut</Label>
                                <Select
                                    value={data.statut}
                                    onValueChange={(value) => setData('statut', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionnez un statut" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="succès">Succès</SelectItem>
                                        <SelectItem value="échoué">Échoué</SelectItem>
                                        <SelectItem value="en attente">En attente</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.statut && <p className="text-sm text-red-500">{errors.statut}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <Label htmlFor="details">Détails (JSON)</Label>
                                <Textarea
                                    id="details"
                                    value={JSON.stringify(data.details, null, 2)}
                                    onChange={(e) => {
                                        try {
                                            setData('details', JSON.parse(e.target.value));
                                        } catch (error) {
                                            // Ignore invalid JSON
                                        }
                                    }}
                                    rows={4}
                                />
                                {errors.details && <p className="text-sm text-red-500">{errors.details}</p>}
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button type="button" variant="outline" asChild>
                                <a href={route('paiements.index')}>Annuler</a>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Enregistrement...' : 'Enregistrer'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}