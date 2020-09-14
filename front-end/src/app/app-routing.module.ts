import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllTrailsComponent } from './components/all-trails/all-trails.component';
import { ApiWeatherComponent } from './components/api-weather/api-weather.component'; //???
import { CommentAndTagComponent } from './components/comment-and-tag/comment-and-tag.component';
import { FilteredTrailsComponent } from './components/filtered-trails/filtered-trails.component';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component'; //???
import { TrailFormComponent } from './components/trail-form/trail-form.component';
import { TrailViewComponent } from './components/trail-view/trail-view.component';
import { UserFormComponent } from './components/user-form/user-form.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: './rutas/listado' },
  { path: 'rutas/listado', component: AllTrailsComponent },
  {
    path: 'rutas/listado/categorías/:cathegory',
    component: FilteredTrailsComponent,
  },
  { path: 'rutas/listado/etiquetas/:tag', component: FilteredTrailsComponent },
  { path: 'rutas/listado/ruta/:id', component: TrailViewComponent },
  { path: 'rutas/formulario', component: TrailFormComponent },
  { path: 'rutas/formulario/:id', component: TrailFormComponent },
  {
    path: 'rutas/categorizar/:trail_id/:cathegory_id',
    component: TrailFormComponent,
  },
  {
    path: 'rutas/comentar/:user_id/:trail_id/:tag_id',
    component: CommentAndTagComponent,
  },
  { path: 'usuarios/darse-de-alta', component: UserFormComponent },
  { path: 'usuraios/modifircar-perfil/:id', component: UserFormComponent },
  { path: 'usuraios/darse-de-baja/:id', component: UserFormComponent },
  { path: 'usuarios/entrar', component: UserFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
