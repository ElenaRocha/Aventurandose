import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllTrailsComponent } from './components/all-trails/all-trails.component';
import { ApiWeatherComponent } from './components/api-weather/api-weather.component';
import { CommentAndTagComponent } from './components/comment-and-tag/comment-and-tag.component';
import { FilteredTrailsComponent } from './components/filtered-trails/filtered-trails.component';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';
import { TrailFormComponent } from './components/trail-form/trail-form.component';
import { TrailViewComponent } from './components/trail-view/trail-view.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UpdateUserFormComponent } from './components/update-user-form/update-user-form.component';
import { UpdateTrailFormComponent } from './components/update-trail-form/update-trail-form.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: './rutas/listado' },
  { path: 'rutas/listado', component: AllTrailsComponent },
  /*{ path: 'rutas/listado', component: ApiWeatherComponent },
  { path: 'rutas/listado', component: GoogleMapsComponent },*/
  {
    path: 'rutas/listado/categorias/:cathegory',
    component: FilteredTrailsComponent,
  },
  /*{
    path: 'rutas/listado/categorias/:cathegory',
    component: ApiWeatherComponent,
  },
  {
    path: 'rutas/listado/categorías/:cathegory',
    component: GoogleMapsComponent,
  },*/
  { path: 'rutas/listado/etiquetas/:tag', component: FilteredTrailsComponent },
  /*{ path: 'rutas/listado/etiquetas/:tag', component: ApiWeatherComponent },
  { path: 'rutas/listado/etiquetas/:tag', component: GoogleMapsComponent },*/
  { path: 'rutas/listado/ruta/:id', component: TrailViewComponent },
  {
    path: 'rutas/formulario',
    component: TrailFormComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'rutas/formulario/:id',
    component: UpdateTrailFormComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'rutas/comentar/:user_id/:trail_id/:tag_id',
    component: CommentAndTagComponent,
  },
  { path: 'usuarios/registrate', component: UserFormComponent },
  {
    path: 'usuraios/modifircar-perfil/:id',
    component: UpdateUserFormComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
