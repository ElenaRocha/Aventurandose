import { Component, OnInit } from '@angular/core';
import { TrailsService } from '../../services/trails.service';
import { Cathegory } from '../../models/cathegory.model';

@Component({
  selector: 'app-all-trails',
  templateUrl: './all-trails.component.html',
  styleUrls: ['./all-trails.component.css'],
})
export class AllTrailsComponent implements OnInit {
  arrCathegories: Array<any>;

  constructor(private trailsService: TrailsService) {}

  ngOnInit() {
    this.trailsService
      .getAllCathegories()
      .then((result) => {
        this.arrCathegories = result;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
