import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AutoOficialComponent} from './auto-oficial/auto-oficial.component';
import {AutoOficialCrearComponent} from './auto-oficial-crear/auto-oficial-crear.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: AutoOficialComponent,
                data: {
                    title: 'Auto oficial',
                    breadcrumb: 'lista',
                    expectedRole: '/auto_oficial'
                }
            },
            {
                path: 'crear',
                component: AutoOficialCrearComponent,
                data: {
                    title: 'Alta auto oficial',
                    breadcrumb: 'crear',
                    expectedRole: '/auto_oficial-crear'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AutoOficialRoutingModule {
}
