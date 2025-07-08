import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';
import { Agent } from '@/types';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';

interface Props {
    agents: Agent[];
}

export default function AgentIndex({ agents }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Agents',
            href: '/agents',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Liste des agents" />

            <div className="container py-6 px-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Liste des agents</h1>
                    <Link href={route('agents.create')}>
                        <Button>Nouvel agent</Button>
                    </Link>
                </div>

                <div className="rounded-lg shadow">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Matricule</TableHead>
                                <TableHead>Nom</TableHead>
                                <TableHead>Prénom</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Téléphone</TableHead>
                                <TableHead>Zone</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {agents.map((agent) => (
                                <TableRow key={agent.id}>
                                    <TableCell>{agent.matricule}</TableCell>
                                    <TableCell>{agent.nom}</TableCell>
                                    <TableCell>{agent.prenom}</TableCell>
                                    <TableCell>{agent.email}</TableCell>
                                    <TableCell>{agent.telephone}</TableCell>
                                    <TableCell>{agent.zone_affectation || '-'}</TableCell>
                                    <TableCell>
                                        <Badge variant={agent.is_active ? 'default' : 'destructive'}>
                                            {agent.is_active ? 'Actif' : 'Inactif'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="space-x-2">
                                        <Link href={route('agents.edit', agent.id)}>
                                            <Button variant="outline" size="sm">
                                                Modifier
                                            </Button>
                                        </Link>
                                        <Link
                                            href={route('agents.destroy', agent.id)}
                                            method="delete"
                                            as="button"
                                            onBefore={() => confirm('Êtes-vous sûr de vouloir supprimer cet agent ?')}
                                        >
                                            <Button variant="destructive" size="sm">
                                                Supprimer
                                            </Button>
                                        </Link>
                                        <Link href={route('agents.show', agent.id)}>
                                            <Button variant="outline" size="sm">
                                                Voir
                                            </Button>
                                        </Link>
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