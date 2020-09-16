import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-api-weather',
  templateUrl: './api-weather.component.html',
  styleUrls: ['./api-weather.component.css'],
})
export class ApiWeatherComponent implements OnInit {
  weather: Array<any>;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      const pLat = '';
      const pLon = '';
      this.usersService
        .getWeather(pLat, pLon)
        .then((result) => {
          this.weather = result;
          console.log(this.weather);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
}
