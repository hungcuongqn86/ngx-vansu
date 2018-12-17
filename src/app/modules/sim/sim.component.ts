import {Component, OnInit, ViewEncapsulation, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {SimService} from '../../services/sim.service';
import {Sim} from '../../models/Sim';
import {AgencyService} from '../../services/agency.service';
import {Agency} from '../../models/Agency';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {UploaderService} from '../../uploader.service';

@Component({
    selector: 'app-sim',
    templateUrl: './sim.component.html',
    styleUrls: ['./sim.component.css'],
    providers: [UploaderService],
    encapsulation: ViewEncapsulation.None
})

export class SimComponent implements OnInit {
    sim: Sim;
    Sims: Sim[];
    agencies: Agency[];
    totalItems = 0;
    modalRef: BsModalRef;
    agency = 0;
    excelFileName = '';
    excelFilePath = '';
    errorMessage = [];

    constructor(private uploaderService: UploaderService, public simService: SimService, public agencyService: AgencyService,
                private router: Router, private modalService: BsModalService) {

    }

    ngOnInit() {
        this.searchSims();
    }

    pageChanged(event: any): void {
        this.simService.search.page = event.page;
        this.searchSims();
    }

    public addSim() {
        this.simService.sim.id = null;
        this.router.navigate(['/msim/sim/add']);
    }

    public editSim(id) {
        this.router.navigate([`/msim/sim/${id}`]);
    }

    public deleteSim() {
        if (this.sim) {
            this.sim.is_deleted = 1;
            this.simService.editSim(this.sim)
                .subscribe(res => {
                    this.searchSims();
                });
        }
    }

    public searchSims() {
        this.simService.getSims(this.simService.search)
            .subscribe(sims => {
                this.Sims = sims.data.data;
                this.totalItems = sims.data.total;
            });
    }

    public getAgencies() {
        const search = {page_size: 1000, page: 1};
        this.agencyService.getAgencies(search)
            .subscribe(agencies => {
                this.agencies = agencies.data.data;
                /*if (this.agencies.length > 0) {
                    this.agency = this.agencies[0].id;
                }*/
            });
    }

    openModal(template: TemplateRef<any>, sim) {
        this.sim = sim;
        this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    confirm(): void {
        this.deleteSim();
        this.modalRef.hide();
    }

    decline(): void {
        this.modalRef.hide();
    }

    public uploadExc(input: HTMLInputElement, template: TemplateRef<any>) {
        const file = input.files[0];
        if (file) {
            this.uploaderService.upload(file).subscribe(
                res => {
                    if (res.status) {
                        this.excelFileName = res.name;
                        this.excelFilePath = decodeURIComponent(res.data.url);
                        if (this.modalService.getModalsCount() < 1) {
                            setTimeout(() => {
                                this.getAgencies();
                                this.errorMessage = [];
                                this.modalRef = this.modalService.show(template, {class: 'modal-md'});
                            }, 2000);
                        }
                    }
                    input.value = null;
                }
            );
        }
    }

    public confirmImport() {
        this.importSim();
    }

    public importSim() {
        this.simService.showLoading(true);
        this.simService.importSim(this.excelFilePath, this.agency)
            .subscribe(res => {
                if (res.status) {
                    this.modalRef.hide();
                    this.searchSims();
                    this.simService.showLoading(false);
                } else {
                    this.errorMessage = res.data;
                    this.simService.showLoading(false);
                }
            });
    }
}
