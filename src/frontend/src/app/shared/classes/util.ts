import Swal from 'sweetalert2';
import {User} from './user';

export class Util {
    static getKey(key: string): string {
        return key;
    }

    static mostrarMensajeEspera(title: string, Msj: string) {
        Swal.fire({
            title,
            text: Msj,
            showCancelButton: false,
            showConfirmButton: false,
            timerProgressBar: true,
            allowOutsideClick: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });
    }

    static mostrarMensajeResponse(title: string, Msj: string, success: boolean = true) {
        return Swal.fire({
            title,
            text: Msj,
            confirmButtonText: 'Aceptar',
            icon: success ? 'success' : 'warning',
            showCancelButton: false,
            buttonsStyling: false,
            customClass: {confirmButton: 'btn ' + (success ? 'btn-success' : 'btn-warning')},
            focusConfirm: true,
            reverseButtons: true
        });
    }

    static delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static async mostrarMensajeResponseAsync(title: string, Msj: string, success: boolean = true) {

        await Util.delay(200);

        return Swal.fire({
            title,
            text: Msj,
            confirmButtonText: 'Aceptar',
            icon: success ? 'success' : 'warning',
            showCancelButton: false,
            buttonsStyling: false,
            customClass: {confirmButton: 'btn ' + (success ? 'btn-success' : 'btn-warning')},
            focusConfirm: true,
            reverseButtons: true
        });
    }

    static mostrarMensajeResponseHTML(title: string, Msj: string, success: boolean = true) {
        return Swal.fire({
            title: '<strong>' + title + '</strong>',
            html: Msj,
            confirmButtonText: 'Aceptar',
            icon: success ? 'success' : 'warning',
            showCancelButton: false,
            buttonsStyling: false,
            customClass: {confirmButton: 'btn ' + (success ? 'btn-success' : 'btn-warning')},
            focusConfirm: true,
            reverseButtons: true
        });
    }

    static mostrarConfirmacion(title: string, text: string) {
        return Swal.fire({
            title,
            text,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            buttonsStyling: false,
            customClass: {
                cancelButton: 'btn btn-dark mr-2',
                confirmButton: 'btn btn-primary'
            },
            reverseButtons: true
        });
    }

    static generatePasswordRand(length, type = '') {

        let characters = '';

        switch (type) {
            case 'num':
                characters = '0123456789';
                break;
            case 'alf':
                characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                break;
            case 'rand':
                break;
            default:
                characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                break;
        }
        let pass = '';
        for (let i = 0; i < length; i++) {
            if (type === 'rand') {
                pass += String.fromCharCode((Math.floor((Math.random() * 100)) % 94) + 33);
            } else {
                pass += characters.charAt(Math.floor(Math.random() * characters.length));
            }
        }
        return pass;
    }

    static generarIniciales(user: User) {
        console.log(user);
        const iniciales = user.nombre != null ? user.nombre.trim().split(' ', 2) : '';
        if (iniciales.length >= 2) {
            return iniciales[0].substring(0, 1) + iniciales[1].substring(0, 1);
        } else if (iniciales.length >= 1) {
            return iniciales[0].substring(0, 1);
        }
        return 'A';
    }

    static round(num, decimales = 2) {
        const signo: number = (num >= 0 ? 1 : -1);
        num = num * signo;
        if (decimales === 0) {
            return signo * Math.round(num);
        }
        // round(x * 10 ^ decimales)
        num = num.toString().split('e');
        num = Math.round(+(num[0] + 'e' + (num[1] ? (+num[1] + decimales) : decimales)));
        // x * 10 ^ (-decimales)
        num = num.toString().split('e');
        return signo * parseFloat((num[0] + 'e' + (num[1] ? (+parseFloat(num[1]) - decimales) : -decimales)));
    }
}
