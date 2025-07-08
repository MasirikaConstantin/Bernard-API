import { PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { Pagination } from '@/components/Pagination';
import { type BreadcrumbItem } from '@/types';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export default function Index({ controlleurs, filters }: PageProps<{ controlleurs: any, filters: { search: string } }>) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('controlleurs.index'), { search }, { preserveState: true });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Utilisateurs',
            href: '/users',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Utilisateurs" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                <Card className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                <CardHeader className="flex items-center justify-between mb-6">
                    <CardTitle className="text-2xl font-bold">Gestion des utilisateurs</CardTitle>
                    <Link href={route('controlleurs.create')}>
                        <Button>Nouvel utilisateur</Button>
                    </Link>
                </CardHeader>

                <div className="rounded-md shadow overflow-hidden">
                    <div className="p-6">
                        <form onSubmit={handleSearch} className="flex items-center space-x-4">
                            <Input
                                placeholder="Rechercher..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="max-w-md"
                            />
                            <Button type="submit">Filtrer</Button>
                            {search && (
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSearch('');
                                        router.get(route('controlleurs.index'), { search: '' }, { preserveState: true });
                                    }}
                                >
                                    Réinitialiser
                                </Button>
                            )}
                        </form>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead>Créé le</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {controlleurs.data.map((controlleur: any) => (
                                <TableRow key={controlleur.id}>
                                    <TableCell>{controlleur.name}</TableCell>
                                    <TableCell>{controlleur.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={controlleur.is_active ? 'default' : 'destructive'}>
                                            {controlleur.is_active ? 'Actif' : 'Inactif'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{controlleur.created_at}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link href={route('controlleurs.edit',  controlleur.ref )}>Modifier</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={route('controlleurs.destroy', controlleur.ref )}
                                                        method="delete"
                                                        as="button"
                                                        className="w-full text-left"
                                                        onBefore={() => confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')}
                                                    >
                                                        Supprimer
                                                    </Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <Pagination links={controlleurs.links} className="p-6" />
                </div>
            </Card>
                </div>
            
            </div>
        </AppLayout>
    );
}