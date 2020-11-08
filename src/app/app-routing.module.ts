import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { LoginComponent } from './shared/login/login.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'Productos'},
  { path: 'Productos', component: ProductosComponent, canActivate: [ AuthGuard]},
  { path: 'login', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
