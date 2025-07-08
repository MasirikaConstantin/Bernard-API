import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Motocycliste } from '@/types';
import AppLayout from '@/layouts/app-layout';

export default function MotocyclisteEdit({ motocycliste }: { motocycliste: Motocycliste }) {
    const { data, setData, put, processing, errors } = useForm({
        nom: motocycliste.nom,
        postnom: motocycliste.postnom,
        prenom: motocycliste.prenom,
        telephone: motocycliste.telephone,
        numero_plaque: motocycliste.numero_plaque,
        email: motocycliste.email,
        password: '',
        is_active: motocycliste.is_active,
        photo_permis: null as File | null,
        photo_moto: null as File | null,
    });

    const handleFileChange = (field: 'photo_permis' | 'photo_moto', e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData(field, e.target.files[0]);
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('motocyclistes.update', motocycliste.id));
    };

    return (
        <AppLayout>
            <Head title={`Modifier ${motocycliste.nom} ${motocycliste.prenom}`} />

            <div className="container py-6 px-6">
                <h1 className="text-2xl font-bold mb-6">
                    Modifier le motocycliste: {motocycliste.nom} {motocycliste.prenom}
                </h1>

                <div className=" p-6 rounded-lg shadow">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                                <Label htmlFor="postnom">Postnom</Label>
                                <Input
                                    id="postnom"
                                    value={data.postnom}
                                    onChange={(e) => setData('postnom', e.target.value)}
                                    required
                                />
                                {errors.postnom && <p className="text-sm text-red-500">{errors.postnom}</p>}
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
                                <Label htmlFor="numero_plaque">Numéro de plaque</Label>
                                <Input
                                    id="numero_plaque"
                                    value={data.numero_plaque}
                                    onChange={(e) => setData('numero_plaque', e.target.value)}
                                    required
                                />
                                {errors.numero_plaque && <p className="text-sm text-red-500">{errors.numero_plaque}</p>}
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
                                <Label htmlFor="password">Nouveau mot de passe (laisser vide pour ne pas changer)</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                            </div>

                            <div>
                                <Label htmlFor="photo_permis">Photo du permis (laisser vide pour ne pas changer)</Label>
                                <Input
                                    id="photo_permis"
                                    type="file"
                                    onChange={(e) => handleFileChange('photo_permis', e)}
                                />
                                {errors.photo_permis && <p className="text-sm text-red-500">{errors.photo_permis}</p>}
                            </div>

                            <div>
                                <Label htmlFor="photo_moto">Photo de la moto (laisser vide pour ne pas changer)</Label>
                                <Input
                                    id="photo_moto"
                                    type="file"
                                    onChange={(e) => handleFileChange('photo_moto', e)}
                                />
                                {errors.photo_moto && <p className="text-sm text-red-500">{errors.photo_moto}</p>}
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
                                <Link href={route('motocyclistes.index')}>Annuler</Link>
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