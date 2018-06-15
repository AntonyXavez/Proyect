import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Producto } from '../interface/producto';

@Injectable()
export class ProductosService {

  productsList: any[] = [];
  urlGetProducts: string = 'https://store-3a51c.firebaseio.com/Inventory.json'

  constructor( private http: Http ) {

    this.getProducts().subscribe( data=>{
       this.productsList = data;
       console.log(this.listaOrdenada)
    })

  }

  getProducts(){

    let headers = new Headers({
      'Content-Type':'application/json'
    });

    return this.http.get( this.urlGetProducts, { headers } )
                    .map( res => res.json() );

  }

  buscadorProductosNombre( termino: any ){

    let products: Producto[] = [];
    termino = termino.toLowerCase();

    for (let producto of this.productsList) {

      let nombre = producto.nombre.toLowerCase();

      if ( nombre.indexOf( termino ) >= 0 ) {
          products.push( producto );
      }

    }

    return products;

  }

  buscadorProductosPrecioMayorIgual( termino: any ){

    let products: Producto[] = [];

    for (let producto of this.productsList) {

      let precio = producto.precio;

      if ( precio >= termino) {
          products.push( producto );
      }

    }

    return products;

  }

  buscadorProductosPrecioMenorIgual( termino: any ){

    let products: Producto[] = [];

    for (let producto of this.productsList) {

      let precio = producto.precio;

      if ( precio <= termino) {
          products.push( producto );
      }

    }

    return products;

  }

  buscadorProductosPrecioIgual( termino: any ){

    let products: Producto[] = [];

    for (let producto of this.productsList) {

      let precio = producto.precio;

      if ( precio == termino) {
          products.push( producto );
      }

    }

    return products;

  }

  buscadorProductosPrecioMayor( termino: any ){

    let products: Producto[] = [];

    for (let producto of this.productsList) {

      let precio = producto.precio;

      if ( precio > termino) {
          products.push( producto );
      }

    }

    return products;

  }

  buscadorProductosPrecioMenor( termino: any ){

    let products: Producto[] = [];

    for (let producto of this.productsList) {

      let precio = producto.precio;

      if ( precio < termino) {
          products.push( producto );
      }

    }

    return products;

  }

  buscadorProductosId( termino: any ){

    let products: Producto[] = [];
    termino = termino;

    for (let producto of this.productsList) {

      let id = producto.id;

      if ( id == termino ) {
          products.push( producto );
      }

    }

    return products;

  }

}
