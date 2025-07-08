import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import {  Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BreadcrumbItem } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface Taxe {
    id: number;
    montant: number;
    date_paiement: string;
    date_expiration: string;
    statut: string;
    mode_paiement: string;
    reference_paiement: string;
    motocycliste: {
        id: number;
        nom: string;
        prenom: string;
    };
    tarif: {
        id: number;
        type_taxe: string;
    };
}

interface Props {
    taxes: {
        data: Taxe[];
        links: any[];
    };
}

const statusColors: Record<string, string> = {
    'payé': 'bg-green-500',
    'impayé': 'bg-red-500',
    'en retard': 'bg-yellow-500',
};

export default function TaxeIndex({ taxes }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Taxes',
            href: '/taxes',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Liste des taxes" />

            <div className="container py-6 px-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Liste des taxes</h1>
                    <Button asChild>
                        <Link href={route('taxes.create')}>Nouvelle taxe</Link>
                    </Button>
                </div>

                <div className=" rounded-lg shadow">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Motocycliste</TableHead>
                                <TableHead>Type de taxe</TableHead>
                                <TableHead>Montant</TableHead>
                                <TableHead>Paiement</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead>Date expiration</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {taxes.data.map((taxe) => (
                                <TableRow key={taxe.id}>
                                    <TableCell>
                                        {taxe.motocycliste.nom} {taxe.motocycliste.prenom}
                                    </TableCell>
                                    <TableCell>{taxe.tarif.type_taxe}</TableCell>
                                    <TableCell>{taxe.montant.toLocaleString()} FCFA</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span>{taxe.mode_paiement}</span>
                                            <span className="text-xs text-gray-500">{taxe.reference_paiement}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={statusColors[taxe.statut]}>
                                            {taxe.statut}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{new Date(taxe.date_expiration).toLocaleDateString()}</TableCell>
                                    <TableCell className="space-x-2">
                                        <Button size="sm" variant="outline" asChild>
                                            <Link href={route('taxes.edit', taxe.id)}>
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button size="sm" variant="destructive" asChild>
                                            <Link
                                                href={route('taxes.destroy', taxe.id)}
                                                method="delete"
                                                as="button"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button size="sm" variant="outline" asChild>
                                            <Link href={route('taxes.show', taxe.id)}>
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {taxes.last_page > 1 && (
                    <div className="flex items-center justify-end">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious 
                                        href={taxes.prev_page_url || '#'}
                                        onClick={(e) => {
                                            if (!taxes.prev_page_url) {
                                                e.preventDefault();
                                                return;
                                            }
                                            e.preventDefault();
                                            router.get(taxes.prev_page_url, {}, {
                                                preserveState: true,
                                                replace: true,
                                                preserveScroll: true
                                            });
                                        }}
                                        className={!taxes.prev_page_url ? 'pointer-events-none opacity-50' : ''}
                                    />
                                </PaginationItem>
                                
                                {taxes.links.slice(1, -1).map((link: any, index: any) => {
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
                                        href={taxes.next_page_url || '#'}
                                        onClick={(e) => {
                                            if (!taxes.next_page_url) {
                                                e.preventDefault();
                                                return;
                                            }
                                            e.preventDefault();
                                            router.get(taxes.next_page_url, {}, {
                                                preserveState: true,
                                                replace: true,
                                                preserveScroll: true
                                            });
                                        }}
                                        className={!taxes.next_page_url ? 'pointer-events-none opacity-50' : ''}
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