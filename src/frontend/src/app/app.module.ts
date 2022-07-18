import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

// for HttpClient import:
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';

// for Router import:
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';

// for Core import:
import {LoadingBarModule} from '@ngx-loading-bar/core';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {SharedModule} from './shared/shared.module';
import {AuthModule} from './components/auth/auth.module';
import {AuthorizatedGuard} from './shared/AutenticationGuard/autorizatedGuard';
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        AppRoutingModule,
        AuthModule,
        SharedModule,
        // for HttpClient use:
        LoadingBarHttpClientModule,

        // for Router use:
        LoadingBarRouterModule,

        // for Core use:
        LoadingBarModule
    ],
    providers: [AuthorizatedGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}
