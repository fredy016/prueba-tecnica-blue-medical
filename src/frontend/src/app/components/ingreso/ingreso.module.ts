import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IngresoRoutingModule} from './ingreso-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import { IngresoEntradaComponent } from './ingreso-entrada/ingreso-entrada.component';


@NgModule({
    declarations: [IngresoEntradaComponent],
    imports: [
        CommonModule,
        NgbModule,
        Ng2SmartTableModule,
        ReactiveFormsModule,
        NgSelectModule,
        IngresoRoutingModule
    ]
})
export class IngresoModule {
}
