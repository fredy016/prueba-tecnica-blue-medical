import {Util} from './util';
import {Optional} from '@angular/core';

export class User {
    public usuarioId = '';
    public rolId = '';
    public nombre = '';
    public correo = '';

    static fromJSON(data: any): User {
        return new User(data);
    }

    public toJson() {
        return {
            UsuarioID: this.usuarioId,
            Nombre: this.nombre,
            RolID: this.rolId,
            Correo: this.correo,
        };
    }
    public toJsonApiFormat() {
        return {
            usuario_id: this.usuarioId,
            nombre: this.nombre,
            rol_id: this.rolId,
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

        this.usuarioId = data[Util.getKey('usuario_id')] == null ? null : data[Util.getKey('usuario_id')];
        this.rolId = data[Util.getKey('rol_id')] == null ? null : data[Util.getKey('rol_id')];
        this.nombre = data[Util.getKey('nombre')] == null ? null : data[Util.getKey('nombre')];
        this.correo = data[Util.getKey('correo')] == null ? null : data[Util.getKey('correo')];
    }


}
