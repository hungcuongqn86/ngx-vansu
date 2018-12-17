import {Component, OnInit, ViewEncapsulation, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {OrdersService} from '../../services/orders.service';
import {Order} from '../../models/Order';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class OrdersComponent implements OnInit {
    orders: Order[];
    orderstatus: any[];
    totalItems = 0;

    constructor(public ordersService: OrdersService, private router: Router) {

    }

    ngOnInit() {
        this.searchOrders();
        this.getOrderStatus();
    }

    pageChanged(event: any): void {
        this.ordersService.search.page = event.page;
        this.searchOrders();
    }

    public editBase(id) {
        this.router.navigate([`/msim/orders/${id}`]);
    }

    public searchOrders() {
        this.ordersService.getOrders(this.ordersService.search)
            .subscribe(bases => {
                this.orders = bases.data.data;
                this.totalItems = bases.data.total;
            });
    }

    public getOrderStatus() {
        this.ordersService.getOrderStatus()
            .subscribe(data => {
                this.orderstatus = data.data.orderstatus;
            });
    }
}
