import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  formulario: FormGroup;

  constructor(private router: Router, private usersService: UsersService) {
    this.formulario = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  async getData() {
    const respuesta = await this.usersService.userLogin(this.formulario.value);
    localStorage.setItem('token', respuesta.token);
    localStorage.setItem('role', respuesta.role);
    localStorage.setItem('userId', respuesta.userId);
    /*const token = localStorage.getItem('token');
    if (!token) {
      (document.querySelector('.alert') as HTMLElement).style.display = 'block';
    }*/
    this.router.navigate(['/rutas/listado']);
  }
}
