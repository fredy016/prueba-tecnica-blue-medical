import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AutoOficialComponent} from './auto-oficial/auto-oficial.component';

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
export class AutoOficialRoutingModule {
}
