import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ClienteComponent} from './auto-oficial/auto-oficial.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: ClienteComponent,
                data: {
                    title: 'Auto oficial',
                    breadcrumb: 'lista',
                    expectedRole: '/auto-oficial'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClienteRoutingModule {
}
