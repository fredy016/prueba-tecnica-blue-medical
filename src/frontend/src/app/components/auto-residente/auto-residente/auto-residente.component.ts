import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import Swal from 'sweetalert2';

import {DropDownActionComponent} from '../../../shared/drop-down-action/drop-down-action.component';

import {Util} from '../../../shared/classes/util';
import {DataSourceService} from '../../../shared/service/data-source.service';

@Component({
  selector: 'app-auto-residente',
  templateUrl: './auto-residente.component.html',
  styleUrls: ['./auto-residente.component.scss']
})
export class AutoResidenteComponent implements OnInit {
  public dataAutos = [];

  constructor(private dataSource: DataSourceService, private router: Router) {
    this.obtener();
  }

  public settings = {
    actions: {
      position: 'left',
      columnTitle: 'Accion',
      width: '50px',
      hideHeader: true,
      hideSubHeader: true,
      add: false,
      edit: false,
      delete: false,
      custom: []
    },
    columns: {
      Actions: {
        title: 'Acción',
        type: 'custom',
        width: '100px',
        renderComponent: DropDownActionComponent,
        onComponentInitFunction: (instance) => {
          instance.actionEmitter.subscribe(data => {
            this.onCustom(data);
          });
        },
        valuePrepareFunction: (value, row, cell) => {
          return [
            {
              name: 'eliminar',
              title: 'Eliminar',
            }
          ];
        },
        filter: false
      },
      placa: {
        title: 'Placa'
      }
    },
    width: '20px',
    noDataMessage: 'No hay información'
  };

  ngOnInit() {
  }

  obtener() {
    // Util.mostrarMensajeEspera('Espere', 'Realizando solicitud');
    this.dataSource.solicitudGET('autos/tipo/2').subscribe(data => {
      if (data.status) {
        this.dataAutos = data.data;
      } else {
        Util.mostrarMensajeResponse('Error solicitando información', data.message, false);
      }
    });
  }

  onCustom(event) {
    switch (event.action) {
      case 'eliminar':
        this.delete(event.data.id);
        break;
    }
  }

  delete(id) {
    Util.mostrarConfirmacion('Eliminación vehículo residente', 'Desea eliminar el vehículo residente seleccionada?').then((result) => {
      if (result.value) {
        Util.mostrarMensajeEspera('Espere...', 'Realizando solicitud');
        this.dataSource.solicitudDELETE('autos/' + id).subscribe(dataGuardado => {
          Swal.close();
          Util.mostrarMensajeResponse((dataGuardado.status ? 'Exito!' : 'Advertencia!'), dataGuardado.message, dataGuardado.status);
          if (dataGuardado.status) {
            this.obtener();
          }
        }); // Fin
      }
    });
  }
}
