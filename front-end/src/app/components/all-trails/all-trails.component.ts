import { Component, OnInit } from '@angular/core';
import { TrailsService } from '../../services/trails.service';
import { Cathegory } from '../../models/cathegory.model';
import { Comment } from '../../models/comment.model';
import { Tag } from '../../models/tag.model';
import { Trail } from '../../models/trail.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-all-trails',
  templateUrl: './all-trails.component.html',
  styleUrls: ['./all-trails.component.css'],
})
export class AllTrailsComponent implements OnInit {
  arrCathegories: Array<any>;
  algo: string;

  constructor(private trailsService: TrailsService) {}

  async ngOnInit() {
    try {
      this.arrCathegories = await this.trailsService.getAllCathegories();
      console.log('arrray cat', typeof this.arrCathegories);
    } catch (error) {
      console.log(error);
    }

    this.algo = 'Hola desde el componente';

    /*this.trailsService
      .getAllTrails()
      .then((result) => {
        this.arrTrails = result;
      })
      .catch((err) => {
        console.log(err);
      });*/
  }
}
