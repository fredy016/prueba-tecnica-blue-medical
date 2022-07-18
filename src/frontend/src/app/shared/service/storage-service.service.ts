import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

class Session {
    public token: string;

    // TODO función que recibe la info del user
    static fromJson(data: any) {
        return new Session(data);
    }

    // TODO función que recibe toda la sesión en string
    static fromString(data: string) {
        const dataObject = JSON.parse(data);
        return new Session(dataObject);
    }

    public toJson() {
        return {
            token: this.token
        };
    }

    constructor(data: any) {
        if (data == null) {
            return;
        }
        this.token = data.token;
    }

}

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private localStorageService;
    private currentSession: Session = null;
    private currentPermisos: any[] = new Array<any>(0);

    constructor(private router: Router) {
        this.localStorageService = localStorage;
        this.currentSession = this.loadSessionData();
        this.currentPermisos = this.loadPermisos();
    }

    setCurrentSession(session: any): void {
        console.log(session);
        this.currentSession = Session.fromJson(session);
        console.log(this.currentSession.toJson());
        this.localStorageService.setItem('currentSession', JSON.stringify(this.currentSession.toJson()));
    }

    loadSessionData(): Session {
        const sessionStr = this.localStorageService.getItem('currentSession');
        return (sessionStr) ? Session.fromString(sessionStr) : null;
    }

    getCurrentSession(): Session {
        return this.currentSession;
    }

    removeCurrentSession(): void {
        this.localStorageService.removeItem('currentSession');
        this.currentSession = null;
    }

    isAuthenticated(): boolean {
        return !!this.getCurrentSession();
    }

    logout(): void {
        this.removeCurrentSession();
        this.router.navigate(['/']);
    }

    getToken(): string {
        const currentSession = this.getCurrentSession();
        if (currentSession == null) {
            return '';
        }
        return currentSession.token;
    }


    /**********Permisos***************/

    loadPermisos(): any[] {
        const permisos = this.localStorageService.getItem('permisos');
        return (permisos) ? JSON.parse(permisos) as any[] : null;
    }


    setPermisos(permisos: any[]) {
        this.currentPermisos = permisos;
        this.localStorageService.setItem('permisos', JSON.stringify(permisos));

    }

    /**********Permisos***************/

}
