import {Injectable, HostListener, Inject, Optional} from '@angular/core';
import {BehaviorSubject, Observable, Subscriber} from 'rxjs';
import {WINDOW} from './windows.service';
import {DataSourceService} from './data-source.service';
import {StorageService} from './storage-service.service';

// Menu
export class Menu {
    path?: string;
    title?: string;
    icon?: string;
    type?: string;
    badgeType?: string;
    badgeValue?: string;
    active = false;
    bookmark?: boolean;
    children?: Menu[];

    static fromArray(data: any[]): Menu[] {
        if (data == null) {
            return [];
        }
        const products: Menu[] = [];
        data.forEach(value => {
            products.push(Menu.fromJson(value));
        });
        return products;

    }

    public static fromJson(data: any): Menu {
        return new Menu(data);
    }

    public includes(data: Menu): boolean {
        return (this === data);
    }

    constructor(@Optional() data?: any) {
        if (data == null) {
            return;
        }
        console.log(data);
        this.path = data.path;
        this.title = data.title;
        this.icon = data.icon;
        this.type = data.type;
        this.badgeType = data.badgeType;
        this.badgeValue = data.badgeValue;
        this.active = (data.active === 'undefined' ? false : data.active);
        this.bookmark = data.bookmark;
        this.children = Menu.fromArray(data.children);
        console.log(data.active);
        console.log(this.active);
    }
}

@Injectable({
    providedIn: 'root'
})

export class NavService {

    public screenWidth: any;
    public collapseSidebar = false;

    MENUITEMS = [];

    items = new BehaviorSubject<any[]>(this.MENUITEMS);

    constructor(@Inject(WINDOW) private window, private dataSourceService: DataSourceService, private storageService: StorageService) {
        // console.log(this.MENUITEMS);
        this.onResize();
        if (this.screenWidth < 991) {
            this.collapseSidebar = true;
        }
        this.MENUITEMS = [
            {
                active: false,
                children: [
                    {path: '/auto_oficial', title: 'Lista', type: 'link'},
                    {path: '/auto_oficial/crear', title: 'Dar de alta', type: 'link'},
                ],
                icon: 'users',
                title: 'Veh??culo oficial',
                type: 'sub'
            },
            {
                active: false,
                children: [
                    {path: '/auto_residente', title: 'Lista', type: 'link'},
                    {path: '/auto_residente/crear', title: 'Dar de alta', type: 'link'},
                ],
                icon: 'users',
                title: 'Veh??culo residente',
                type: 'sub'
            },
            {
                active: false,
                children: [
                    {path: '/ingreso/entrada', title: 'Registrar Entrada', type: 'link'},
                    {path: '/ingreso/salida', title: 'Registrar Salida', type: 'link'},
                ],
                icon: 'users',
                title: 'Registro de Ingreso',
                type: 'sub'
            },
            {
                active: false,
                children: [
                    {path: '/mes/comenzar-mes', title: 'Comienzo Mes', type: 'link'},
                    {path: '/mes/generar-informe', title: 'Generar Informe', type: 'link'},
                ],
                icon: 'users',
                title: 'Acciones del Mes',
                type: 'sub'
            }
        ];

        this.getPermisos();
    }

    // Windows width
    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.screenWidth = window.innerWidth;
    }


    getPermisos() {
        // TODO temporal
        this.items.next(this.MENUITEMS.filter(menuItem => menuItem));
        this.storageService.setPermisos(this.MENUITEMS);
    }

    setItems(data) {
        this.storageService.setPermisos(data.datos);
        this.items.next(data.datos.filter(menuItem => menuItem));
    }

}
