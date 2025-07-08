import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

export default function AgentCreate() {
    const { data, setData, post, processing, errors } = useForm({
        matricule: '',
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        password: '',
        zone_affectation: '',
        is_active: true,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('agents.store'));
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Agents',
            href: '/agents',
        },
        {
            title: 'Créer un agent',
            href: '/agents/create',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Créer un agent" />

            <div className="container py-6 px-6">
                <h1 className="text-2xl font-bold mb-6">Créer un nouvel agent</h1>

                <div className="p-6 rounded-lg shadow">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="matricule">Matricule</Label>
                                <Input
                                    id="matricule"
                                    value={data.matricule}
                                    onChange={(e) => setData('matricule', e.target.value)}
                                    required
                                />
                                {errors.matricule && <p className="text-sm text-red-500">{errors.matricule}</p>}
                            </div>

                            <div>
                                <Label htmlFor="nom">Nom</Label>
                                <Input
                                    id="nom"
                                    value={data.nom}
                                    onChange={(e) => setData('nom', e.target.value)}
                                    required
                                />
                                {errors.nom && <p className="text-sm text-red-500">{errors.nom}</p>}
                            </div>

                            <div>
                                <Label htmlFor="prenom">Prénom</Label>
                                <Input
                                    id="prenom"
                                    value={data.prenom}
                                    onChange={(e) => setData('prenom', e.target.value)}
                                    required
                                />
                                {errors.prenom && <p className="text-sm text-red-500">{errors.prenom}</p>}
                            </div>

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                            </div>

                            <div>
                                <Label htmlFor="telephone">Téléphone</Label>
                                <Input
                                    id="telephone"
                                    value={data.telephone}
                                    onChange={(e) => setData('telephone', e.target.value)}
                                    required
                                />
                                {errors.telephone && <p className="text-sm text-red-500">{errors.telephone}</p>}
                            </div>

                            <div>
                                <Label htmlFor="password">Mot de passe</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                            </div>

                            <div>
                                <Label htmlFor="zone_affectation">Zone d'affectation</Label>
                                <Input
                                    id="zone_affectation"
                                    value={data.zone_affectation}
                                    onChange={(e) => setData('zone_affectation', e.target.value)}
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(checked) => setData('is_active', checked)}
                                />
                                <Label htmlFor="is_active">Actif</Label>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button type="button" variant="outline" asChild>
                                <a href={route('agents.index')}>Annuler</a>
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