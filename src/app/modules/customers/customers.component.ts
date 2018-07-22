import {Component, OnInit, ViewEncapsulation, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {Customer, CustomersService} from './customers.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class CustomersComponent implements OnInit {
    customer: Customer;
    customers: Customer[];
    totalItems = 0;
    modalRef: BsModalRef;

    constructor(public customersService: CustomersService, private router: Router, private modalService: BsModalService) {

    }

    ngOnInit() {
        this.searchCustomer();
    }

    pageChanged(event: any): void {
        this.customersService.search.page = event.page;
        this.searchCustomer();
    }

    public addCustomer() {
        this.router.navigate(['/customers/add']);
    }

    public editCustomer(id) {
        this.router.navigate([`/customers/${id}`]);
    }

    public deleteCustomer() {
        if (this.customer) {
            this.customer.delete_f = 1;
            this.customersService.editCustomer(this.customer)
                .subscribe(res => {
                    this.searchCustomer();
                });
        }
    }

    public searchCustomer() {
        this.customersService.getCustomers(this.customersService.search)
            .subscribe(customers => {
                this.customers = customers.data.data;
                this.totalItems = customers.data.total;
            });
    }

    openModal(template: TemplateRef<any>, customer) {
        this.customer = customer;
        this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    confirm(): void {
        this.deleteCustomer();
        this.modalRef.hide();
    }

    decline(): void {
        this.modalRef.hide();
    }
}
