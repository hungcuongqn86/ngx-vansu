import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MemberService} from './member.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
    selector: 'app-base-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class DetailComponent implements OnInit {
    arrDiscount: string[];
    modalRef: BsModalRef;
    confirmUpdate = false;

    constructor(private router: Router, private route: ActivatedRoute, private modalService: BsModalService
        , public memberService: MemberService) {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.memberService.member.id = params['id'];
            }
        });
    }

    ngOnInit() {
        if (this.memberService.member.id !== null) {
            this.memberService.getMember(this.memberService.member.id)
                .subscribe(member => {
                    this.memberService.member = member.data.agency;
                });
        } else {
            this.memberService.reset();
        }
    }

    public backlist() {
        this.router.navigate(['/member']);
    }
}
