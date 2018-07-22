import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CustomersComponent} from './customers.component';
import {DetailComponent} from './detail.component';

const routes: Routes = [
    {
        path: '', component: CustomersComponent,
        data: {
            title: 'Khách hàng'
        }
    },
    {
        path: 'add', component: DetailComponent,
        data: {
            title: 'Thêm khách hàng'
        }
    },
    {
        path: ':id', component: DetailComponent,
        data: {
            title: 'Sửa thông tin khách hàng'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})

export class CustomersRoutingModule {
    constructor() {
    }
}
