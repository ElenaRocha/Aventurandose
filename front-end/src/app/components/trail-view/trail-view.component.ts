import { Component, OnInit } from '@angular/core';
import { TrailsService } from 'src/app/services/trails.service';
import { Cathegory } from '../../models/cathegory.model';
import { Comment } from '../../models/comment.model';
import { Tag } from '../../models/tag.model';
import { Trail } from '../../models/trail.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-trail-view',
  templateUrl: './trail-view.component.html',
  styleUrls: ['./trail-view.component.css'],
})
export class TrailViewComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
