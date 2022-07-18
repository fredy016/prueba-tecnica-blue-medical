import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IngresoEntradaComponent} from './ingreso-entrada/ingreso-entrada.component';
import {IngresoSalidaComponent} from './ingreso-salida/ingreso-salida.component';

const routes: Routes = [
    {
        path: 'entrada',
        component: IngresoEntradaComponent,
        data: {
            title: 'Registrar Entrada',
            breadcrumb: 'Entrada',
            expectedRole: '/ingreso/entrada'
        }
    },
    {
        path: 'salida',
        component: IngresoSalidaComponent,
        data: {
            title: 'Registrar Salida',
            breadcrumb: 'Salida',
            expectedRole: '/ingreso/salida'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IngresoRoutingModule {
}
