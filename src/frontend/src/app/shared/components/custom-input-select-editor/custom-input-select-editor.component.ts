import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DefaultEditor} from 'ng2-smart-table';
import {Util} from '../../classes/util';
import {DataSourceService} from '../../service/data-source.service';

@Component({
    selector: 'app-custom-input-select-editor',
    templateUrl: './custom-input-select-editor.component.html',
    styleUrls: ['./custom-input-select-editor.component.scss']
})
export class CustomInputSelectEditorComponent extends DefaultEditor implements OnInit {

    @ViewChild('name') name: ElementRef;

    items: any[] = [{value: 'Carro', title: 'Este es un embalaje'}];

    constructor(private dataSource: DataSourceService) {
        super();
    }


    public setItems(items: any[]) {
        this.items = items;
    }

    convertirEmbalaje(datos: any[]) {
        const motorista = [];

        datos.forEach(value => {
            motorista.push({value: value[Util.getKey('PilotoID')], title: value[Util.getKey('Nombre')]});
        });

        return motorista;
    }

    ngOnInit() {
        // TODO obtener tipos de embalaje
        this.dataSource.solicitudGET('pilotos/get').subscribe(datos => {
            if (datos.status) {
                this.items = this.convertirEmbalaje(datos.data);
            } else {
                this.items = [];
            }

            // const selectComponent = CustomInputSelectEditorComponent(this.tipoEmbalaje);
            // this.settings.columns.TipoEmbalajeID.editor.component = selectComponent;
        });
    }

}
