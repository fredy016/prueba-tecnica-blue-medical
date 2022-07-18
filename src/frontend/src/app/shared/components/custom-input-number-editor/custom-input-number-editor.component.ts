import {Component, EventEmitter, OnInit} from '@angular/core';
import {Cell, DefaultEditor} from 'ng2-smart-table';

@Component({
    selector: 'app-custom-input-number-editor',
    templateUrl: './custom-input-number-editor.component.html',
    styleUrls: ['./custom-input-number-editor.component.scss']
})
export class CustomInputNumberEditorComponent extends DefaultEditor implements OnInit {

    constructor() {
        super();
    }

    ngOnInit(): void {
    }

}
