import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HttpErrorHandler, HandleError} from '../http-error-handler.service';
import {Util} from '../helper/lib';
import {apiV1Url} from '../const';
import {Router} from '@angular/router';
import {Member} from '../models/Member';

@Injectable()
export class MemberService {
    static instance: MemberService;
    private handleError: HandleError;
    public search = {key: '', page_size: 10, page: 1};
    public member: Member;

    constructor(private router: Router, private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('MemberService');
        if (!this.member) {
            this.reset();
        }
        return MemberService.instance = MemberService.instance || this;
    }

    reset() {
        this.member = {
            id: null
            , device_id: null
            , phone_number: null
            , birth_day: null
            , birth_time: null
            , status: null
            , type: null
            , active_at: null
            , expired_on: null
            , token: null
            , is_deleted: 0
            , created_at: ''
            , updated_at: ''
        };
    }

    getMembers(search): Observable<any> {
        const url = Util.getUri(apiV1Url) + `calendar/member/search`;
        let params = new HttpParams();
        Object.keys(search).map((key) => {
            params = params.append(key, search[key]);
        });
        return this.http.get<any>(url, {params: params})
            .pipe(
                catchError(this.handleError('getMembers', []))
            );
    }

    getMember(id): Observable<any> {
        const url = Util.getUri(apiV1Url) + `calendar/member/detail/${id}`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getMember', []))
            );
    }

    updateMember() {
        if (this.member.id === null) {
            this.addMember(this.member).subscribe(
                res => {
                    this.updateSuccess(res);
                }
            );
        } else {
            this.editMember(this.member).subscribe(
                res => {
                    this.updateSuccess(res);
                }
            );
        }
    }

    private updateSuccess(res: any) {
        if (res.status) {
            this.router.navigate(['/member']);
        }
    }

    public addMember(member: Member): Observable<any> {
        const url = Util.getUri(apiV1Url) + `calendar/member/create`;
        return this.http.post<Member>(url, member)
            .pipe(
                catchError(this.handleError('addAgency', member))
            );
    }

    public editMember(member: Member): Observable<any> {
        const url = Util.getUri(apiV1Url) + `calendar/member/update`;
        return this.http.put<Member>(url, member)
            .pipe(
                catchError(this.handleError('editAgency', member))
            );
    }
}
