import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {CustomersService} from './customers.service';
import {CustomersComponent} from './customers.component';
import {DetailComponent} from './detail.component';

import {CustomersRoutingModule} from './customers.routing.module';
import {SharedModule} from '../../shared.module';

@NgModule({
    imports: [CommonModule, FormsModule, CustomersRoutingModule, SharedModule],
    declarations: [
        CustomersComponent,
        DetailComponent
    ],
    exports: [],
    providers: [CustomersService]
})
export class CustomersModule {
}
