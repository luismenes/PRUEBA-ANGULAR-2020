import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth.service';
import { Usuario } from '../login/usuario.models';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuario: Usuario = new Usuario();
  sesionIniciada = false;
  userToken: string;
  static activarSession: Subject<boolean> = new Subject();

  constructor(private auth: AuthService,
              private router: Router) {

    NavbarComponent.activarSession.subscribe(resp => {

      this.sesionActiva();

    });

    this.sesionActiva();

  }

  ngOnInit() {


  }

  sesionActiva() {


    if (sessionStorage.getItem('token')) {

      this.sesionIniciada = true;


    } else {

      this.sesionIniciada = false;
      this.router.navigateByUrl('/login');


    }

  }


  salir() {

    Swal.fire({
      icon: 'question',
      title: '¿Esta Seguro?',
      text: 'Esta seguro que quiere cerrar sesión?',
      allowOutsideClick: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Cerrar!'
    }).then(resp => {

      if (resp.value) {

        Swal.fire(
          'Cerrada!',
          'Sesión Finalizada.',
          'success'
        );

        this.auth.salirLogin();
        this.auth.leerToken();
        this.sesionActiva();


      }
    });

  }

}
