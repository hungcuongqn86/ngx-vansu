import {ModuleWithProviders, NgModule} from '@angular/core';
import {MessageDirective} from './messages/message.directive';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {ProgressbarModule} from 'ngx-bootstrap';
import {ModalModule} from 'ngx-bootstrap/modal';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {AppBreadcrumbModule} from '@coreui/angular';

@NgModule({
    imports: [AppBreadcrumbModule.forRoot(), PaginationModule.forRoot(),
        ModalModule.forRoot(), ProgressbarModule.forRoot(), TabsModule.forRoot(), BsDatepickerModule.forRoot()],
    declarations: [MessageDirective],
    exports: [MessageDirective, PaginationModule, ModalModule, ProgressbarModule, TabsModule, AppBreadcrumbModule, BsDatepickerModule],
    providers: []
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }

    constructor() {

    }
}
