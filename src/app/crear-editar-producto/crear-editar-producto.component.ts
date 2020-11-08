import { Component, Inject, OnInit } from '@angular/core';
import { ProductoService } from '../shared/producto.service';
import { ModeloDatos } from '../shared/modelo-datos.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { ProductosItems } from '../shared/productos-items.models';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-crear-editar-producto',
  templateUrl: './crear-editar-producto.component.html',
  styleUrls: ['./crear-editar-producto.component.css']
})
export class CrearEditarProductoComponent implements OnInit {
  

  formData: ProductosItems;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialoRef: MatDialogRef<CrearEditarProductoComponent>,
    private service: ProductoService) { }

  ngOnInit(): void {

    // editamos los valores en la tabla

    if (this.data.productoItemIndex === null) {


      this.formData = {
        ProductoID: null,
        ID: this.data.ProductoID,
        CODIGO: null,
        DESCRIPCION: '',
        NOMBRE: '',
        REFERENCIA: null,
        UBICACION: '',
        SEDE_BODEGA: '',

      };


    }else {
    
      this.formData = Object.assign({}, this.service.orderItems[this.data.productoItemIndex]);
    }


  }

  onSubmit(form: NgForm) {

    if (this.data.productoItemIndex === null) {

      this.service.orderItems.push(form.value);
      this.dialoRef.close();

    } else {

      // cuando editamos un registerLocaleData, tomara los cambios

      this.service.orderItems[this.data.productoItemIndex] = form.value;
      this.dialoRef.close();
    }

  }

  
}

