import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Head, Link } from '@inertiajs/react';
import { Motocycliste } from '@/types/';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

export default function Index({ motocyclistes }: { motocyclistes: Motocycliste[] }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Accueil', href: route('dashboard') },
        { title: 'Motocyclistes', href: route('motocyclistes.index') },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Motocyclistes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className='flex justify-between items-center'>
                            <CardTitle>Liste des motocyclistes</CardTitle>
                            <Link href={route('motocyclistes.create')}>
                                <Button>Nouveau motocycliste</Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nom complet</TableHead>
                                        <TableHead>Téléphone</TableHead>
                                        <TableHead>Plaque</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Statut</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {motocyclistes.map((motocycliste) => (
                                        <TableRow key={motocycliste.id}>
                                            <TableCell>{motocycliste.nom} {motocycliste.postnom} {motocycliste.prenom}</TableCell>
                                            <TableCell>{motocycliste.telephone}</TableCell>
                                            <TableCell>{motocycliste.numero_plaque}</TableCell>
                                            <TableCell>{motocycliste.email}</TableCell>
                                            <TableCell>
                                                <Badge variant={motocycliste.is_active ? 'default' : 'destructive'}>
                                                    {motocycliste.is_active ? 'Actif' : 'Inactif'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="space-x-2">
                                                <Link href={route('motocyclistes.show', motocycliste.id)}>
                                                    <Button variant="outline" size="sm">
                                                        Voir
                                                    </Button>
                                                </Link>
                                                <Link href={route('motocyclistes.edit', motocycliste.id)}>
                                                    <Button variant="outline" size="sm">
                                                        Modifier
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}