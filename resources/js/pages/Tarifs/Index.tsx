import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface Tarif {
    id: number;
    type_taxe: string;
    periode: string;
    montant: string;
    is_active: boolean;
    description?: string;
}

interface Props {
    tarifs: Tarif[];
}

export default function TarifIndex({ tarifs }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Tarifs',
            href: '/tarifs',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Liste des tarifs" />

            <div className="container py-6 px-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Liste des tarifs</h1>
                    <Button asChild>
                        <Link href={route('tarifs.create')}>Créer un tarif</Link>
                    </Button>
                </div>

                <div className=" rounded-lg shadow">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Type de taxe</TableHead>
                                <TableHead>Période</TableHead>
                                <TableHead>Montant</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tarifs.map((tarif) => (
                                <TableRow key={tarif.id}>
                                    <TableCell>{tarif.type_taxe}</TableCell>
                                    <TableCell>{tarif.periode}</TableCell>
                                    <TableCell>{parseFloat(tarif.montant).toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Badge variant={tarif.is_active ? 'default' : 'secondary'}>
                                            {tarif.is_active ? 'Actif' : 'Inactif'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="space-x-2">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={route('tarifs.edit', tarif.id)}>Modifier</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}