import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../providers/categorias.service';
import { ProductosService } from '../../providers/productos.service';
import { Categoria } from '../../interface/categoria';
import { Producto } from '../../interface/producto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categorias: Categoria[] = [];
  listaOrdenada: Categoria[] = [];
  valor: number = 0;
  path: string[] = ['categoria'];
  order: number = 1; // 1 asc, -1 desc;
  order1: string = 'nombre';
  reverse: boolean = false;

  constructor(
    private _cS: CategoriasService,
    private _pS: ProductosService,
     private toastr: ToastrService ){

    this._cS.cargarData();

  }

  ngOnInit(): void {

    this.listaOrdenada = this._cS.categoriasList;

  }

  setValor( idx: number ){

      this.valor = idx;

    }

  borrarCategoria(){

    let idx = this.valor;
    let categoria: Categoria = this._cS.categoriasList[idx];

    for (let producto of this._pS.productosList) {
      if (producto.categoria.nombre == categoria.nombre) {
        this.toastr.error('Esta Categoria esta en Uso, Elimine los productos que tiene esta categoria', 'ERROR', {
          timeOut: 4000,
          positionClass: 'toast-top-right'
        });
        return;
      }
    }

    this._cS.borrarCategoria( idx );
    this._cS.cargarData();
    this.toastr.success('Operación Realizada Correctamente', 'Categoria Eliminada', {
      timeOut: 4000,
      positionClass: 'toast-top-right'
    });

  }

  sortTable(prop: string) {
     this.path = prop.split('.')
     this.order = this.order * (-1); // change order
     if (this.order1 === prop) {
       this.reverse = !this.reverse;
     }

     this.order1 = prop;
     return false; // do not reload
   }

}
