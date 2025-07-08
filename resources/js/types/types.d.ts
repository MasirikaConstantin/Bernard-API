import { Page, PageProps } from '@inertiajs/core';
import { AxiosInstance } from 'axios';
import ziggyRoute, { Config as ZiggyConfig } from 'ziggy-js';
import { User } from './types';

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    var route: typeof ziggyRoute;
    var Ziggy: ZiggyConfig;
}

declare module '@inertiajs/core' {
    interface PageProps {
        auth: {
            user: User;
        };
    }
}

export { PageProps };
