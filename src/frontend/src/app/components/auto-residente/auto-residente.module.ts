import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AutoResidenteRoutingModule} from './auto-residente-routing.module';
import {AutoResidenteComponent} from './auto-residente/auto-residente.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import { AutoResidenteCrearComponent } from './auto-residente-crear/auto-residente-crear.component';


@NgModule({
    declarations: [AutoResidenteComponent, AutoResidenteCrearComponent],
    imports: [
        CommonModule,
        NgbModule,
        Ng2SmartTableModule,
        ReactiveFormsModule,
        NgSelectModule,
        AutoResidenteRoutingModule
    ]
})
export class AutoResidenteModule {
}
