import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Motocycliste {
    id: number;
    nom: string;
    prenom: string;
}

interface Agent {
    id: number;
    nom: string;
    prenom: string;
}

interface Tarif {
    id: number;
    type_taxe: string;
    periode: string;
    montant: number;
}

interface Props {
    motocyclistes: Motocycliste[];
    agents: Agent[];
    tarifs: Tarif[];
    modesPaiement: string[];
}

export default function TaxeCreate({ motocyclistes, agents, tarifs, modesPaiement }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        motocycliste_id: null as number | null,
        agent_id: null as number | null,
        tarif_id: null as number | null,
        montant: 0,
        date_paiement: new Date(),
        date_expiration: new Date(),
        statut: 'payé',
        mode_paiement: 'cash',
        reference_paiement: '',
        notes: '',
    });
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('taxes.store'));
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Taxes',
            href: '/taxes',
        },
        {
            title: 'Créer une taxe',
            href: '/taxes/create',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Créer une taxe" />

            <div className="container py-6 px-6">
                <h1 className="text-2xl font-bold mb-6">Créer une nouvelle taxe</h1>

                <div className="p-6 rounded-lg shadow">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="motocycliste_id">Motocycliste</Label>
                                <Select
                                    value={data.motocycliste_id?.toString() || ""}
                                    onValueChange={(value) => setData('motocycliste_id', value ? parseInt(value) : null)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionnez un motocycliste" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {motocyclistes.map((motocycliste) => (
                                            <SelectItem key={motocycliste.id} value={motocycliste.id.toString()}>
                                                {motocycliste.nom} {motocycliste.prenom}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.motocycliste_id && (
                                    <p className="text-sm text-red-500">{errors.motocycliste_id}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="agent_id">Agent</Label>
                                <Select
                                    value={data.agent_id?.toString() || ""}
                                    onValueChange={(value) => setData('agent_id', value === "none" ? null : parseInt(value))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionnez un agent" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectItem value="none">Aucun agent</SelectItem>                                        {agents.map((agent) => (
                                            <SelectItem key={agent.id} value={agent.id.toString()}>
                                                {agent.nom} {agent.prenom}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.agent_id && <p className="text-sm text-red-500">{errors.agent_id}</p>}
                            </div>

                            <div>
                                <Label htmlFor="tarif_id">Tarif</Label>
                                <Select
                                    value={data.tarif_id?.toString() || ""}
                                    onValueChange={(value) => {
                                        const numValue = value ? parseInt(value) : null;
                                        setData('tarif_id', numValue);
                                        const selectedTarif = tarifs.find(t => t.id === numValue);
                                        if (selectedTarif) {
                                            setData('montant', selectedTarif.montant);
                                        }
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionnez un tarif" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {tarifs.map((tarif) => (
                                            <SelectItem key={tarif.id} value={tarif.id.toString()}>
                                                {tarif.type_taxe} ({tarif.periode}) - {tarif.montant} FCFA
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.tarif_id && <p className="text-sm text-red-500">{errors.tarif_id}</p>}
                            </div>

                            <div>
                                <Label htmlFor="montant">Montant (FCFA)</Label>
                                <Input
                                    id="montant"
                                    type="number"
                                    value={data.montant}
                                    onChange={(e) => setData('montant', parseFloat(e.target.value) || 0)}
                                    required
                                />
                                {errors.montant && <p className="text-sm text-red-500">{errors.montant}</p>}
                            </div>

                            <div>
                                <Label>Date de paiement</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                'w-full justify-start text-left font-normal',
                                                !data.date_paiement && 'text-muted-foreground'
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {data.date_paiement ? (
                                                format(data.date_paiement, 'PPP')
                                            ) : (
                                                <span>Choisir une date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={new Date(data.date_paiement)}
                                            onSelect={(date) => date && setData('date_paiement', date)}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                {errors.date_paiement && (
                                    <p className="text-sm text-red-500">{errors.date_paiement}</p>
                                )}
                            </div>

                            <div>
                                <Label>Date d'expiration</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                'w-full justify-start text-left font-normal',
                                                !data.date_expiration && 'text-muted-foreground'
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {data.date_expiration ? (
                                                format(data.date_expiration, 'PPP')
                                            ) : (
                                                <span>Choisir une date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={new Date(data.date_expiration)}
                                            onSelect={(date) => date && setData('date_expiration', date)}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                {errors.date_expiration && (
                                    <p className="text-sm text-red-500">{errors.date_expiration}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="statut">Statut</Label>
                                <Select
                                    value={data.statut}
                                    onValueChange={(value) => setData('statut', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionnez un statut" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="payé">Payé</SelectItem>
                                        <SelectItem value="impayé">Impayé</SelectItem>
                                        <SelectItem value="en retard">En retard</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.statut && <p className="text-sm text-red-500">{errors.statut}</p>}
                            </div>

                            <div>
                                <Label htmlFor="mode_paiement">Mode de paiement</Label>
                                <Select
                                    value={data.mode_paiement}
                                    onValueChange={(value) => setData('mode_paiement', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionnez un mode de paiement" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {modesPaiement.map((mode) => (
                                            <SelectItem key={mode} value={mode}>
                                                {mode}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.mode_paiement && (
                                    <p className="text-sm text-red-500">{errors.mode_paiement}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="reference_paiement">Référence de paiement</Label>
                                <Input
                                    id="reference_paiement"
                                    value={data.reference_paiement}
                                    onChange={(e) => setData('reference_paiement', e.target.value)}
                                />
                                {errors.reference_paiement && (
                                    <p className="text-sm text-red-500">{errors.reference_paiement}</p>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                    id="notes"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    rows={3}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button type="button" variant="outline" asChild>
                                <a href={route('taxes.index')}>Annuler</a>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Enregistrement...' : 'Enregistrer'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}