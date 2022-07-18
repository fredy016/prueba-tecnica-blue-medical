import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ComenzarMesComponent} from './comenzar-mes/comenzar-mes.component';
import {InformeCobroResidentesComponent} from './informe-cobro-residentes/informe-cobro-residentes.component';

const routes: Routes = [
    {
        path: 'comenzar-mes',
        component: ComenzarMesComponent,
        data: {
            title: 'Comenzar mes',
            breadcrumb: 'Comienzo',
            expectedRole: '/comenzar-mes'
        }
    },
    {
        path: 'generar-informe',
        component: InformeCobroResidentesComponent,
        data: {
            title: 'Generar Informe',
            breadcrumb: 'Informe',
            expectedRole: '/generar-informe'
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComenzarMesRoutingModule {
}
