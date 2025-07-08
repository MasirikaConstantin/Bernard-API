import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function TarifCreate() {
    const { data, setData, post, processing, errors } = useForm({
        type_taxe: '',
        periode: 'jour',
        montant: 0,
        is_active: true,
        description: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('tarifs.store'));
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Tarifs',
            href: '/tarifs',
        },
        {
            title: 'Créer un tarif',
            href: '/tarifs/create',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Créer un tarif" />

            <div className="container py-6 px-6">
                <h1 className="text-2xl font-bold mb-6">Créer un nouveau tarif</h1>

                <div className="p-6 rounded-lg shadow">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="type_taxe">Type de taxe</Label>
                                <Input
                                    id="type_taxe"
                                    value={data.type_taxe}
                                    onChange={(e) => setData('type_taxe', e.target.value)}
                                    required
                                />
                                {errors.type_taxe && <p className="text-sm text-red-500">{errors.type_taxe}</p>}
                            </div>

                            <div>
                                <Label htmlFor="periode">Période</Label>
                                <Select
                                    value={data.periode}
                                    onValueChange={(value) => setData('periode', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionner une période" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="jour">Jour</SelectItem>
                                        <SelectItem value="semaine">Semaine</SelectItem>
                                        <SelectItem value="mois">Mois</SelectItem>
                                        <SelectItem value="année">Année</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.periode && <p className="text-sm text-red-500">{errors.periode}</p>}
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

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(checked) => setData('is_active', checked)}
                                />
                                <Label htmlFor="is_active">Actif</Label>
                            </div>

                            <div className="md:col-span-2">
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button type="button" variant="outline" asChild>
                                <a href={route('tarifs.index')}>Annuler</a>
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