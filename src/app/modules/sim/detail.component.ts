import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SimService} from './sim.service';

@Component({
    selector: 'app-base-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {
    constructor(private router: Router, private route: ActivatedRoute
        , public simService: SimService) {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.simService.sim.id = params['id'];
            }
        });
    }

    ngOnInit() {
        if (this.simService.sim.id !== null) {
            this.simService.getSim(this.simService.sim.id)
                .subscribe(sim => {
                    this.simService.sim = sim.data.sim;
                });
        } else {
            this.simService.reset();
        }
    }

    public backlist() {
        this.router.navigate(['/sim']);
    }
}
