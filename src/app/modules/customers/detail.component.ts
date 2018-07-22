import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Customer, CustomersService} from './customers.service';
import {backendUrl} from '../../const';

@Component({
    selector: 'app-base-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {
    backendUrl: string;
    customer: Customer;

    constructor(private router: Router, private route: ActivatedRoute
        , private customersService: CustomersService) {
        this.backendUrl = backendUrl;
        this.customer = {
            id: null
            , code: null
            , name: null
            , phone: null
            , email: null
            , address: null
            , note: null
            , delete_f: 0
        };
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.customer.id = params['id'];
            }
        });
    }

    ngOnInit() {
        if (this.customer.id !== null) {
            this.getCustomer(this.customer.id);
        }
    }

    public getCustomer(id) {
        this.customersService.getCustomer(id)
            .subscribe(customer => {
                this.customer = customer.data;
            });
    }

    public updateCustomer() {
        if (this.customer.id === null) {
            this.customersService.addCustomer(this.customer).subscribe(
                res => {
                    this.updateSuccess(res);
                }
            );
        } else {
            this.customersService.editCustomer(this.customer).subscribe(
                res => {
                    this.updateSuccess(res);
                }
            );
        }
    }

    private updateSuccess(res: any) {
        if (res.success) {
            this.backlist();
        }
    }

    public backlist() {
        this.router.navigate(['/customers']);
    }
}
