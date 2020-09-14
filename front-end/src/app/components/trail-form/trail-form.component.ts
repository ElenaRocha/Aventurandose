import { Component, OnInit } from '@angular/core';
import { TrailsService } from 'src/app/services/trails.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trail-form',
  templateUrl: './trail-form.component.html',
  styleUrls: ['./trail-form.component.css'],
})
export class TrailFormComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
