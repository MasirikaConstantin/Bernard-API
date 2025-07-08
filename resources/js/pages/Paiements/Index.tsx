import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BreadcrumbItem } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2 } from 'lucide-react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface Paiement {
    id: number;
    montant: number;
    mode_paiement: string;
    reference: string;
    statut: string;
    taxe: {
        id: number;
        nom: string;
    };
    created_at: string;
}

interface Props {
    paiements: {
        data: Paiement[];
        links: any[];
    };
}

const statusColors: Record<string, string> = {
    'succès': 'bg-green-500',
    'échoué': 'bg-red-500',
    'en attente': 'bg-yellow-500',
};

export default function PaiementIndex({ paiements }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Paiements',
            href: '/paiements',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Liste des paiements" />

            <div className="container py-6 px-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Liste des paiements</h1>
                    <Button asChild>
                        <Link href={route('paiements.create')}>Nouveau paiement</Link>
                    </Button>
                </div>

                <div className=" rounded-lg shadow">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Référence</TableHead>
                                <TableHead>Taxe</TableHead>
                                <TableHead>Montant</TableHead>
                                <TableHead>Mode de paiement</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paiements.data.map((paiement) => (
                                <TableRow key={paiement.id}>
                                    <TableCell>{paiement.reference}</TableCell>
                                    <TableCell>{paiement.taxe.nom}</TableCell>
                                    <TableCell>{paiement.montant.toLocaleString()} FCFA</TableCell>
                                    <TableCell>{paiement.mode_paiement}</TableCell>
                                    <TableCell>
                                        <Badge className={statusColors[paiement.statut]}>
                                            {paiement.statut}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{new Date(paiement.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell className="space-x-2">
                                        <Button size="sm" variant="outline" asChild>
                                            <Link href={route('paiements.edit', paiement.id)}>
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button size="sm" variant="destructive" asChild>
                                            <Link
                                                href={route('paiements.destroy', paiement.id)}
                                                method="delete"
                                                as="button"
                                                confirm="Êtes-vous sûr de vouloir supprimer ce paiement ?"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {paiements.last_page > 1 && (
                    <div className="flex items-center justify-end">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious 
                                        href={paiements.prev_page_url || '#'}
                                        onClick={(e) => {
                                            if (!paiements.prev_page_url) {
                                                e.preventDefault();
                                                return;
                                            }
                                            e.preventDefault();
                                            router.get(paiements.prev_page_url, {}, {
                                                preserveState: true,
                                                replace: true,
                                                preserveScroll: true
                                            });
                                        }}
                                        className={!paiements.prev_page_url ? 'pointer-events-none opacity-50' : ''}
                                    />
                                </PaginationItem>
                                
                                {paiements.links.slice(1, -1).map((link: any, index: any) => {
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
                                        href={paiements.next_page_url || '#'}
                                        onClick={(e) => {
                                            if (!paiements.next_page_url) {
                                                e.preventDefault();
                                                return;
                                            }
                                            e.preventDefault();
                                            router.get(paiements.next_page_url, {}, {
                                                preserveState: true,
                                                replace: true,
                                                preserveScroll: true
                                            });
                                        }}
                                        className={!paiements.next_page_url ? 'pointer-events-none opacity-50' : ''}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
                </div>
            </div>
        </AppLayout>
    );
}