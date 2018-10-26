import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PartnerService} from './partner.service';
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
                    this.partnerService.partner = partner.data.agency;
                });
        } else {
            this.partnerService.reset();
        }
    }

    public updateAgency(template: TemplateRef<any>) {
        if (this.confirmUpdate) {
            this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
        } else {
            this.partnerService.updatePartner();
        }
    }

    public changeDiscount() {
        if (this.partnerService.partner.id !== null) {
            this.confirmUpdate = true;
        }
    }

    confirm(): void {
        this.partnerService.updatePartner();
        this.modalRef.hide();
    }

    decline(): void {
        this.partnerService.updatePartner();
        this.modalRef.hide();
    }

    public backlist() {
        this.router.navigate(['/msim/agency']);
    }
}
