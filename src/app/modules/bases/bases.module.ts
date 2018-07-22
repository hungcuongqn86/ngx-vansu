import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollapseModule} from 'ngx-bootstrap/collapse';

import {BasesService} from './bases.service';
import {BasesComponent} from './bases.component';
import {DetailComponent} from './detail.component';
import {MockupsComponent} from './mockup/mockups.component';
import {InfoComponent} from './info/info.component';

import {BasesRoutingModule} from './bases.routing.module';
import {SharedModule} from '../../shared.module';

@NgModule({
    imports: [CommonModule, FormsModule, BasesRoutingModule, SharedModule, CollapseModule.forRoot()],
    declarations: [
        BasesComponent,
        DetailComponent,
        MockupsComponent,
        InfoComponent
    ],
    exports: [],
    providers: [BasesService]
})
export class BasesModule {
}
