import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PartnerComponent} from './partner.component';
import {DetailComponent} from './detail.component';

const routes: Routes = [
    {
        path: '', component: PartnerComponent,
        data: {
            title: 'Đối tác'
        }
    },
    {
        path: 'add', component: DetailComponent,
        data: {
            title: 'Thêm đối tác mới'
        }
    },
    {
        path: ':id', component: DetailComponent,
        data: {
            title: 'Sửa đối tác'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})

export class PartnerRoutingModule {
    constructor() {
    }
}
