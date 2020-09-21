import { TagContentType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrailsService } from 'src/app/services/trails.service';

@Component({
  selector: 'app-filtered-trail-tags',
  templateUrl: './filtered-trail-tags.component.html',
  styleUrls: ['./filtered-trail-tags.component.css'],
})
export class FilteredTrailTagsComponent implements OnInit {
  arrTrails: Array<any>;
  tname: string;

  constructor(
    private trailsService: TrailsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      this.tname = params.tag;

      this.trailsService
        .getAllTags()
        .then((result) => {
          result.forEach((tag) => {
            if (tag.name.toUpperCase() === this.tname.toUpperCase()) {
              this.arrTrails = tag.trails;
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
}
