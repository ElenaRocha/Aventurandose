import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrailsService } from 'src/app/services/trails.service';

@Component({
  selector: 'app-trail-view',
  templateUrl: './trail-view.component.html',
  styleUrls: ['./trail-view.component.css'],
})
export class TrailViewComponent implements OnInit {
  pId: string;
  trail: any;
  userId: any;

  constructor(
    private trailsService: TrailsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      const pId = params.id;

      this.trailsService
        .getTrailById(pId)
        .then((result) => {
          this.trail = result;
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
}
