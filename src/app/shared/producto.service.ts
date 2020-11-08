import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModeloDatos } from './modelo-datos.model';
import { environment } from 'src/environments/environment';
import { ProductosItems } from './productos-items.models';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  orderItems: Array<ProductosItems> = [];
  formaDatos: ModeloDatos = new ModeloDatos();

  constructor(private http: HttpClient) { }

  guardarDatos() {

    // OrderItem parametro de base datos
    const body = {
      ...this.formaDatos,
      OrderItem: this.orderItems
    };

    return this.http.post(environment.apiURL + '/TP_DATOS_BASICOS', body);
  }

  getDatosList(){

    return this.http.get(environment.apiURL + '/TP_DATOS_BASICOS').toPromise();

  }

  getDatosByID(id: number): any {

    return this.http.get(environment.apiURL + '/TP_DATOS_BASICOS/' + id ).toPromise();

  }

  deleteDatos(id: number): any {

    return this.http.delete(environment.apiURL + '/TP_DATOS_BASICOS/' + id ).toPromise();

  }


}
