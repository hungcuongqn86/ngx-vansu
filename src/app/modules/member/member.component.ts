import {Component, OnInit, ViewEncapsulation, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {Member, MemberService} from './member.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
    selector: 'app-member',
    templateUrl: './member.component.html',
    styleUrls: ['./member.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class MemberComponent implements OnInit {
    member: Member;
    members: Member[];
    totalItems = 0;
    modalRef: BsModalRef;

    constructor(public memberService: MemberService,
                private router: Router, private modalService: BsModalService) {

    }

    ngOnInit() {
        this.searchMember();
    }

    pageChanged(event: any): void {
        this.memberService.search.page = event.page;
        this.searchMember();
    }

    public addMember() {
        this.memberService.member.id = null;
        this.router.navigate(['/member/add']);
    }

    public editMember(id) {
        this.router.navigate([`/member/${id}`]);
    }

    public deleteBase() {
        if (this.member) {
            this.member.is_deleted = 1;
            this.memberService.editMember(this.member)
                .subscribe(res => {
                    this.searchMember();
                });
        }
    }

    public searchMember() {
        this.memberService.getMembers(this.memberService.search)
            .subscribe(members => {
                this.members = members.data.data;
                this.totalItems = members.data.total;
            });
    }

    openModal(template: TemplateRef<any>, member) {
        this.member = member;
        this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    confirm(): void {
        this.deleteBase();
        this.modalRef.hide();
    }

    decline(): void {
        this.modalRef.hide();
    }
}
