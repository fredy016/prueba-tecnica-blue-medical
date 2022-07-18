import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';

import {ClienteRoutingModule} from './auto-oficial-routing.module';
import { ClienteComponent } from './auto-oficial/auto-oficial.component';


@NgModule({
    declarations: [ClienteComponent],
    imports: [
        CommonModule,
        NgbModule,
        Ng2SmartTableModule,
        ReactiveFormsModule,
        NgSelectModule,
        CommonModule,
        ClienteRoutingModule
    ],
    providers: []
})
export class ClienteModule {
}
