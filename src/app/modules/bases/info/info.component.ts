import {Component} from '@angular/core';
import {BasesService} from '../bases.service';

@Component({
    selector: 'app-base-detail-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})

export class InfoComponent {
    constructor(public basesService: BasesService) {
    }
}
