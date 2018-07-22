import {Component} from '@angular/core';
import {BasesService} from '../bases.service';

@Component({
    selector: 'app-base-detail-mockups',
    templateUrl: './mockups.component.html',
    styleUrls: ['./mockups.component.css']
})

export class MockupsComponent {
    constructor(public basesService: BasesService) {

    }
}
