import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../providers/categorias.service';
import { ProductosService } from '../../providers/productos.service';
import { Category } from '../../interface/category';
import { Product } from '../../interface/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
  listOrdered: Category[] = [];
  valor: number = 0;
  path: string[] = ['categoria'];
  order: number = 1; // 1 asc, -1 desc;
  order1: string = 'nombre';
  reverse: boolean = false;

  constructor(
    private _cS: CategoriasService,
    private _pS: ProductosService,
     private toastr: ToastrService ){


       this._cS.getCategories().subscribe( data =>{
         if (data != null) {
           this.categories = data;
         }
       });


  }

  ngOnInit(): void {

     this.listOrdered = this._cS.categoriesList;

  }

  setValor( idx: number ){

      this.valor = idx;

    }

  borrarCategoria(){

    // let idx = this.valor;
    // let categoria: Categoria = this._cS.categoriasList[idx];
    //
    // for (let producto of this._pS.productosList) {
    //   if (producto.categoria.nombre == categoria.nombre) {
    //     this.toastr.error('Esta Categoria esta en Uso, Elimine los productos que tiene esta categoria', 'ERROR', {
    //       timeOut: 4000,
    //       positionClass: 'toast-top-right'
    //     });
    //     return;
    //   }
    // }
    //
    // this._cS.borrarCategoria( idx );
    // this._cS.cargarData();
    // this.toastr.success('Operación Realizada Correctamente', 'Categoria Eliminada', {
    //   timeOut: 4000,
    //   positionClass: 'toast-top-right'
    // });

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
