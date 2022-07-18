import {Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-drop-down-action',
    templateUrl: './drop-down-action.component.html',
    styleUrls: ['./drop-down-action.component.scss']
})
export class DropDownActionComponent implements OnInit {

    public actionEmitter: Subject<any> = new Subject<any>();
    @Input() value;
    @Input() rowData;

    constructor() {
    }

    ngOnInit(): void {
    }

    accionPresionada(accion) {
        this.actionEmitter.next({data: this.rowData, action: accion});
    }

}
