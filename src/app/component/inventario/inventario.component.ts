import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../providers/categorias.service';
import { ProductosService } from '../../providers/productos.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  category: any = {
    name: '',
    id: 0,
    description: ''
  };
  name: any;
  path: string[] = ['nombre'];
  productosList: any[] = [];
  productosListK: any[] = [];
  categoriesList: any[] = [];
  categoriesListK: any[] = [];

  constructor(
    private _cS: CategoriasService,
    private _pS: ProductosService
  ){
    this._cS.getCategories().subscribe( data =>{
      this.categoriesList = data;
      this.categoriesListK = this.convertKeysCategory(this.categoriesList);
    });

    this._pS.getProducts().subscribe( data =>{
      this.productosList = data;
      this.productosListK = this.convertKeysProduct(this.productosList);
    });

  }

  ngOnInit() {  }

  getsum( keyCat, productosList: any ): number {

    let sum = 0;

    for (let i = 0; i < productosList.length; i++) {
        let prod = productosList[i];
        if (prod.product.categoryId == keyCat) {
            sum +=1;
        }
    }

    return sum;

  }

  convertKeysProduct(value: any): any{

    let keys: any [] = [];
    for (let key in value) {
        keys.push({ key: key, product: value[key]});
    }
    return keys;
  }

  convertKeysCategory(value: any): any{

    let keys: any [] = [];
    for (let key in value) {
        keys.push({ key: key, category: value[key]});
    }
    return keys;
  }

  ShowCate(){

    if (this.category.id == '-1') {
      this.name = null;
      return;
    }

    for (let category of this.categoriesListK) {
      if ( this.category.id == category.key  ) {
        this.name = category.category.name;
      }
    }

  }

}
