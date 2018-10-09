import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HttpErrorHandler, HandleError} from '../../http-error-handler.service';
import {Util} from '../../helper/lib';
import {apiV1Url} from '../../const';
import {Router} from '@angular/router';

export interface Agency {
    id: number;
    code: string;
    name: string;
    discount: string;
    is_deleted: number;
    created_at: string;
    updated_at: string;
}

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
            , is_deleted: 0
            , created_at: ''
            , updated_at: ''
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

    getBase(id): Observable<any> {
        const url = Util.getUri(apiV1Url) + `sim/detail/${id}`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getBase', []))
            );
    }

    updateBase() {
        if (this.agency.id === null) {
            this.addBase(this.agency).subscribe(
                res => {
                    this.updateSuccess(res);
                }
            );
        } else {
            this.editBase(this.agency).subscribe(
                res => {
                    this.updateSuccess(res);
                }
            );
        }
    }

    private updateSuccess(res: any) {
        if (res.status) {
            this.router.navigate(['/agency']);
        }
    }

    public addBase(sim: Agency): Observable<any> {
        const url = Util.getUri(apiV1Url) + `agency/create`;
        return this.http.post<Agency>(url, sim)
            .pipe(
                catchError(this.handleError('addBase', sim))
            );
    }

    public editBase(sim: Agency): Observable<any> {
        const url = Util.getUri(apiV1Url) + `agency/update`;
        return this.http.put<Agency>(url, sim)
            .pipe(
                catchError(this.handleError('editBase', sim))
            );
    }
}
