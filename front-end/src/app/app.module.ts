import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTrailsComponent } from './components/all-trails/all-trails.component';
import { FilteredTrailsComponent } from './components/filtered-trails/filtered-trails.component';
import { TrailViewComponent } from './components/trail-view/trail-view.component';
import { TrailFormComponent } from './components/trail-form/trail-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { CommentAndTagComponent } from './components/comment-and-tag/comment-and-tag.component';
import { ApiWeatherComponent } from './components/api-weather/api-weather.component';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';
import { UpdateUserFormComponent } from './components/update-user-form/update-user-form.component';
import { UpdateTrailFormComponent } from './components/update-trail-form/update-trail-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    AllTrailsComponent,
    FilteredTrailsComponent,
    TrailViewComponent,
    TrailFormComponent,
    UserFormComponent,
    CommentAndTagComponent,
    ApiWeatherComponent,
    GoogleMapsComponent,
    UpdateUserFormComponent,
    UpdateTrailFormComponent,
    LoginFormComponent,
    CapitalizePipe,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
