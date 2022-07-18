import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/internal/operators';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {StorageService} from './storage-service.service';

import * as XLSX from 'xlsx';


interface DataResponse {status: boolean; message: string; data: Array<JSON>; logeado: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class DataSourceService {
    ev = environment;
    datos: Observable<any>;
    public urlApi = this.ev.urlApi;

    constructor(private http: HttpClient, private router: Router, private localStorage: StorageService) {
    }


    // TODO Realizar peticion de tipo GET, solo para solicitudes en los que no requiera enviar parametros por FORMDATA
    solicitudGET(solicitud): Observable<DataResponse> {
        return this.datos = this.http.get<DataResponse>(this.urlApi + solicitud, this.options()).pipe(map(data => {
            // TODO: validar que la session exista
            if (!data.status && !data.logeado) {

                // TODO cerrando sesion
                this.localStorage.removeCurrentSession();
                this.router.navigate(['/login']);

            }
            return data;
        }));
    }

    // TODO Realizar peticiones de tipo POST, para ingresar la informacion al servidor
    solicitudPOST(parametros, solicitud): Observable<DataResponse> {
        return this.http.post<DataResponse>(this.urlApi + solicitud, parametros, this.options()).pipe(map(
            data => {
                // TODO: validar que la session exista
                if (!data.status && !data.logeado) {

                    // TODO cerrando sesion
                    this.localStorage.removeCurrentSession();
                    this.router.navigate(['/login']);

                }
                return data;
            }
        ));
    }

    // TODO Realizar peticiones de tipo POST, para ingresar la informacion al servidor
    solicitudPUT(solicitud, parametros = null): Observable<DataResponse> {
        return this.http.put<DataResponse>(this.urlApi + solicitud, parametros, this.options()).pipe(map(
            data => {
                // TODO: validar que la session exista
                if (!data.status && !data.logeado) {

                    // TODO cerrando sesion
                    this.localStorage.removeCurrentSession();
                    this.router.navigate(['/login']);

                }
                return data;
            }
        ));
    }

    // TODO Realizar peticiones de tipo POST, para ingresar la informacion al servidor
    solicitudDELETE(solicitud): Observable<DataResponse> {
        return this.http.delete<DataResponse>(this.urlApi + solicitud, this.options()).pipe(map(
            data => {
                // TODO: validar que la session exista
                if (!data.status && !data.logeado) {

                    // TODO cerrando sesion
                    this.localStorage.removeCurrentSession();
                    this.router.navigate(['/login']);

                }
                return data;
            }
        ));
    }

    aut(parametros): Observable<DataResponse> {
        return this.solicitudPOST(parametros, 'auth/login');
    }

    headers(token) {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        });
    }

    options() {
        return {headers: this.headers(this.localStorage.getToken()), withCredentials: true};
    }

    // TODO Función para exportar a Excel
    exportarExcel(data, NombreArchivo, columnas = null) {

        let datos = [];

        // TODO Definir los headers
        const headers = [Object.keys(columnas).map(key => {
            return columnas[key]['title'];
        })];
        // TODO validar si vienen columnas
        if (columnas != null) {
            data.forEach(item => {
                const fila = new Object();
                for (const key in columnas) {
                    const value = item[key];
                    if (value) {
                        // TODO Obtener el objeto de la columna para validar si tiene valuePrepareFunction
                        const objetoColuma = columnas[key];
                        const funcionValuePrepare = objetoColuma['valuePrepareFunction'];

                        if (funcionValuePrepare) {
                            fila[key] = funcionValuePrepare(item[key]);
                        } else {
                            fila[key] = item[key];
                        }
                    }else
                        fila[key] = '';
                }
                datos.push(fila);
            });
        } else {
            datos = data;
        }

        // TODO Crear el libro y la hoja1
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet([]);

        // TODO Agregar los headers
        XLSX.utils.sheet_add_aoa(worksheet, headers);

        // TODO agregar la data
        XLSX.utils.sheet_add_json(worksheet, datos, {origin: 'A2', skipHeader: true});

        // TODO Agregar la hora1 al libro
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // TODO Exportar el archivo
        XLSX.writeFile(workbook, NombreArchivo + '.xlsx');
    }
}
