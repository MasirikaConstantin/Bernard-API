import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BreadcrumbItem } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Plus, Minus } from 'lucide-react';
import { Pagination,PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface Motocycliste {
    id: number;
    nom: string;
    prenom: string;
}

interface Solde {
    id: number;
    montant: number;
    type_solde: string;
    numero_compte: string;
    motocycliste: Motocycliste;
    created_at: string;
}

interface Props {
    soldes: {
        data: Solde[];
        prev_page_url: string | null;
        next_page_url: string | null;
        links: any[];
        last_page: number;
    };
}

const typeSoldeColors: Record<string, string> = {
    'Airtel Money': 'bg-purple-500',
    'Orange Money': 'bg-orange-500',
    'Vodacom Cash': 'bg-blue-500',
    'Espèces': 'bg-green-500',
};

export default function SoldeIndex({ soldes }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Soldes',
            href: '/soldes',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Liste des soldes" />

            <div className="container py-6 px-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Liste des soldes</h1>
                    <Button asChild>
                        <Link href={route('soldes.create')}>Nouveau solde</Link>
                    </Button>
                </div>

                <div className=" rounded-lg shadow">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Motocycliste</TableHead>
                                <TableHead>Type de solde</TableHead>
                                <TableHead>Numéro de compte</TableHead>
                                <TableHead>Montant</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {soldes.data.map((solde) => (
                                <TableRow key={solde.id}>
                                    <TableCell>
                                        {solde.motocycliste.nom} {solde.motocycliste.prenom}
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={typeSoldeColors[solde.type_solde]}>
                                            {solde.type_solde}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{solde.numero_compte || '-'}</TableCell>
                                    <TableCell className="font-bold">
                                        {solde.montant.toLocaleString()} FC
                                    </TableCell>
                                    <TableCell className="space-x-2">
                                        <Button size="sm" variant="outline" asChild>
                                            <Link href={route('soldes.ajouter.view', solde.id)}>
                                                <Plus className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button size="sm" variant="outline" asChild>
                                            <Link href={route('soldes.retirer.view', solde.id)}>
                                                <Minus className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                       
                                        <Button size="sm" variant="destructive" asChild>
                                            <Link
                                                href={route('soldes.destroy', solde.id)}
                                                method="delete"
                                                as="button"
                                                
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {soldes.last_page > 1 && (
                    <div className="flex items-center justify-end">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious 
                                        href={soldes.prev_page_url || '#'}
                                        onClick={(e) => {
                                            if (!soldes.prev_page_url) {
                                                e.preventDefault();
                                                return;
                                            }
                                            e.preventDefault();
                                            router.get(soldes.prev_page_url, {}, {
                                                preserveState: true,
                                                replace: true,
                                                preserveScroll: true
                                            });
                                        }}
                                        className={!soldes.prev_page_url ? 'pointer-events-none opacity-50' : ''}
                                    />
                                </PaginationItem>
                                
                                {soldes.links.slice(1, -1).map((link: any, index: any) => {
                                    if (link.label === '...') {
                                        return (
                                            <PaginationItem key={index}>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        );
                                    }
                                    return (
                                        <PaginationItem key={index}>
                                            <PaginationLink 
                                                href={link.url || '#'}
                                                onClick={(e) => {
                                                    if (!link.url) {
                                                        e.preventDefault();
                                                        return;
                                                    }
                                                    e.preventDefault();
                                                    router.get(link.url, {}, {
                                                        preserveState: true,
                                                        replace: true,
                                                        preserveScroll: true
                                                    });
                                                }}
                                                isActive={link.active}
                                            >
                                                {link.label}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                })}
                                
                                <PaginationItem>
                                    <PaginationNext 
                                        href={soldes.next_page_url || '#'}
                                        onClick={(e) => {
                                            if (!soldes.next_page_url) {
                                                e.preventDefault();
                                                return;
                                            }
                                            e.preventDefault();
                                            router.get(soldes.next_page_url, {}, {
                                                preserveState: true,
                                                replace: true,
                                                preserveScroll: true
                                            });
                                        }}
                                        className={!soldes.next_page_url ? 'pointer-events-none opacity-50' : ''}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}                </div>
            </div>
        </AppLayout>
    );
}