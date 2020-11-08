import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CrearEditarProductoComponent } from '../crear-editar-producto/crear-editar-producto.component';
import { ProductoService } from '../shared/producto.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  isValid = true;

  constructor(private dialog: MatDialog,
    private service: ProductoService,
    private activatedRouter: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {

    this.service.orderItems = [];
  }


  onDeleteOrderItem(orderItemID: number, i: number) {

    if (orderItemID === null) {

      this.service.formaDatos.DeletedOrderItemIDs += orderItemID + ',';

    }

    this.service.orderItems.splice(i, 1);


  }


  deleDato() {


    Swal.fire({
      title: 'Estas Seguro(a)?',
      text: 'Quiere ELIMINAR??',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.value) {

        Swal.fire(
          'Guardado!',
          'Eliminado con Exito.',
          'success'
        );
      }
    });

  }

  guardar() {
    Swal.fire({
      title: 'Estas Seguro(a)?',
      text: 'Quiere Guardar??',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar'
    }).then((result) => {
      if (result.value) {

       
        this.toastr.success('Guardado satisfactoriamente', 'Datos Basicos App');
        //this.router.navigate(['/orders']);
      }
    });

  }

  editarRegistro(productoItemIndex, ProductoID) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.data = { productoItemIndex, ProductoID };
    this.dialog.open(CrearEditarProductoComponent, dialogConfig).afterClosed().subscribe(res => {
      console.log(res);

    });
    // luego lo agrego en modulo en entryComponents[]
  }



}
