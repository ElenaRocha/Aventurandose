import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-trail-form',
  templateUrl: './trail-form.component.html',
  styleUrls: ['./trail-form.component.css'],
})
export class TrailFormComponent implements OnInit {
  form: FormGroup;
  constructor() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      length: new FormControl('', [Validators.required]),
      slope: new FormControl('', [Validators.required]),
      //circular
      province: new FormControl('', [Validators.required]),
      //coordenadas
      transport: new FormControl('', [Validators.required]),
      //categorías
    });
  }

  ngOnInit(): void {}
}
