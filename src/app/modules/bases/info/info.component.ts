import {Component} from '@angular/core';
import {BasesService, Telco} from '../bases.service';

@Component({
    selector: 'app-base-detail-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})

export class InfoComponent {
    telco: Telco[];

    constructor(public basesService: BasesService) {
        this.getTelco();
    }

    public getTelco() {
        this.basesService.getTelco()
            .subscribe(data => {
                this.telco = data.data.category;
            });
    }
}
