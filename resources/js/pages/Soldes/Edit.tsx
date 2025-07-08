import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';

export default function TaxEdit({ tax, motocyclistes, agents, tarifs }: { 
    tax: any,
    motocyclistes: any[],
    agents: any[],
    tarifs: any[]
}) {
console.log(tax)

    const { data, setData, put, processing, errors } = useForm({
        motocycliste_id: tax.motocycliste_id,
        agent_id: tax.agent_id,
        tarif_id: tax.tarif_id,
        montant: tax.montant,
        date_paiement: format(new Date(tax.date_paiement), 'yyyy-MM-dd'),
        date_expiration: format(new Date(tax.date_expiration), 'yyyy-MM-dd'),
        statut: tax.statut,
        mode_paiement: tax.mode_paiement,
        reference_paiement: tax.reference_paiement || '',
        notes: tax.notes || '',
    });
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('taxes.update', tax.id));
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Taxes',
            href: '/taxes',
        },
        {
            title: 'Modifier la taxe',
            href: `/taxes/${tax.id}/edit`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Modifier la taxe" />

            <div className="container py-6 px-6">
                <h1 className="text-2xl font-bold mb-6">Modifier la taxe</h1>

                <div className="p-6 rounded-lg shadow">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="motocycliste_id">Motocycliste</Label>
                                <Select
                                    value={data.motocycliste_id}
                                    onValueChange={(value) => setData('motocycliste_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionner un motocycliste" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {motocyclistes.map((motocycliste) => (
                                            <SelectItem key={motocycliste.id} value={motocycliste.id}>
                                                {motocycliste.nom} {motocycliste.prenom}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.motocycliste_id && <p className="text-sm text-red-500">{errors.motocycliste_id}</p>}
                            </div>

                            <div>
                                <Label htmlFor="agent_id">Agent</Label>
                                <Select
                                    value={data.agent_id}
                                    onValueChange={(value) => setData('agent_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionner un agent" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={null}>Aucun agent</SelectItem>
                                        {agents.map((agent) => (
                                            <SelectItem key={agent.id} value={agent.id}>
                                                {agent.nom} {agent.prenom}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.agent_id && <p className="text-sm text-red-500">{errors.agent_id}</p>}
                            </div>

                            <div>
                                <Label htmlFor="tarif_id">Tarif</Label>
                                <Select
                                    value={data.tarif_id}
                                    onValueChange={(value) => setData('tarif_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionner un tarif" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {tarifs.map((tarif) => (
                                            <SelectItem key={tarif.id} value={tarif.id}>
                                                {tarif.type_taxe} - {tarif.montant} ({tarif.periode})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.tarif_id && <p className="text-sm text-red-500">{errors.tarif_id}</p>}
                            </div>

                            <div>
                                <Label htmlFor="montant">Montant</Label>
                                <Input
                                    id="montant"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.montant}
                                    onChange={(e) => setData('montant', parseFloat(e.target.value))}
                                    required
                                />
                                {errors.montant && <p className="text-sm text-red-500">{errors.montant}</p>}
                            </div>

                            <div>
                                <Label htmlFor="date_paiement">Date de paiement</Label>
                                <Input
                                    id="date_paiement"
                                    type="date"
                                    value={data.date_paiement}
                                    onChange={(e) => setData('date_paiement', e.target.value)}
                                    required
                                />
                                {errors.date_paiement && <p className="text-sm text-red-500">{errors.date_paiement}</p>}
                            </div>

                            <div>
                                <Label htmlFor="date_expiration">Date d'expiration</Label>
                                <Input
                                    id="date_expiration"
                                    type="date"
                                    value={data.date_expiration}
                                    onChange={(e) => setData('date_expiration', e.target.value)}
                                    required
                                />
                                {errors.date_expiration && <p className="text-sm text-red-500">{errors.date_expiration}</p>}
                            </div>

                            <div>
                                <Label htmlFor="statut">Statut</Label>
                                <Select
                                    value={data.statut}
                                    onValueChange={(value) => setData('statut', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionner un statut" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="payé">Payé</SelectItem>
                                        <SelectItem value="impayé">Impayé</SelectItem>
                                        <SelectItem value="en retard">En retard</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.statut && <p className="text-sm text-red-500">{errors.statut}</p>}
                            </div>

                            <div>
                                <Label htmlFor="mode_paiement">Mode de paiement</Label>
                                <Select
                                    value={data.mode_paiement}
                                    onValueChange={(value) => setData('mode_paiement', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionner un mode de paiement" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="cash">Cash</SelectItem>
                                        <SelectItem value="mobile money">Mobile Money</SelectItem>
                                        <SelectItem value="carte">Carte</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.mode_paiement && <p className="text-sm text-red-500">{errors.mode_paiement}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <Label htmlFor="reference_paiement">Référence de paiement</Label>
                                <Input
                                    id="reference_paiement"
                                    value={data.reference_paiement}
                                    onChange={(e) => setData('reference_paiement', e.target.value)}
                                />
                                {errors.reference_paiement && <p className="text-sm text-red-500">{errors.reference_paiement}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                    id="notes"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                />
                                {errors.notes && <p className="text-sm text-red-500">{errors.notes}</p>}
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button type="button" variant="outline" asChild>
                                <a href={route('taxes.index')}>Annuler</a>
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