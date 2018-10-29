import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HttpErrorHandler, HandleError} from '../http-error-handler.service';
import {Util} from '../helper/lib';
import {apiV1Url} from '../const';
import {Router} from '@angular/router';
import {Agency} from '../models/Agency';

@Injectable()
export class AgencyService {
    static instance: AgencyService;
    private handleError: HandleError;
    public search = {key: '', page_size: 10, page: 1};
    public agency: Agency;

    constructor(private router: Router, private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('AgencyService');
        if (!this.agency) {
            this.reset();
        }
        return AgencyService.instance = AgencyService.instance || this;
    }

    reset() {
        this.agency = {
            id: null
            , code: null
            , name: null
            , discount: null
            , status: 1
            , is_deleted: 0
            , created_at: ''
            , updated_at: ''
            , changeDiscount: 0
        };
    }

    getAgencies(search): Observable<any> {
        const url = Util.getUri(apiV1Url) + `sim/agency/search`;
        let params = new HttpParams();
        Object.keys(search).map((key) => {
            params = params.append(key, search[key]);
        });
        return this.http.get<any>(url, {params: params})
            .pipe(
                catchError(this.handleError('getAgencies', []))
            );
    }

    getAgency(id): Observable<any> {
        const url = Util.getUri(apiV1Url) + `sim/agency/detail/${id}`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getAgency', []))
            );
    }


    getDiscount(): Observable<any> {
        const url = Util.getUri(apiV1Url) + `sim/agency/discount`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getDiscount', []))
            );
    }

    updateAgency() {
        if (this.agency.id === null) {
            this.addAgency(this.agency).subscribe(
                res => {
                    this.updateSuccess(res);
                }
            );
        } else {
            this.editAgency(this.agency).subscribe(
                res => {
                    this.updateSuccess(res);
                }
            );
        }
    }

    private updateSuccess(res: any) {
        if (res.status) {
            this.router.navigate(['/msim/agency']);
        }
    }

    public addAgency(agency: Agency): Observable<any> {
        const url = Util.getUri(apiV1Url) + `sim/agency/create`;
        return this.http.post<Agency>(url, agency)
            .pipe(
                catchError(this.handleError('addAgency', agency))
            );
    }

    public editAgency(agency: Agency): Observable<any> {
        const url = Util.getUri(apiV1Url) + `sim/agency/update`;
        return this.http.put<Agency>(url, agency)
            .pipe(
                catchError(this.handleError('editAgency', agency))
            );
    }
}
