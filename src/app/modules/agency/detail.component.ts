import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AgencyService} from './agency.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
    selector: 'app-base-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class DetailComponent implements OnInit {
    arrDiscount: string[];
    modalRef: BsModalRef;
    confirmUpdate = false;

    constructor(private router: Router, private route: ActivatedRoute, private modalService: BsModalService
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

    public updateAgency(template: TemplateRef<any>) {
        if (this.confirmUpdate) {
            this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
        } else {
            this.agencyService.updateAgency();
        }
    }

    public changeDiscount() {
        if (this.agencyService.agency.id !== null) {
            this.confirmUpdate = true;
        }
    }

    confirm(): void {
        this.agencyService.agency.changeDiscount = 1;
        this.agencyService.updateAgency();
        this.modalRef.hide();
    }

    decline(): void {
        this.agencyService.updateAgency();
        this.modalRef.hide();
    }

    public backlist() {
        this.router.navigate(['/msim/agency']);
    }
}
