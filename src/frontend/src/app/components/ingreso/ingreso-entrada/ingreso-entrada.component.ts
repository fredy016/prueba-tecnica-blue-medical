import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import Swal from 'sweetalert2';

import {Util} from '../../../shared/classes/util';
import {DataSourceService} from '../../../shared/service/data-source.service';

@Component({
  selector: 'app-ingreso-entrada',
  templateUrl: './ingreso-entrada.component.html',
  styleUrls: ['./ingreso-entrada.component.scss']
})
export class IngresoEntradaComponent implements OnInit {
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, private dataSource: DataSourceService, private router: Router) {
    this.createform();
  }

  createform() {
    this.form = this.formBuilder.group({
      placa: [null, [Validators.required]]
    });
  }

  ngOnInit() {
  }

  guardar() {
    // TODO Función para guardar los datos del nuevo usuario
    Util.mostrarConfirmacion('Guardar información', 'Desea registrar la entrada al estacionamiento?').then((result) => {
      if (result.value) {
        const datosPost = this.form.value;
        datosPost.id_tipo = 2;
        Util.mostrarMensajeEspera('Espere...', 'Realizando solicitud');

        this.dataSource.solicitudPOST(datosPost, 'registro/entrada').subscribe(dataGuardado => {
          Swal.close();
          Util.mostrarMensajeResponse((dataGuardado.status ? 'Exito!' : 'Advertencia!'), dataGuardado.message, dataGuardado.status).then((result2) => {
            if (dataGuardado.status) {
              this.form.reset();
            }
          });
        });
      }
    });
  }
}
