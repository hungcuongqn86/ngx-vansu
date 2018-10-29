import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollapseModule} from 'ngx-bootstrap/collapse';

import {AgencyService} from '../../services/agency.service';
import {AgencyComponent} from './agency.component';
import {DetailComponent} from './detail.component';

import {AgencyRoutingModule} from './agency.routing.module';
import {SharedModule} from '../../shared.module';

@NgModule({
    imports: [CommonModule, FormsModule, AgencyRoutingModule, SharedModule, CollapseModule.forRoot()],
    declarations: [
        AgencyComponent,
        DetailComponent
    ],
    exports: [],
    providers: [AgencyService]
})
export class AgencyModule {
}
