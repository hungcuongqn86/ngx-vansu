import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HttpErrorHandler, HandleError} from '../../http-error-handler.service';
import {Util} from '../../helper/lib';
import {apiV1Url} from '../../const';
import {Telco} from '../bases/bases.service';

export interface Customer {
    id: number;
    customer_name: string;
    customer_tel: string;
    customer_addr: string;
    customer_dob: string;
    is_deleted: number;
    created_at: string;
    updated_at: string;
}

export interface Order {
    id: number;
    sim_id: number;
    customer_id: number;
    order_number: string;
    order_status: number;
    created_at: string;
    order_status_name: string;
    updated_at: string;
    customer: Customer;
    sim: Sim;
}

export interface Telco {
    id: number;
    telco_name: string;
    created_at: string;
    updated_at: string;
}

export interface Sim {
    id: number;
    sim_number: string;
    sim_number_standard: string;
    price: number;
    telco_id: number;
    is_deleted: number;
    sold_at: string;
    created_at: string;
    updated_at: string;
    order: Array<Order>;
    category: Telco;
}

@Injectable()
export class OrdersService {
    static instance: OrdersService;
    private handleError: HandleError;
    public search = {key: '', status: '', page_size: 10, page: 1};
    public order: Order;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('OrdersService');
        if (!this.order) {
            this.reset();
        }
        return OrdersService.instance = OrdersService.instance || this;
    }

    reset() {
        this.order = {
            id: null
            , sim_id: null
            , customer_id: null
            , order_number: null
            , order_status: 0
            , order_status_name: null
            , created_at: ''
            , updated_at: ''
            , customer: null
            , sim: null
        };
    }

    getOrders(search): Observable<any> {
        const url = Util.getUri(apiV1Url) + `sim/order/search`;
        let params = new HttpParams();
        Object.keys(search).map((key) => {
            params = params.append(key, search[key]);
        });
        return this.http.get<any>(url, {params: params})
            .pipe(
                catchError(this.handleError('getOrders', []))
            );
    }

    getOrderStatus(): Observable<any> {
        const url = Util.getUri(apiV1Url) + `sim/order/status`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getOrderStatus', []))
            );
    }

    getOrder(id): Observable<any> {
        const url = Util.getUri(apiV1Url) + `sim/order/detail/${id}`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getOrder', []))
            );
    }
}
