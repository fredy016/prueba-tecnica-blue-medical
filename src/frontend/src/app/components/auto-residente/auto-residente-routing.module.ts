import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AutoResidenteComponent} from './auto-residente/auto-residente.component';

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
