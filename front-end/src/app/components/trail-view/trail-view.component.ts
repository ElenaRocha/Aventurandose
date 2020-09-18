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
  logado: any;
  uId: any;

  constructor(
    private trailsService: TrailsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit() {
    this.logado = localStorage.getItem('role');
    this.uId = localStorage.getItem('userId');

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
