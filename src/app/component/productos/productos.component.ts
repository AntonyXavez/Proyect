import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../providers/productos.service';
import { CategoriasService } from '../../providers/categorias.service';
import { Category } from '../../interface/category';
import { Product } from '../../interface/product';
import { ToastrService } from 'ngx-toastr';
import { SortingCompaniesPipe } from '../../pipe/sorting-companies.pipe';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  listaOrdenada: Product[] = [];
  valor: string = '';
  path: string[] = ['producto'];
  order: number = 1; // 1 asc, -1 desc;
  reverse: boolean = false;
  order1: string = 'name';

  productsList: Product[] = [];
  categoriesList: any[] = [];

  constructor(
    private _pS: ProductosService,
    private _cS: CategoriasService,
    private toastr: ToastrService
   ){

     this._pS.getProducts().subscribe( data =>{
        this.productsList = data;
     })

     this._cS.getCategories().subscribe( data =>{
       this.categoriesList = data;
     })

    }

  ngOnInit() { }

  setValor( idx: string ){

    this.valor = idx;

  }

  deleteProduct(){

    this._pS.deleteProduct( this.valor )
            .subscribe(
              respuesta =>{
                if (respuesta) {
                    console.error(respuesta)
                } else {
                  delete this.productsList[this.valor];
                  this.toastr.error('Producto Eliminado', 'Operación Realizada Correctamente', {
                    timeOut: 4000,
                    positionClass: 'toast-top-center',
                  });
                }
              }
            )

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
