import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SimComponent} from './sim.component';
import {DetailComponent} from './detail.component';

const routes: Routes = [
    {
        path: '', component: SimComponent,
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

export class SimRoutingModule {
    constructor() {
    }
}
