import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrdersService} from './orders.service';

@Component({
    selector: 'app-base-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {
    orderstatus: any[];

    constructor(private router: Router, private route: ActivatedRoute
        , public ordersService: OrdersService) {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.ordersService.order.id = params['id'];
            }
        });
    }

    ngOnInit() {
        this.getOrderStatus();
        if (this.ordersService.order.id !== null) {
            this.ordersService.getOrder(this.ordersService.order.id)
                .subscribe(order => {
                    this.ordersService.order = order.data.order;
                });
        }
    }

    public getOrderStatus() {
        this.ordersService.getOrderStatus()
            .subscribe(data => {
                this.orderstatus = data.data.orderstatus;
            });
    }

    public backlist() {
        this.router.navigate(['/orders']);
    }
}
