import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import Swal from 'sweetalert2';

import {Util} from '../../../shared/classes/util';
import {DataSourceService} from '../../../shared/service/data-source.service';
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-informe-cobro-residentes',
    templateUrl: './informe-cobro-residentes.component.html',
    styleUrls: ['./informe-cobro-residentes.component.scss']
})
export class InformeCobroResidentesComponent implements OnInit {
    public form: FormGroup;

    constructor(private formBuilder: FormBuilder, private dataSource: DataSourceService) {
        this.createform();
    }

    createform() {
        this.form = this.formBuilder.group({
            nombre_archivo: [null, [Validators.required]]
        });
    }

    ngOnInit() {
    }

    generar() {
        // TODO Función para guardar los datos del registro entrada
        const datosPost = this.form.value;
        window.open(environment.urlReporte + datosPost.nombre_archivo, '_blank');
    }
}
