import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HttpErrorHandler, HandleError} from '../../http-error-handler.service';
import {apiV1Url} from '../../const';

export interface Customer {
    id: number;
    code: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    note: string;
    delete_f: number;
}

@Injectable()
export class CustomersService {
    static instance: CustomersService;
    private handleError: HandleError;
    public search = {key: '', page_size: 10, page: 1};

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('CustomersService');
        return CustomersService.instance = CustomersService.instance || this;
    }

    getCustomers(search): Observable<any> {
        const url = apiV1Url + `customers`;
        let params = new HttpParams();
        Object.keys(search).map((key) => {
            params = params.append(key, search[key]);
        });
        return this.http.get<any>(url, {params: params})
            .pipe(
                catchError(this.handleError('getCustomers', []))
            );
    }

    getCustomer(id): Observable<any> {
        const url = apiV1Url + `customer/${id}`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getCustomer', []))
            );
    }

    addCustomer(base: Customer): Observable<any> {
        const url = apiV1Url + `customer/add`;
        return this.http.post<Customer>(url, base)
            .pipe(
                catchError(this.handleError('addCustomer', base))
            );
    }

    editCustomer(base: Customer): Observable<any> {
        const url = apiV1Url + `customer/${base.id}`;
        return this.http.put<Customer>(url, base)
            .pipe(
                catchError(this.handleError('editCustomer', base))
            );
    }
}
