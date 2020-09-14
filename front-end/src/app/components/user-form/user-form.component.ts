import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  updatedUser: any;
  deletedUser: any;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute
  ) {
    this.updatedUser = {};
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params) => {
      const idUser = params.iduser;
      this.updatedUser = await this.usersService.getUserById(idUser); // método para obtener usuario por id
      console.log(this.updatedUser);
    });

    this.activatedRoute.params.subscribe(async (params) => {
      const idUser = params.iduser;
      this.deletedUser = await this.usersService.unsuscribe(idUser);
    }); //????????
  }

  async createUser(pUser) {
    const newUser = await this.usersService.createUser(pUser);

    console.log(newUser);
    // en situaciones normales enrutariamos al listado this.router.navigate
  }

  async updateUser(pUser): Promise<any> {
    this.activatedRoute.params.subscribe(async (params) => {
      const idUser = params.iduser;
      const postActualizado = await this.usersService.updateUser(idUser, pUser);
      console.log(postActualizado);
    });
  } //???????
}
