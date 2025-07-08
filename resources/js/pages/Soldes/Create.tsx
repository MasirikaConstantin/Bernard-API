import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface Motocycliste {
    id: number;
    nom: string;
    prenom: string;
}

interface Props {
    motocyclistes: Motocycliste[];
    typesSolde: Record<string, string>;
}

export default function SoldeCreate({ motocyclistes, typesSolde }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        motocycliste_id: '',
        montant: '',
        type_solde: '',
        numero_compte: '',
        description: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('soldes.store'));
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Soldes',
            href: '/soldes',
        },
        {
            title: 'Créer un solde',
            href: '/soldes/create',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Créer un solde" />

            <div className="container py-6 px-6">
                <h1 className="text-2xl font-bold mb-6">Créer un nouveau solde</h1>

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
                                        <SelectValue placeholder="Sélectionnez un motocycliste" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {motocyclistes.map((motocycliste) => (
                                            <SelectItem key={motocycliste.id} value={motocycliste.id.toString()}>
                                                {motocycliste.nom} {motocycliste.prenom}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.motocycliste_id && (
                                    <p className="text-sm text-red-500">{errors.motocycliste_id}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="type_solde">Type de solde</Label>
                                <Select
                                    value={data.type_solde}
                                    onValueChange={(value) => setData('type_solde', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionnez un type de solde" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(typesSolde).map(([value, label]) => (
                                            <SelectItem key={value} value={value}>
                                                {label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.type_solde && <p className="text-sm text-red-500">{errors.type_solde}</p>}
                            </div>

                            <div>
                                <Label htmlFor="montant">Montant (FC)</Label>
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
                                <Label htmlFor="numero_compte">Numéro de compte</Label>
                                <Input
                                    id="numero_compte"
                                    value={data.numero_compte}
                                    onChange={(e) => setData('numero_compte', e.target.value)}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={3}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button type="button" variant="outline" asChild>
                                <a href={route('soldes.index')}>Annuler</a>
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