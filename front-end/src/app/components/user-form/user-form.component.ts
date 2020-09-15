import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { Cathegory } from '../../models/cathegory.model';
import { Comment } from '../../models/comment.model';
import { Tag } from '../../models/tag.model';
import { Trail } from '../../models/trail.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  /*onclick en el formulario
  
  recogerUser(): void {
    const existe = this.userService.comprobarUser(
      this.usuario.user,
      this.usuario.password
    );
    if (existe) {
      localStorage.setItem('logado', 'activo');
      this.router.navigate(['/info']);
    } else {
      alert('El usuario o la contraseña es incorrecta');
    }
  } 
  
  logout(): void {
    localStorage.removeItem('logado');
    this.router.navigate(['/']);
  }*/
}
