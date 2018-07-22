import {Component, OnInit, ViewEncapsulation, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {Sim, BasesService} from './bases.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {UploaderService} from '../../uploader.service';

@Component({
    selector: 'app-bases',
    templateUrl: './bases.component.html',
    styleUrls: ['./bases.component.css'],
    providers: [UploaderService],
    encapsulation: ViewEncapsulation.None
})

export class BasesComponent implements OnInit {
    sim: Sim;
    Sims: Sim[];
    totalItems = 0;
    modalRef: BsModalRef;

    constructor(private uploaderService: UploaderService, public basesService: BasesService,
                private router: Router, private modalService: BsModalService) {

    }

    ngOnInit() {
        this.searchBases();
    }

    pageChanged(event: any): void {
        this.basesService.search.page = event.page;
        this.searchBases();
    }

    public addBase() {
        this.basesService.sim.id = null;
        this.router.navigate(['/sim/add']);
    }

    public editBase(id) {
        this.router.navigate([`/sim/${id}`]);
    }

    public deleteBase() {
        if (this.sim) {
            this.sim.is_deleted = 1;
            this.basesService.editBase(this.sim)
                .subscribe(res => {
                    this.searchBases();
                });
        }
    }

    public searchBases() {
        this.basesService.getBases(this.basesService.search)
            .subscribe(bases => {
                this.Sims = bases.data.data;
                this.totalItems = bases.data.total;
            });
    }

    openModal(template: TemplateRef<any>, sim) {
        this.sim = sim;
        this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    confirm(): void {
        this.deleteBase();
        this.modalRef.hide();
    }

    decline(): void {
        this.modalRef.hide();
    }

    public importExcel(input: HTMLInputElement) {
        const file = input.files[0];
        if (file) {
            this.uploaderService.upload(file).subscribe(
                res => {
                    if (res.status) {
                        this.searchBases();
                    }
                    input.value = null;
                }
            );
        }
    }
}
