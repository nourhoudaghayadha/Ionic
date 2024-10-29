import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), // Initialize Ionic
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // Initialize Firebase first
    AngularFireAuthModule, // Auth module
    AngularFireStorageModule, // Storage module
    HttpClientModule // Enable HTTP communication
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy } // Manage routing strategy
  ],
  bootstrap: [AppComponent] // Bootstrap the root component
})
export class AppModule {}
