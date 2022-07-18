import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AutoResidenteComponent} from './auto-residente/auto-residente.component';
import {AutoResidenteCrearComponent} from './auto-residente-crear/auto-residente-crear.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: AutoResidenteComponent,
                data: {
                    title: 'Auto residente',
                    breadcrumb: 'lista',
                    expectedRole: '/auto_residente'
                }
            },
            {
                path: 'crear',
                component: AutoResidenteCrearComponent,
                data: {
                    title: 'Alta auto residente',
                    breadcrumb: 'crear',
                    expectedRole: '/auto_residente/crear'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AutoResidenteRoutingModule {
}
