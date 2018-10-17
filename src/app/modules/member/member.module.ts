import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollapseModule} from 'ngx-bootstrap/collapse';

import {MemberService} from './member.service';
import {MemberComponent} from './member.component';
import {DetailComponent} from './detail.component';

import {MemberRoutingModule} from './member.routing.module';
import {SharedModule} from '../../shared.module';

@NgModule({
    imports: [CommonModule, FormsModule, MemberRoutingModule, SharedModule, CollapseModule.forRoot()],
    declarations: [
        MemberComponent,
        DetailComponent
    ],
    exports: [],
    providers: [MemberService]
})
export class MemberModule {
}
