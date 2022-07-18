import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {StorageService} from '../../shared/service/storage-service.service';
@Injectable()
export class AuthorizatedGuard implements CanActivate {
    constructor(private router: Router, private storageService: StorageService) {
    }

    canActivate() {
        if (this.storageService.isAuthenticated()) {
            // TODO si está logeado retornamos true
            return true;
        }

        console.log('Redirigiendo al login');
        // TODO al no estar logeado retornamos false y redirigimos al login con navigate
        this.router.navigate(['/login']);
        return false;
    }
}
