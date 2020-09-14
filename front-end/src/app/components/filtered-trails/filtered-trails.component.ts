import { Component, OnInit } from '@angular/core';
import { TrailsService } from 'src/app/services/trails.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtered-trails',
  templateUrl: './filtered-trails.component.html',
  styleUrls: ['./filtered-trails.component.css'],
})
export class FilteredTrailsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
