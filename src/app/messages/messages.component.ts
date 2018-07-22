import {Component, TemplateRef} from '@angular/core';
import {LoadingService} from '../loading.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html'
})
export class MessagesComponent {
    modalRef: BsModalRef;

    constructor(public loadingService: LoadingService, private modalService: BsModalService) {
    }

    public showLoading(template: TemplateRef<any>) {
        // console.log(this.loadingService.progress);
        if (this.loadingService.progress.type === 'progress') {
            if (!this.modalRef) {
                this.modalRef = this.modalService.show(template, {class: 'modal-md'});
            }
        }
    }
}
