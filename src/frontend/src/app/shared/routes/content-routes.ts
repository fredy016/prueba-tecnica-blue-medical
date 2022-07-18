import {Routes} from '@angular/router';

export const content: Routes = [
    {
        path: 'auto_oficial',
        loadChildren: () => import('../../components/auto-oficial/auto-oficial.module').then(m => m.AutoOficialModule),
        data: {
            breadcrumb: 'Autos oficiales',
            link: '/auto_oficial'
        }
    },
    {
        path: 'auto_residente',
        loadChildren: () => import('../../components/auto-residente/auto-residente.module').then(m => m.AutoResidenteModule),
        data: {
            breadcrumb: 'Autos residentes',
            link: '/auto_residente'
        }
    }
];
