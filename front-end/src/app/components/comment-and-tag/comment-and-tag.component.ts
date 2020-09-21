import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TrailsService } from 'src/app/services/trails.service';

@Component({
  selector: 'app-comment-and-tag',
  templateUrl: './comment-and-tag.component.html',
  styleUrls: ['./comment-and-tag.component.css'],
})
export class CommentAndTagComponent implements OnInit {
  formulario: FormGroup;
  arrTags: Array<any>;
  user_id: any;
  trail_id: any;

  constructor(
    private router: Router,
    private trailsService: TrailsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.formulario = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      this.user_id = params.user_id;
      this.trail_id = params.trail_id;
    });
    this.trailsService
      .getAllTags()
      .then((result) => {
        this.arrTags = result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getData(): void {
    this.activatedRoute.params.subscribe(async (params) => {
      this.user_id = params.user_id;
      this.trail_id = params.trail_id;

      this.trailsService.addComment(
        this.formulario.value,
        this.trail_id,
        this.user_id
      );
      (document.querySelector('.alert-comment') as HTMLElement).style.display =
        'block';
      (document.querySelector('.form-control') as HTMLElement).innerHTML = '';
    });
  }

  getTag($event) {
    this.activatedRoute.params.subscribe(async (params) => {
      this.trail_id = params.trail_id;

      await this.trailsService.addTag(this.trail_id, $event.target.value);

      (document.querySelector('.alert-tag') as HTMLElement).style.display =
        'block';
    });
  }
}
