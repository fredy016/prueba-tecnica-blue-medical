import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {NavService} from '../../service/nav.service';
import {StorageService} from '../../service/storage-service.service';
import {DataSourceService} from '../../service/data-source.service';
import {Router} from '@angular/router';
import {Util} from '../../classes/util';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public rightSidebar = false;
    public open = false;
    public openNav = false;
    public isOpenMobile: boolean;
    public inicialesNombre = '';

    @Output() rightSidebarEvent = new EventEmitter<boolean>();

    constructor(public navServices: NavService, public storageService: StorageService, private dataSource: DataSourceService, private router: Router) {
        this.inicialesNombre = 'UP';
    }

    collapseSidebar() {
        this.open = !this.open;
        this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
    }

    right_side_bar() {
        this.rightSidebar = !this.rightSidebar;
        this.rightSidebarEvent.emit(this.rightSidebar);
    }

    openMobileNav() {
        this.openNav = !this.openNav;
    }


    ngOnInit() {
    }

    // TODO funcion para cerrar sesion
    cerrarSesion() {
        // TODO cerrando sesion localmente
        this.storageService.removeCurrentSession();
        this.router.navigate(['/login']);

    }

}
