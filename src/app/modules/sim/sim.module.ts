import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollapseModule} from 'ngx-bootstrap/collapse';

import {SimService} from '../../services/sim.service';
import {AgencyService} from '../../services/agency.service';
import {SimComponent} from './sim.component';
import {DetailComponent} from './detail.component';
import {OrdersComponent} from './orders/orders.component';
import {InfoComponent} from './info/info.component';

import {SimRoutingModule} from './sim.routing.module';
import {SharedModule} from '../../shared.module';

@NgModule({
    imports: [CommonModule, FormsModule, SimRoutingModule, SharedModule, CollapseModule.forRoot()],
    declarations: [
        SimComponent,
        DetailComponent,
        OrdersComponent,
        InfoComponent
    ],
    exports: [],
    providers: [SimService, AgencyService]
})
export class SimModule {
}
