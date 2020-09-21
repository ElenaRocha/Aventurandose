import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TrailsService } from '../../services/trails.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  arrCathegories: Array<any>;
  formulario: FormGroup;
  logado: any;
  userId: any;

  constructor(private trailsService: TrailsService, private router: Router) {
    this.formulario = new FormGroup({
      search: new FormControl(''),
    });
  }

  ngOnInit() {
    this.logado = localStorage.getItem('role');
    this.userId = localStorage.getItem('userId');

    this.trailsService
      .getAllCathegories()
      .then((result) => {
        this.arrCathegories = result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCathegory($event) {
    let selectedOptions = $event.target['options'];
    let selectedIndex = selectedOptions.selectedIndex;
    let selectElementText = selectedOptions[selectedIndex].text.toLowerCase();

    this.router.navigate([
      '/categorias',
      selectElementText,
      $event.target.value,
    ]);

    $event.target.value = '';
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    this.router.navigate(['/']);
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }
  getData() {
    this.router.navigate(['/etiquetas', this.formulario.value.search]);
  }
}
