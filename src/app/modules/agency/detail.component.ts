import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AgencyService} from './agency.service';

@Component({
    selector: 'app-base-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {
    arrDiscount: string[];

    constructor(private router: Router, private route: ActivatedRoute
        , public agencyService: AgencyService) {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.agencyService.agency.id = params['id'];
            }
        });

        this.getDiscount();
    }

    ngOnInit() {
        if (this.agencyService.agency.id !== null) {
            this.agencyService.getAgency(this.agencyService.agency.id)
                .subscribe(agency => {
                    this.agencyService.agency = agency.data.agency;
                });
        } else {
            this.agencyService.reset();
        }
    }

    public getDiscount() {
        this.agencyService.getDiscount()
            .subscribe(data => {
                this.arrDiscount = data.data;
            });
    }

    public backlist() {
        this.router.navigate(['/agency']);
    }
}
