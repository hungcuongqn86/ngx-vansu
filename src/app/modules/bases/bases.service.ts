import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HttpErrorHandler, HandleError} from '../../http-error-handler.service';
import {Util} from '../../helper/lib';
import {apiV1Url} from '../../const';
import {Router} from '@angular/router';

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
    order_status_name: string;
    created_at: string;
    updated_at: string;
    customer: Customer;
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
    telco_id: string;
    is_deleted: number;
    sold_at: string;
    created_at: string;
    updated_at: string;
    order: Array<Order>;
    category: Telco;
}

@Injectable()
export class BasesService {
    static instance: BasesService;
    private handleError: HandleError;
    public search = {partten: '', start_price: 0, end_price: null, page_size: 10, page: 1};
    public sim: Sim;

    constructor(private router: Router, private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('BasesService');
        if (!this.sim) {
            this.reset();
        }
        return BasesService.instance = BasesService.instance || this;
    }

    reset() {
        this.sim = {
            id: null
            , sim_number: null
            , sim_number_standard: null
            , price: null
            , telco_id: ''
            , is_deleted: 0
            , sold_at: ''
            , created_at: ''
            , updated_at: ''
            , order: []
            , category: null
        };
    }

    getBases(search): Observable<any> {
        const url = Util.getUri(apiV1Url) + `sim/search`;
        let params = new HttpParams();
        Object.keys(search).map((key) => {
            params = params.append(key, search[key]);
        });
        return this.http.get<any>(url, {params: params})
            .pipe(
                catchError(this.handleError('getBases', []))
            );
    }

    getBase(id): Observable<any> {
        const url = Util.getUri(apiV1Url) + `sim/detail/${id}`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getBase', []))
            );
    }

    getTelco(): Observable<any> {
        const url = Util.getUri(apiV1Url) + `sim/telco`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getOrderStatus', []))
            );
    }

    updateBase() {
        if (this.sim.id === null) {
            this.addBase(this.sim).subscribe(
                res => {
                    this.updateSuccess(res);
                }
            );
        } else {
            this.editBase(this.sim).subscribe(
                res => {
                    this.updateSuccess(res);
                }
            );
        }
    }

    private updateSuccess(res: any) {
        if (res.status) {
            this.router.navigate(['/sim']);
        }
    }

    public addBase(sim: Sim): Observable<any> {
        const url = Util.getUri(apiV1Url) + `sim/create`;
        return this.http.post<Sim>(url, sim)
            .pipe(
                catchError(this.handleError('addBase', sim))
            );
    }

    public editBase(sim: Sim): Observable<any> {
        const url = Util.getUri(apiV1Url) + `sim/update`;
        return this.http.put<Sim>(url, sim)
            .pipe(
                catchError(this.handleError('editBase', sim))
            );
    }
}
