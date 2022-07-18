import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {NavService, Menu} from '../../service/nav.service';
import {StorageService} from '../../service/storage-service.service';
import {User} from '../../classes/user';
import {Util} from '../../classes/util';


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SidebarComponent {

    public menuItems: Menu[];
    public url: any;
    public inicialesNombre = 'UP';


    constructor(private router: Router, public navServices: NavService, private localStorage: StorageService) {
        localStorage.loadPermisos();
        this.navServices.items.subscribe(menuItems => {
            this.menuItems = menuItems;
            this.activarItem();
        });

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.url = event.url;
                this.activarItem();
            }
        });
    }

    activarItem() {
        this.menuItems.filter(items => {
            if (items.path === this.url) {
                this.setNavActive(items);
            }
            if (!items.children) {
                return false;
            }
            items.children.filter(subItems => {
                if (subItems.path === this.url) {
                    this.setNavActive(subItems);
                }
                if (!subItems.children) {
                    return false;
                }
                subItems.children.filter(subSubItems => {
                    if (subSubItems.path === this.url) {
                        this.setNavActive(subSubItems);
                    }
                });
            });
        });
    }

    // Active Nave state
    setNavActive(item) {
        this.menuItems.filter(menuItem => {
            if (menuItem !== item) {
                menuItem.active = false;
            }
            if (menuItem.children) {
                menuItem.children.filter(submenuItems => {
                    if (submenuItems === item) {
                        menuItem.active = true;
                        submenuItems.active = true;
                    }
                });
            }
        });
    }

    // Click Toggle menu
    toggletNavActive(item) {
        if (!item.active) {
            this.menuItems.forEach(a => {
                if (this.menuItems) {
                    a.active = false;
                }
                if (!a.children) {
                    return false;
                }
                a.children.forEach(b => {
                    if (a.children.find(itemBuscar => itemBuscar === item)) {
                        b.active = false;
                    }
                });
            });
        }
        item.active = !item.active;
    }

    // Fileupload
    // readUrl(event: any) {
    //     if (event.target.files.length === 0) {
    //         return;
    //     }
    //     // Image upload validation
    //     const mimeType = event.target.files[0].type;
    //     if (mimeType.match(/image\/*/) == null) {
    //         return;
    //     }
    //     // Image upload
    //     const reader = new FileReader();
    //     reader.readAsDataURL(event.target.files[0]);
    //     reader.onload = (eventt) => {
    //         this.url = reader.result;
    //     };
    // }

}
