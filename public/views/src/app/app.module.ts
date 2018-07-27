import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from './app-routes';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../services/api.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
