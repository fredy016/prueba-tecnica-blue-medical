import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {content} from './shared/routes/content-routes';
import {ContentLayoutComponent} from './shared/layout/content-layout/content-layout.component';
import {LoginComponent} from './components/auth/login/login.component';
import {AuthorizatedGuard} from './shared/AutenticationGuard/autorizatedGuard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',

    },
    {
        path: '',
        component: ContentLayoutComponent,
        children: content,
        canActivate: [AuthorizatedGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'enabled',
        relativeLinkResolution: 'legacy'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
