import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';

import {AutoOficialRoutingModule} from './auto-oficial-routing.module';
import { AutoOficialComponent } from './auto-oficial/auto-oficial.component';
import { AutoOficialCrearComponent } from './auto-oficial-crear/auto-oficial-crear.component';


@NgModule({
    declarations: [AutoOficialComponent, AutoOficialCrearComponent],
    imports: [
        CommonModule,
        NgbModule,
        Ng2SmartTableModule,
        ReactiveFormsModule,
        NgSelectModule,
        CommonModule,
        AutoOficialRoutingModule
    ],
    providers: []
})
export class AutoOficialModule {
}
