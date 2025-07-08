import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Agent } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

export default function AgentShow({ agent }: { agent: Agent }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Agents',
            href: '/agents',
        },
        {
            title: `Détails de ${agent.nom} ${agent.prenom}`,
            href: `/agents/${agent.id}`,
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Détails de ${agent.nom} ${agent.prenom}`} />

            <div className="container py-6 px-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">
                        Détails de l'agent: {agent.nom} {agent.prenom}
                    </h1>
                    <div className="space-x-2">
                        <Button variant="outline" asChild>
                            <a href={route('agents.index')}>Retour</a>
                        </Button>
                        <Button asChild>
                            <a href={route('agents.edit', agent.id)}>Modifier</a>
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Informations de l'agent</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Matricule</p>
                            <p className="font-medium">{agent.matricule}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Nom complet</p>
                            <p className="font-medium">
                                {agent.nom} {agent.prenom}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p className="font-medium">{agent.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Téléphone</p>
                            <p className="font-medium">{agent.telephone}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Zone d'affectation</p>
                            <p className="font-medium">{agent.zone_affectation || '-'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Statut</p>
                            <Badge variant={agent.is_active ? 'default' : 'destructive'}>
                                {agent.is_active ? 'Actif' : 'Inactif'}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}