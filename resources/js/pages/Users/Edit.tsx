import { PageProps } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import { FormEvent } from 'react';

export default function Edit({ user }: PageProps<{ user: any }>) {
    const { data, setData, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
        is_active: user.is_active,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        router.put(route('controlleurs.update', user.ref), data);
    };

    return (
        <AppLayout>
            <Head title="Modifier l'utilisateur" />
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Modifier l'utilisateur</CardTitle>
                        <CardDescription>Modifiez les informations de l'utilisateur</CardDescription>
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
                                    <Label htmlFor="password">Nouveau mot de passe (laisser vide pour ne pas changer)</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="password_confirmation">Confirmation du nouveau mot de passe</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) => setData('is_active', Boolean(checked))}
                                    />
                                    <Label htmlFor="is_active">Utilisateur actif</Label>
                                </div>
                            </div>

                            <div className="flex items-center justify-end space-x-4">
                                <Button variant="outline" asChild>
                                    <Link href={route('controlleurs.index')}>Annuler</Link>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    Enregistrer les modifications
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}