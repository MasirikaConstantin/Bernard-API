import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({ links, className = '' }: { links: any[], className?: string }) {
    if (links.length <= 3) return null;

    return (
        <div className={`flex items-center justify-between ${className}`}>
            <div className="flex-1 flex justify-between sm:hidden">
                {links[0].url ? (
                    <Link
                        href={links[0].url}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                        Précédent
                    </Link>
                ) : (
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-300 bg-white cursor-not-allowed">
                        Précédent
                    </span>
                )}

                {links[links.length - 1].url ? (
                    <Link
                        href={links[links.length - 1].url}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                        Suivant
                    </Link>
                ) : (
                    <span className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-300 bg-white cursor-not-allowed">
                        Suivant
                    </span>
                )}
            </div>

            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Affichage de la page <span className="font-medium">{links[0].label}</span> sur{' '}
                        <span className="font-medium">{links[links.length - 1].label}</span>
                    </p>
                </div>
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                    link.active
                                        ? 'z-10 bg-primary border-primary text-white'
                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                } ${index === 0 ? 'rounded-l-md' : ''} ${
                                    index === links.length - 1 ? 'rounded-r-md' : ''
                                }`}
                                preserveScroll
                            >
                                {index === 0 && <ChevronLeft className="h-4 w-4" />}
                                {index === links.length - 1 && <ChevronRight className="h-4 w-4" />}
                                {index !== 0 && index !== links.length - 1 && link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}