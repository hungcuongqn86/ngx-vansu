import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PartnerService} from './partner.service';

@Component({
    selector: 'app-base-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class DetailComponent implements OnInit {
    arrDiscount: string[];
    confirmUpdate = false;

    constructor(private router: Router, private route: ActivatedRoute
        , public partnerService: PartnerService) {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.partnerService.partner.id = params['id'];
            }
        });
    }

    ngOnInit() {
        if (this.partnerService.partner.id !== null) {
            this.partnerService.getPartner(this.partnerService.partner.id)
                .subscribe(partner => {
                    this.partnerService.partner = partner.data.partner;
                });
        } else {
            this.partnerService.reset();
        }
    }

    public backlist() {
        this.router.navigate(['/partner']);
    }
}
