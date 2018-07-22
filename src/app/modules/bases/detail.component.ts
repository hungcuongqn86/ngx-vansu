import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BasesService} from './bases.service';

@Component({
    selector: 'app-base-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {
    constructor(private router: Router, private route: ActivatedRoute
        , public basesService: BasesService) {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.basesService.sim.id = params['id'];
            }
        });
    }

    ngOnInit() {
        if (this.basesService.sim.id !== null) {
            this.basesService.getBase(this.basesService.sim.id)
                .subscribe(sim => {
                    this.basesService.sim = sim.data.sim;
                });
        } else {
            this.basesService.reset();
        }
    }

    public backlist() {
        this.router.navigate(['/sim']);
    }
}
