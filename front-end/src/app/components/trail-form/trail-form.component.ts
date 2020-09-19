import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TrailsService } from 'src/app/services/trails.service';

@Component({
  selector: 'app-trail-form',
  templateUrl: './trail-form.component.html',
  styleUrls: ['./trail-form.component.css'],
})
export class TrailFormComponent implements OnInit {
  formulario: FormGroup;
  arrCathegories: Array<any>;

  constructor(private router: Router, private trailsService: TrailsService) {
    this.formulario = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      length: new FormControl('', [Validators.required]),
      slope: new FormControl('', [Validators.required]),
      circular: new FormControl(''),
      province: new FormControl('', [Validators.required]),
      latitude: new FormControl('', [Validators.required]),
      longitude: new FormControl('', [Validators.required]),
      transport: new FormControl('', [Validators.required]),
    });
  }

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

  getData(): void {
    const modifiedForm = {
      name: this.formulario.value.name,
      descriptiontime: this.formulario.value.description,
      length: this.formulario.value.length,
      slope: this.formulario.value.slope,
      circular: this.formulario.value.circular,
      province: this.formulario.value.province,
      location: [
        this.formulario.value.latitude,
        this.formulario.value.longitude,
      ],
      transport: this.formulario.value.transport,
    };

    this.trailsService.registerTrail(modifiedForm);
    this.router.navigate(['/rutas/listado']);
  }
}
