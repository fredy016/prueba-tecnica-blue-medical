import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ComenzarMesRoutingModule} from './comenzar-mes-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import { ComenzarMesComponent } from './comenzar-mes/comenzar-mes.component';


@NgModule({
    declarations: [ComenzarMesComponent],
    imports: [
        CommonModule,
        NgbModule,
        Ng2SmartTableModule,
        ReactiveFormsModule,
        NgSelectModule,
        ComenzarMesRoutingModule
    ]
})
export class ComenzarMesModule {
}
