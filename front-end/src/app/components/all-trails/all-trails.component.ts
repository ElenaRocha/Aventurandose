import { Component, OnInit } from '@angular/core';
import { TrailsService } from 'src/app/services/trails.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-trails',
  templateUrl: './all-trails.component.html',
  styleUrls: ['./all-trails.component.css'],
})
export class AllTrailsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
