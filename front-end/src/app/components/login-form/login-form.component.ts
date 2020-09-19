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
  mensaje: any;

  constructor(private router: Router, private usersService: UsersService) {
    this.formulario = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  async getData() {
    const respuesta = await this.usersService.userLogin(this.formulario.value);
    console.log('el tipo: ', typeof respuesta.message);
    console.log('string: ', respuesta.message);
    const mensaje = respuesta.message;
    if (mensaje !== 'Usuario o contraseña incorrectos') {
      localStorage.setItem('token', respuesta.token);
      localStorage.setItem('role', respuesta.role);
      localStorage.setItem('userId', respuesta.userId);

      this.router.navigate(['/rutas/listado']);
    }
  }
}
