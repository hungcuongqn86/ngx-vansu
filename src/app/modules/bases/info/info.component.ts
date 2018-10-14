import {Component} from '@angular/core';
import {BasesService, Telco} from '../bases.service';
import {Agency, AgencyService} from '../../agency/agency.service';

@Component({
    selector: 'app-base-detail-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})

export class InfoComponent {
    telco: Telco[];
    agencies: Agency[];

    constructor(public basesService: BasesService, public agencyService: AgencyService) {
        this.getTelco();
        this.getAgencies();
    }

    public getTelco() {
        this.basesService.getTelco()
            .subscribe(data => {
                this.telco = data.data.category;
            });
    }

    public getAgencies() {
        const search = {page_size: 1000, page: 1};
        this.agencyService.getAgencies(search)
            .subscribe(agencies => {
                this.agencies = agencies.data.data;
            });
    }
}
