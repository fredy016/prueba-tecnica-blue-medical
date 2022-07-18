import {Routes} from '@angular/router';

export const content: Routes = [
    {
        path: 'auto_oficial',
        loadChildren: () => import('../../components/auto-oficial/auto-oficial.module').then(m => m.ClienteModule),
        data: {
            breadcrumb: 'Clientes',
            link: '/auto-oficial'
        }
    },
    {
        path: 'auto_residente',
        loadChildren: () => import('../../components/auto-oficial/auto-oficial.module').then(m => m.ClienteModule),
        data: {
            breadcrumb: 'Clientes',
            link: '/auto-oficial'
        }
    }
];
