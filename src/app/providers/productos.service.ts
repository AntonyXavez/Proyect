import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Product } from '../interface/product';

@Injectable()
export class ProductosService {

  productsList: any[] = [];
  urlGetProducts: string = 'https://store-3a51c.firebaseio.com/Inventory.json';
  urlGetProduct: string = 'https://store-3a51c.firebaseio.com/Inventory/';

  constructor( private http: Http ) {

  }

  getProducts(){

    let headers = new Headers({
      'Content-Type':'application/json'
    });

    return this.http.get( this.urlGetProducts , { headers } )
                    .map( res => res.json() );

  }

  deleteProduct( Key$: string ){

    let url = `${ this.urlGetProduct }/${ Key$ }.json`;
    return this.http.delete( url )
                    .map( res => res.json() );

  }

  newProduct( product: Product ){

    let body = JSON.stringify( product );
    let headers = new Headers({
      'Content-Type':'application/json'
    });

    return this.http.post( this.urlGetProducts, body, { headers } )
                    .map( res =>{
                      return res.json();
                    })

  }

  getProduct( key$:string ){

    let url = `${ this.urlGetProduct }/${ key$ }.json`;
    return this.http.get( url )
                    .map( res => res.json());

  }

  updateProduct( product: Product, key$: string ){

    let body = JSON.stringify( product );
    let headers = new Headers({
      'Content-Type':'application/json'
    });

    let url = `${ this.urlGetProduct }/${ key$ }.json`;

    return this.http.put( url, body, { headers } )
                    .map( res =>{
                      return res.json();
                    })


  }

  buscadorProductosNombre( termino: any ){

    let products: Product[] = [];
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

    let products: Product[] = [];

    for (let producto of this.productsList) {

      let precio = producto.precio;

      if ( precio >= termino) {
          products.push( producto );
      }

    }

    return products;

  }

  buscadorProductosPrecioMenorIgual( termino: any ){

    let products: Product[] = [];

    for (let producto of this.productsList) {

      let precio = producto.precio;

      if ( precio <= termino) {
          products.push( producto );
      }

    }

    return products;

  }

  buscadorProductosPrecioIgual( termino: any ){

    let products: Product[] = [];

    for (let producto of this.productsList) {

      let precio = producto.precio;

      if ( precio == termino) {
          products.push( producto );
      }

    }

    return products;

  }

  buscadorProductosPrecioMayor( termino: any ){

    let products: Product[] = [];

    for (let producto of this.productsList) {

      let precio = producto.precio;

      if ( precio > termino) {
          products.push( producto );
      }

    }

    return products;

  }

  buscadorProductosPrecioMenor( termino: any ){

    let products: Product[] = [];

    for (let producto of this.productsList) {

      let precio = producto.precio;

      if ( precio < termino) {
          products.push( producto );
      }

    }

    return products;

  }

  buscadorProductosId( termino: any ){

    let products: Product[] = [];
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
