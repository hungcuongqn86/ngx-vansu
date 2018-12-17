import {Component} from '@angular/core';
import {SimService} from '../../../services/sim.service';
import {Telco} from '../../../models/Sim';
import {AgencyService} from '../../../services/agency.service';
import {Agency} from '../../../models/Agency';

@Component({
    selector: 'app-sim-detail-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})

export class InfoComponent {
    telco: Telco[];
    agencies: Agency[];

    constructor(public simService: SimService, public agencyService: AgencyService) {
        this.getTelco();
        this.getAgencies();
    }

    public getTelco() {
        this.simService.getTelco()
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
