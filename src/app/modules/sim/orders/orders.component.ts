import {Component} from '@angular/core';
import {SimService} from '../sim.service';

@Component({
    selector: 'app-sim-detail-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})

export class OrdersComponent {
    constructor(public simService: SimService) {

    }
}
