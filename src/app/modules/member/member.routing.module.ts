import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MemberComponent} from './member.component';
import {DetailComponent} from './detail.component';

const routes: Routes = [
    {
        path: '', component: MemberComponent,
        data: {
            title: 'Thành viên'
        }
    },
    {
        path: ':id', component: DetailComponent,
        data: {
            title: 'Sửa thành viên'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})

export class MemberRoutingModule {
    constructor() {
    }
}
