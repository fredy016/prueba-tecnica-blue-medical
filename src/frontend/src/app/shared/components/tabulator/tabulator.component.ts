import {AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import Tabulator from 'tabulator-tables' ;

@Component({
    selector: 'app-tabulator',
    templateUrl: './tabulator.component.html',
    styleUrls: ['./tabulator.component.scss']
})
export class TabulatorComponent implements OnChanges, AfterViewInit {

    @Input() tableData: any[] = [];
    @Input() columnNames: any[] = [];
    @Input() height = '311px';

    @ViewChild('my_tabular_table') table: ElementRef;

    tab = document.createElement('div');

    constructor() {
        console.log('Creando tabla');
    }

    ngAfterViewInit() {
        this.drawTable();
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log('Creando tabla');


        this.drawTable();
    }

    private drawTable(): void {
        const tableData = [
            {id: 1, name: 'Billy Bob', gender: 'male'}
        ];

        const a = new Tabulator(this.tab, {
            reactiveData: true,
            layout: 'fitData',
            height: this.height,
            data: tableData,
            columns: [
                {title: 'id', field: 'id', width: '500', frozen: true},
                {title: 'Name', field: 'name', width: '500', frozen: false, editor: 'input'},
                {
                    title: 'Gender',
                    field: 'gender',
                    editor: 'select',
                    width: '500',
                    editorParams: {
                        values: {male: 'Male', female: 'Female', unknown: 'Unknown'}
                    }
                },

            ]
        });
        document.getElementById('my_tabular_table').appendChild(this.tab);
    }

}
