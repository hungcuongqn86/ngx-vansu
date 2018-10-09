import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AgencyComponent} from './agency.component';
import {DetailComponent} from './detail.component';

const routes: Routes = [
    {
        path: '', component: AgencyComponent,
        data: {
            title: 'Sim'
        }
    },
    {
        path: 'add', component: DetailComponent,
        data: {
            title: 'Thêm sim mới'
        }
    },
    {
        path: ':id', component: DetailComponent,
        data: {
            title: 'Sửa sim'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})

export class AgencyRoutingModule {
    constructor() {
    }
}
