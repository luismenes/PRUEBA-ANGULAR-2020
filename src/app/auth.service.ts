import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { Usuario } from './shared/login/usuario.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1';
  private apikey = 'AIzaSyA_0D3zPbXqccb4sZB28lX_sLji9obAZ-0';

  userToken: string;


  // NOTA: el Apikey se encuentra en la autenticacion de firebase, en el engranaje


  // documentacion firebase

  // crear nuevo usuario sign up email
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // login( iniciar sesion) sign in email
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient) {

    this.leerToken();
   }

  salirLogin(){

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('expira');

  }

  entrarLogin( usuario: Usuario ){

    // NOTA: como quiero las mismas propiedades de Usuario se remmplaza por el operador spred

    const authData = {
      // email: usuario.email,
      // password: usuario.password,
      ...usuario,
      returnSecureToken: true

    };

    return this.http.post(
      `${ this.url }/accounts:signInWithPassword?key=${ this.apikey }`, authData )
      .pipe(
        map( resp => {
          console.log('Entro el mapa de RXJS');
          this.guardarToken(resp ['idToken']);
          NavbarComponent.activarSession.next();
          return resp;
        })
      );

  }


//  con este metodo lograremos el registro de usuarios en firebase
  nuevoUsuario( usuario: Usuario){

    const authData = {
      // email: usuario.email,
      // password: usuario.password, NOTA: como quiero las mismas propiedades de Usuario se remmplaza por el operador spred
      ...usuario,
      returnSecureToken: true

    };

    return this.http.post(
      `${ this.url }/accounts:signUp?key=${ this.apikey }`,authData )
      .pipe(
        map( resp => {
          console.log('Entro el mapa de RXJS');
          this.guardarToken(resp ['idToken']);
          return resp;
        })
      );

  }

  //  metodo para guardar token por el parametro idToken  
  private guardarToken( idToken: string ){

    this.userToken = idToken;
    sessionStorage.setItem('token', idToken);
    // el token se guarda en el sessionStorage
    // llamamos este metodo en el nuevoUsuario y entrarLogin por medio del pipe para transformar la Data

    let hoy = new Date();
    hoy.setSeconds( 3600 );

    sessionStorage.setItem( 'expira', hoy.getTime().toString() );


  }

  leerToken(){
    // NOTA: este metodo lo colocamos al inicio para saber si el token existe
    // si el token existe lo leemos del sessionStorage, sino lo dejamos vacio
    if (sessionStorage.getItem('token')) {
      this.userToken = sessionStorage.getItem('token');
    } else  {

      this.userToken = '';
      
    }

    return this.userToken;
  }

  // este metodo se utiliza despues de generar el guards --ng g g-- el cual nos 
  // ayudara aprotejer la pagina que aprecera al estar logeado, lo llammamos es servicio guards

  estaAutenticado(): boolean {

    if (this.userToken.length < 2) {

      return false;

    }

    const expira = Number(sessionStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {

      return true;

    } else {

      return false;

    }
  }
}
