import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {OrdersComponent} from './orders.component';
import {DetailComponent} from './detail.component';

const routes: Routes = [
    {
        path: '', component: OrdersComponent,
        data: {
            title: 'Đơn hàng'
        }
    },
    {
        path: ':id', component: DetailComponent,
        data: {
            title: 'Xử lý đơn hàng'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})

export class OrdersRoutingModule {
    constructor() {
    }
}
