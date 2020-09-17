import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrailsService } from './services/trails.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  arrCathegories: Array<any>;

  constructor(private trailsService: TrailsService, private router: Router) {}

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
}
