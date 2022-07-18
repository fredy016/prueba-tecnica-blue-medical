import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {FeatherIconsComponent} from './components/feather-icons/feather-icons.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';

import {ToggleFullscreenDirective} from './directives/fullscreen.directive';
import {ContentLayoutComponent} from './layout/content-layout/content-layout.component';
import {NavService} from './service/nav.service';
import {WINDOW_PROVIDERS} from './service/windows.service';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {RightSidebarComponent} from './components/right-sidebar/right-sidebar.component';

import {HttpClientModule} from '@angular/common/http';
import {CustomInputNumberEditorComponent} from './components/custom-input-number-editor/custom-input-number-editor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomInputSelectEditorComponent} from './components/custom-input-select-editor/custom-input-select-editor.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {DropDownActionComponent} from './drop-down-action/drop-down-action.component';
import {TabulatorComponent} from './components/tabulator/tabulator.component';
import {EmptyToNullDirective} from './directives/EmptyToNullDirective';

@NgModule({
    declarations: [
        ToggleFullscreenDirective,
        EmptyToNullDirective,
        FeatherIconsComponent,
        FooterComponent,
        HeaderComponent,
        SidebarComponent,
        ContentLayoutComponent,
        BreadcrumbComponent,
        RightSidebarComponent,
        CustomInputNumberEditorComponent,
        CustomInputSelectEditorComponent,
        DropDownActionComponent,
        TabulatorComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        RouterModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        NgSelectModule
    ],
    providers: [NavService, WINDOW_PROVIDERS],
    exports: [FeatherIconsComponent, ToggleFullscreenDirective, EmptyToNullDirective, TabulatorComponent, CustomInputNumberEditorComponent]
})
export class SharedModule {
}
