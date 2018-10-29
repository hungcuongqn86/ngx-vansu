import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollapseModule} from 'ngx-bootstrap/collapse';

import {PartnerService} from '../../services/partner.service';
import {PartnerComponent} from './partner.component';
import {DetailComponent} from './detail.component';

import {PartnerRoutingModule} from './partner.routing.module';
import {SharedModule} from '../../shared.module';

@NgModule({
    imports: [CommonModule, FormsModule, PartnerRoutingModule, SharedModule, CollapseModule.forRoot()],
    declarations: [
        PartnerComponent,
        DetailComponent
    ],
    exports: [],
    providers: [PartnerService]
})
export class PartnerModule {
}
