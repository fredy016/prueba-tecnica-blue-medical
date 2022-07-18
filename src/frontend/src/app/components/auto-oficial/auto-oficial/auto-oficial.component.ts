import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import Swal from 'sweetalert2';

import {DropDownActionComponent} from '../../../shared/drop-down-action/drop-down-action.component';

import {Util} from '../../../shared/classes/util';
import {DataSourceService} from '../../../shared/service/data-source.service';

@Component({
    selector: 'app-cliente',
    templateUrl: './auto-oficial.component.html',
    styleUrls: ['./auto-oficial.component.scss']
})
export class ClienteComponent implements OnInit {
    public clientesList = [];

    private tipoGrupo = '';

    constructor(private dataSource: DataSourceService, private router: Router) {
        console.log('Ruta actual = ' + router.url);
        this.tipoGrupo = (router.url === '/producto-grupo' ? 'producto' : 'materia');
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
                renderComponent: DropDownActionComponent,
                onComponentInitFunction: (instance) => {
                    instance.actionEmitter.subscribe(data => {
                        this.onCustom(data);
                    });
                },
                valuePrepareFunction: (value, row, cell) => {
                    return [
                        {
                            name: 'editar',
                            title: 'Editar',
                        }
                    ];
                },
                filter: false
            },
            nombre: {
                title: 'Nombre'
            },
            rtn: {
                title: 'RTN',
            },
            nombre_representante: {
                title: 'Representante',
            },
            telefono: {
                title: 'Telefono',
            },
            correo: {
                title: 'Correo',
            }
        },
        width: '20px',
        noDataMessage: 'No hay información'
    };

    ngOnInit() {
    }

    obtener() {
        // Util.mostrarMensajeEspera('Espere', 'Realizando solicitud');
        this.dataSource.solicitudGET('auto-oficial').subscribe(data => {
            if (data.status) {
                this.clientesList = data.data;
            } else {
                Util.mostrarMensajeResponse('Error solicitando información', data.message, false);
            }
        });
    }

        onCustom(event) {
            switch (event.action) {
                case 'editar':
                    this.edit(event.data.cliente_id);
                    break;
            }
        }

    edit(id) {
        this.router.navigate(['/auto-oficial/' + id]);
    }

    delete(id) {
        Util.mostrarConfirmacion('Eliminación grupo de materia prima', 'Desea eliminar el grupo de materia prima seleccionada?').then((result) => {
            if (result.value) {
                Util.mostrarMensajeEspera('Espere...', 'Realizando solicitud');
                this.dataSource.solicitudDELETE('grupo/' + id).subscribe(dataGuardado => {
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
