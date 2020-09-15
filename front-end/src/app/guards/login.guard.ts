import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
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
    const estado = localStorage.getItem('logado');
    if (estado !== 'activo') {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
