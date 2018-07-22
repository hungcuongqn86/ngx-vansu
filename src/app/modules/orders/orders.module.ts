import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {OrdersService} from './orders.service';
import {OrdersComponent} from './orders.component';
import {DetailComponent} from './detail.component';

import {OrdersRoutingModule} from './orders.routing.module';
import {SharedModule} from '../../shared.module';

@NgModule({
    imports: [CommonModule, FormsModule, OrdersRoutingModule, SharedModule],
    declarations: [
        OrdersComponent,
        DetailComponent
    ],
    exports: [],
    providers: [OrdersService]
})
export class OrdersModule {
}
