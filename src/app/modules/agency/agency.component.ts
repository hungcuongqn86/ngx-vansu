import {Component, OnInit, ViewEncapsulation, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {Agency, AgencyService} from './agency.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
    selector: 'app-agency',
    templateUrl: './agency.component.html',
    styleUrls: ['./agency.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class AgencyComponent implements OnInit {
    agency: Agency;
    agencies: Agency[];
    totalItems = 0;
    modalRef: BsModalRef;

    constructor( public agencyService: AgencyService,
                private router: Router, private modalService: BsModalService) {

    }

    ngOnInit() {
        this.searchAgency();
    }

    pageChanged(event: any): void {
        this.agencyService.search.page = event.page;
        this.searchAgency();
    }

    public addBase() {
        this.agencyService.agency.id = null;
        this.router.navigate(['/agency/add']);
    }

    public editBase(id) {
        this.router.navigate([`/agency/${id}`]);
    }

    public deleteBase() {
        if (this.agency) {
            this.agency.is_deleted = 1;
            this.agencyService.editAgency(this.agency)
                .subscribe(res => {
                    this.searchAgency();
                });
        }
    }

    public searchAgency() {
        this.agencyService.getAgencies(this.agencyService.search)
            .subscribe(agencies => {
                this.agencies = agencies.data.data;
                this.totalItems = agencies.data.total;
            });
    }

    openModal(template: TemplateRef<any>, agency) {
        this.agency = agency;
        this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    confirm(): void {
        this.deleteBase();
        this.modalRef.hide();
    }

    decline(): void {
        this.modalRef.hide();
    }
}
