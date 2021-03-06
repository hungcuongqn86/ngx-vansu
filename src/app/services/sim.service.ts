import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HttpErrorHandler, HandleError} from '../http-error-handler.service';
import {Util} from '../helper/lib';
import {apiV1Url} from '../const';
import {LoadingService} from '../loading.service';

import {Router} from '@angular/router';
import {Sim} from '../models/Sim';

@Injectable()
export class SimService {
    static instance: SimService;
    private handleError: HandleError;
    public search = {partten: '', start_price: 0, end_price: null, page_size: 10, page: 1};
    public sim: Sim;

    constructor(private router: Router, private http: HttpClient, httpErrorHandler: HttpErrorHandler,
                private loadingService: LoadingService) {
        this.handleError = httpErrorHandler.createHandleError('SimService');
        if (!this.sim) {
            this.reset();
        }
        return SimService.instance = SimService.instance || this;
    }

    showLoading(value: boolean) {
        this.loadingService.setLoading(value);
    }

    reset() {
        this.sim = {
            id: null
            , sim_number: null
            , sim_number_standard: null
            , price: null
            , sale_price: null
            , telco_id: ''
            , agency_id: ''
            , agency_discount: ''
            , is_deleted: 0
            , sold_at: ''
            , created_at: ''
            , updated_at: ''
            , order: []
            , category: null
            , agency: null
        };
    }

    getSims(search): Observable<any> {
        const url = Util.getUri(apiV1Url) + `sim/search`;
        let params = new HttpParams();
        Object.keys(search).map((key) => {
            params = params.append(key, search[key]);
        });
        return this.http.get<any>(url, {params: params})
            .pipe(
                catchError(this.handleError('getSims', []))
            );
    }

    getSim(id): Observable<any> {
        const url = Util.getUri(apiV1Url) + `sim/detail/${id}`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getSim', []))
            );
    }

    getTelco(): Observable<any> {
        const url = Util.getUri(apiV1Url) + `sim/telco`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getTelco', []))
            );
    }

    importSim(filepath, agency) {
        const url = Util.getUri(apiV1Url) + `sim/import`;
        const param = {filepath: filepath, agency: agency};
        return this.http.post<any>(url, param)
            .pipe(
                catchError(this.handleError('importSim', param))
            );
    }

    updateSim() {
        if (this.sim.id === null) {
            this.addSim(this.sim).subscribe(
                res => {
                    this.updateSuccess(res);
                }
            );
        } else {
            this.editSim(this.sim).subscribe(
                res => {
                    this.updateSuccess(res);
                }
            );
        }
    }

    private updateSuccess(res: any) {
        if (res.status) {
            this.router.navigate(['/msim/sim']);
        }
    }

    public addSim(sim: Sim): Observable<any> {
        const url = Util.getUri(apiV1Url) + `sim/create`;
        return this.http.post<Sim>(url, sim)
            .pipe(
                catchError(this.handleError('addSim', sim))
            );
    }

    public editSim(sim: Sim): Observable<any> {
        const url = Util.getUri(apiV1Url) + `sim/update`;
        return this.http.put<Sim>(url, sim)
            .pipe(
                catchError(this.handleError('editSim', sim))
            );
    }
}
