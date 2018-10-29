import {Component, OnInit, ViewEncapsulation, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {PartnerService} from '../../services/partner.service';
import {Partner} from '../../models/Partner';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
    selector: 'app-partner',
    templateUrl: './partner.component.html',
    styleUrls: ['./partner.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class PartnerComponent implements OnInit {
    partner: Partner;
    partners: Partner[];
    totalItems = 0;
    modalRef: BsModalRef;

    constructor(public partnerService: PartnerService,
                private router: Router, private modalService: BsModalService) {

    }

    ngOnInit() {
        this.searchPartner();
    }

    pageChanged(event: any): void {
        this.partnerService.search.page = event.page;
        this.searchPartner();
    }

    public addPartner() {
        this.partnerService.partner.id = null;
        this.router.navigate(['/partner/add']);
    }

    public editPartner(id) {
        this.router.navigate([`/partner/${id}`]);
    }

    public deletePartner() {
        if (this.partner) {
            this.partner.is_deleted = 1;
            this.partnerService.editPartner(this.partner)
                .subscribe(res => {
                    this.searchPartner();
                });
        }
    }

    public searchPartner() {
        this.partnerService.getPartners(this.partnerService.search)
            .subscribe(partners => {
                this.partners = partners.data.data;
                this.totalItems = partners.data.total;
            });
    }

    openModal(template: TemplateRef<any>, partner) {
        this.partner = partner;
        this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    confirm(): void {
        this.deletePartner();
        this.modalRef.hide();
    }

    decline(): void {
        this.modalRef.hide();
    }
}
