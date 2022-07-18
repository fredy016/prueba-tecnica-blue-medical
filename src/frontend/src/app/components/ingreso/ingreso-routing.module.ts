import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IngresoEntradaComponent} from './ingreso-entrada/ingreso-entrada.component';

const routes: Routes = [
    {
        path: 'entrada',
        children: [
            {
                path: '',
                component: IngresoEntradaComponent,
                data: {
                    title: 'Registrar Entrada',
                    breadcrumb: 'Entrada',
                    expectedRole: '/registro/entrada'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IngresoRoutingModule {
}
