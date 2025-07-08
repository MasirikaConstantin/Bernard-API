import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface Agent {
    id: number;
    matricule: string;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    zone_affectation: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Motocycliste {
    id: number;
    nom: string;
    postnom: string;
    prenom: string;
    email: string;
    telephone: string;
    numero_plaque: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface PageProps<T extends Record<string, unknown> = {}> extends Page<T> {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            permissions: {
                id: number;
                name: string;
                action: string;
                module: string;
            }[];
            profile?: {
                phone?: string;
                address?: string;
                hopital_id?: number;
                hopital?: {
                    id: number;
                    nom: string;
                };
            };
            role?: string;
        };
        
    };
    controlleurs: {
        data: {
            id: number;
            ref: string;
            name: string;
            email: string;
            is_active: boolean;
            created_at: string;
            updated_at: string;
        }[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
    filters: { search: string };
    user : {
        id: number;
        name: string;
        email: string;
        avatar?: string;
        email_verified_at: string | null;
        created_at: string;
        updated_at: string;
        [key: string]: unknown; // This allows for additional properties...
    }
 
}