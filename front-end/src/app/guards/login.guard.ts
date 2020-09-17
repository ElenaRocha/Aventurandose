import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { TrailsService } from '../services/trails.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private usersService: UsersService,
    private trailsService: TrailsService,
    private router: Router
  ) {}

  canActivate() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['usuarios/registrate']);
      return false;
    }

    return true;
  }
}
