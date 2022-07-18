import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import Swal from 'sweetalert2';

import {Util} from '../../../shared/classes/util';
import {DataSourceService} from '../../../shared/service/data-source.service';

@Component({
  selector: 'app-comenzar-mes',
  templateUrl: './comenzar-mes.component.html',
  styleUrls: ['./comenzar-mes.component.scss']
})
export class ComenzarMesComponent implements OnInit {
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
    // TODO Función para comenzar un nuevo mes
    Util.mostrarConfirmacion('Iniciar nuevo mes', 'Desea iniciar un nuevo mes?').then((result) => {
      if (result.value) {
        const datosPost = this.form.value;
        Util.mostrarMensajeEspera('Espere...', 'Realizando solicitud');

        this.dataSource.solicitudPOST(null, 'comienza_mes').subscribe(dataGuardado => {
          Swal.close();
          Util.mostrarMensajeResponse((dataGuardado.status ? 'Exito!' : 'Advertencia!'), dataGuardado.message, dataGuardado.status);
        });
      }
    });
  }
}
