import { PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import AppLayout from '@/layouts/app-layout';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        is_active: true,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route('users.store'));
    };

    return (
        <AppLayout>
            <Head title="Créer un utilisateur" />
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Créer un nouvel utilisateur</CardTitle>
                        <CardDescription>Remplissez le formulaire pour ajouter un nouvel utilisateur</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Nom</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="password">Mot de passe</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="password_confirmation">Confirmation du mot de passe</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) => setData('is_active', checked)}
                                    />
                                    <Label htmlFor="is_active">Utilisateur actif</Label>
                                </div>
                            </div>

                            <div className="flex items-center justify-end space-x-4">
                                <Button variant="outline" asChild>
                                    <Link href={route('users.index')}>Annuler</Link>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    Créer l'utilisateur
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}