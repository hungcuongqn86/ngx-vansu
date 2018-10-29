import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HttpErrorHandler, HandleError} from '../../http-error-handler.service';
import {Util} from '../../helper/lib';
import {apiV1Url} from '../../const';
import {Router} from '@angular/router';
import {Partner} from '../../models/Partner';

@Injectable()
export class PartnerService {
    static instance: PartnerService;
    private handleError: HandleError;
    public search = {key: '', page_size: 10, page: 1};
    public partner: Partner;

    constructor(private router: Router, private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('PartnerService');
        if (!this.partner) {
            this.reset();
        }
        return PartnerService.instance = PartnerService.instance || this;
    }

    reset() {
        this.partner = {
            id: null
            , email: null
            , token: null
            , options: null
            , arr_options: {
                payment_syntax: '',
                trial_period: '15',
                paid_period: '30'
            }
            , is_deleted: 0
            , created_at: ''
            , updated_at: ''
        };
    }

    getPartners(search): Observable<any> {
        const url = Util.getUri(apiV1Url) + `partner/search`;
        let params = new HttpParams();
        Object.keys(search).map((key) => {
            params = params.append(key, search[key]);
        });
        return this.http.get<any>(url, {params: params})
            .pipe(
                catchError(this.handleError('getPartners', []))
            );
    }

    getPartner(id): Observable<any> {
        const url = Util.getUri(apiV1Url) + `partner/detail/${id}`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getPartner', []))
            );
    }

    updatePartner() {
        this.partner.options = JSON.stringify(this.partner.arr_options);
        if (this.partner.id === null) {
            this.addPartner(this.partner).subscribe(
                res => {
                    this.updateSuccess(res);
                }
            );
        } else {
            this.editPartner(this.partner).subscribe(
                res => {
                    this.updateSuccess(res);
                }
            );
        }
    }

    private updateSuccess(res: any) {
        if (res.status) {
            this.router.navigate(['/partner']);
        }
    }

    public addPartner(partner: Partner): Observable<any> {
        const url = Util.getUri(apiV1Url) + `partner/create`;
        return this.http.post<Partner>(url, partner)
            .pipe(
                catchError(this.handleError('addPartner', partner))
            );
    }

    public editPartner(partner: Partner): Observable<any> {
        const url = Util.getUri(apiV1Url) + `partner/update`;
        return this.http.put<Partner>(url, partner)
            .pipe(
                catchError(this.handleError('editPartner', partner))
            );
    }
}
