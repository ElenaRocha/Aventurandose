import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Cathegory } from '../../models/cathegory.model';
import { Comment } from '../../models/comment.model';
import { Tag } from '../../models/tag.model';
import { Trail } from '../../models/trail.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-api-weather',
  templateUrl: './api-weather.component.html',
  styleUrls: ['./api-weather.component.css'],
})
export class ApiWeatherComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
