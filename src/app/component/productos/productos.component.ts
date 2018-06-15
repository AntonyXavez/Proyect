import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../providers/productos.service';
import { CategoriasService } from '../../providers/categorias.service';
import { Categoria } from '../../interface/categoria';
import { Producto } from '../../interface/producto';
import { ToastrService } from 'ngx-toastr';
import { SortingCompaniesPipe } from '../../pipe/sorting-companies.pipe';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[] =[];
  listaOrdenada: Producto[] = [];
  categorias: Categoria[] = [];
  valor: number = 0;
  path: string[] = ['producto'];
  order: number = 1; // 1 asc, -1 desc;
  reverse: boolean = false;
  order1: string = 'nombre';

  constructor(
    private _pS: ProductosService,
    private _cS: CategoriasService,
    private toastr: ToastrService
   ){  }

  ngOnInit(): void {

    this.listaOrdenada = this._pS.productsList;
    console.log(this.listaOrdenada)

  }

  setValor( idx: number ){

    this.valor = idx;

  }

  borrarProducto(){

    // let idx = this.valor;
    //
    // let producto: Producto = this._pS.productosList[idx];
    //
    // this._pS.borrarProducto( idx );
    // this._pS.cargarDataProductos();
    // this.toastr.success('Operación Realizada Correctamente', 'Categoria Eliminada', {
    //   timeOut: 4000,
    //   positionClass: 'toast-top-right'
    // });

  }

  sortTable(prop: string) {
    console.log(this.order)
     this.path = prop.split('.')
     this.order = this.order * (-1); // change order
     if (this.order1 === prop) {
       this.reverse = !this.reverse;
     }

     this.order1 = prop;
     return false; // do not reload
   }

}
