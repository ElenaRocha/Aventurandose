import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrailsService } from 'src/app/services/trails.service';

@Component({
  selector: 'app-filtered-trails',
  templateUrl: './filtered-trails.component.html',
  styleUrls: ['./filtered-trails.component.css'],
})
export class FilteredTrailsComponent implements OnInit {
  arrTrails: Array<any>;
  pCathegory: string;
  cname: string;

  constructor(
    private trailsService: TrailsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      this.cname = params.cname;
      const pCathegory = params.cathegory;

      this.trailsService
        .getTrailByCathegory(pCathegory)
        .then((result) => {
          this.arrTrails = result;
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
}
