import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VersionsService} from '../../services/versions.service';
import {PartnerService} from '../../services/partner.service';
import {Partner} from '../../models/Partner';

@Component({
    selector: 'app-base-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {
    public partners: Partner[];
    public applist = [
        {code: 'vs', name: 'Lịch vạn sự'},
        {code: 'spt', name: 'Sim phong thủy'},
    ];

    constructor(private router: Router, private route: ActivatedRoute
        , public versionsService: VersionsService, public partnerService: PartnerService) {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.versionsService.version.id = params['id'];
            }
        });
    }

    ngOnInit() {
        if (this.versionsService.version.id !== null) {
            this.versionsService.getVersion(this.versionsService.version.id)
                .subscribe(version => {
                    this.versionsService.version = version.data.sim;
                });
        } else {
            this.versionsService.reset();
        }
        this.getPartner();
    }

    public getPartner() {
        const filter = {key: '', page_size: 1000, page: 1};
        this.partnerService.getPartners(filter)
            .subscribe(partners => {
                this.partners = partners.data.data;
            });
    }

    public backlist() {
        this.router.navigate(['/version']);
    }
}
