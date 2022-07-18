import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import Swal from 'sweetalert2';

import {DataSourceService} from '../../../shared/service/data-source.service';
import {StorageService} from '../../../shared/service/storage-service.service';
import {Util} from '../../../shared/classes/util';
import {NavService} from '../../../shared/service/nav.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup;
    public today: number = Date.now();

    constructor(private formBuilder: FormBuilder, private storageService: StorageService, private router: Router, private dataApiService: DataSourceService, private navService: NavService) {
        this.createLoginForm();
    }

    createLoginForm() {
        this.loginForm = this.formBuilder.group({
            email: [{value: '', disabled: false}, [Validators.required, Validators.email]],
            password: [{value: '', disabled: false}, [Validators.required, Validators.minLength(4)]]
        });
    }

    ngOnInit(): void {
    }


    onSubmit() {
        if (!this.loginForm.valid) {
            return;
        }

        this.peticionGuardar(this.loginForm.value);
    }

    peticionGuardar(datos: any) {
        Util.mostrarMensajeEspera('Espere...', 'Realizando solicitud');

        // TODO realizar solicitud
        this.dataApiService.aut(datos).subscribe(data => {
            Swal.close();
            if (data.status) {
                this.storageService.setCurrentSession({token: data.data[0]['access_token']});
                this.router.navigate(['/']);
                this.navService.getPermisos();
            } else {
                Util.mostrarMensajeResponse('Inicio de sesión fallido', data.message, false);
            }
        });
    }

}
