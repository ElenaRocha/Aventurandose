import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { TrailsService } from 'src/app/services/trails.service';
import { Cathegory } from '../../models/cathegory.model';
import { Comment } from '../../models/comment.model';
import { Tag } from '../../models/tag.model';
import { Trail } from '../../models/trail.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-comment-and-tag',
  templateUrl: './comment-and-tag.component.html',
  styleUrls: ['./comment-and-tag.component.css'],
})
export class CommentAndTagComponent implements OnInit {
  formulario: FormGroup;

  constructor(private router: Router, private trailsService: TrailsService) {
    this.formulario = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    //getAllTags
  }

  getData(): void {
    //this.trailsService.addComment(this.formulario.value);
    this.router.navigate(['/rutas/listado']);
  }

  //addTag
}
