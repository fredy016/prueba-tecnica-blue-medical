import {Util} from './util';
import {Optional} from '@angular/core';

export class Cliente {
    public nombre = null;
    public rtn = null;
    public nombreRepresentante = null;
    public telefono = null;
    public correo = null;

    static fromJson(data: any): Cliente {
        return new Cliente(data);
    }

    static fromArray(data: any): Cliente[] {

        if (data == null) {
            return null;
        }

        const datos: Cliente[] = [];
        data.forEach(value => {
            datos.push(Cliente.fromJson(value));
        });

        return datos;
    }

    public toJson() {
        return {
            nombre: this.nombre,
            rtn: this.rtn,
            nombre_representante: this.nombreRepresentante,
            telefono: this.telefono,
            correo: this.correo,
        };
    }

    constructor(@Optional() data?: any) {
        if (typeof(data) === 'undefined') {
            return;
        }
        if (data === null) {
            return;
        }

        this.nombre = data[Util.getKey('nombre')] == null ? null : data[Util.getKey('nombre')];
        this.rtn = data[Util.getKey('rtn')] == null ? null : data[Util.getKey('rtn')];
        this.nombreRepresentante = data[Util.getKey('nombre_representante')] == null ? null : data[Util.getKey('nombre_representante')];
        this.telefono = data[Util.getKey('telefono')] == null ? null : data[Util.getKey('telefono')];
        this.correo = data[Util.getKey('correo')] == null ? null : data[Util.getKey('correo')];
    }
}
