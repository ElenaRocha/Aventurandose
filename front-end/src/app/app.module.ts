import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppWeatherComponent } from './components/app-weather/app-weather.component';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';
import { TrailFormComponent } from './components/trail-form/trail-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { CommentAndTagComponent } from './components/comment-and-tag/comment-and-tag.component';
import { TrailViewComponent } from './components/trail-view/trail-view.component';
import { AllTrailsComponent } from './components/all-trails/all-trails.component';
import { FilteredTrailsComponent } from './components/filtered-trails/filtered-trails.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    AppWeatherComponent,
    GoogleMapsComponent,
    TrailFormComponent,
    UserFormComponent,
    CommentAndTagComponent,
    TrailViewComponent,
    AllTrailsComponent,
    FilteredTrailsComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
