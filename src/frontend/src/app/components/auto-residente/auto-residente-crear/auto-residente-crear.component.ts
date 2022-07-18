import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import Swal from 'sweetalert2';

import {Util} from '../../../shared/classes/util';
import {DataSourceService} from '../../../shared/service/data-source.service';

@Component({
  selector: 'app-auto-residente-crear',
  templateUrl: './auto-residente-crear.component.html',
  styleUrls: ['./auto-residente-crear.component.scss']
})
export class AutoResidenteCrearComponent implements OnInit {
  public formMateria: FormGroup;

  constructor(private formBuilder: FormBuilder, private dataSource: DataSourceService, private router: Router) {
    this.createFormMateria();
  }

  createFormMateria() {
    this.formMateria = this.formBuilder.group({
      placa: [null, [Validators.required]]
    });
  }

  ngOnInit() {
  }

  guardar() {
    // TODO Función para guardar los datos del nuevo residente
    Util.mostrarConfirmacion('Guardar información', 'Desea guardar la información?').then((result) => {
      if (result.value) {
        const datosPost = this.formMateria.value;
        datosPost.id_tipo = 2;
        Util.mostrarMensajeEspera('Espere...', 'Realizando solicitud');

        this.dataSource.solicitudPOST(datosPost, 'autos').subscribe(dataGuardado => {
          Swal.close();
          Util.mostrarMensajeResponse((dataGuardado.status ? 'Exito!' : 'Advertencia!'), dataGuardado.message, dataGuardado.status).then((result2) => {
            if (dataGuardado.status) {
              this.router.navigate(['/auto_residente']);
            }
          });
        });
      }
    });
  }
}
