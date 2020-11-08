import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { Usuario } from './usuario.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  usuario: Usuario = new Usuario();
  recordarme = false;
  


  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {

    if ( localStorage.getItem('email')) {

     this.usuario.email = localStorage.getItem('email');
     this.recordarme = true;

    }

  }


  login(form: NgForm) {

    if (form.invalid) { return; }

    // utilizamos sweetAlert2 para las alertas en formularios! es necesio hacer las instalaciones necesarias 
    Swal.fire({
      icon: 'info',
      text: 'Espere por favor',
      allowOutsideClick: false
    });
    Swal.showLoading();

    // console.log(this.usuario);
    // console.log(form);

    this.auth.entrarLogin(this.usuario)
      .subscribe(resp => {

        // console.log(resp);
        //  Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'Exito al autenticar',
          text: 'autenticacion exitosa'
        });

        //  con esta pregunta recordamos usuario del login y el  ngOnInit() lo leera solo en el login, registro solo co esta pregunta basta
        if (this.recordarme) {

          localStorage.setItem('email', this.usuario.email);

        }
        // con esta linea de codigo se redirecciona luego de realizar las validaciones
        this.router.navigateByUrl('/Productos');


      }, (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message
        });

      });
  }

}
