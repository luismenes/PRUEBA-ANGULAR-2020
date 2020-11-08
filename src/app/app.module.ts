import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// Firebase


import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosComponent } from './productos/productos.component';
import { LoginComponent } from './shared/login/login.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CrearEditarProductoComponent } from './crear-editar-producto/crear-editar-producto.component';

import { ToastrModule } from 'ngx-toastr';

// //Angular Material

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    LoginComponent,
    NavbarComponent,
    CrearEditarProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ToastrModule.forRoot()
    

  ],
  entryComponents: [CrearEditarProductoComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
