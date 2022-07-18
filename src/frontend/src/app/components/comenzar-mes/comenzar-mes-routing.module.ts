import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ComenzarMesComponent} from './comenzar-mes/comenzar-mes.component';

const routes: Routes = [
    {
        path: '',
        component: ComenzarMesComponent,
        data: {
            title: 'Comenzar mes',
            breadcrumb: 'Comienzo',
            expectedRole: '/comenzar-mes'
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComenzarMesRoutingModule {
}
