import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Producto } from '../interface/producto';

@Injectable()
export class ProductosService {

  productosList: any[] = [];

  constructor( private http: Http ) {

  }

  cargarDataProductos(){

    if ( localStorage.getItem( 'ProductosList' ) ) {

      this.productosList = JSON.parse( localStorage.getItem( 'ProductosList' ) );

    }

  }

  actualizarDataCategoria(){

    localStorage.setItem( 'ProductosList', JSON.stringify( this.productosList ) );

  }

  nuevoproducto( producto: Producto ){

    this.productosList.push( producto );
    localStorage.setItem( 'ProductosList', JSON.stringify( this.productosList ) );

  }

  actualizarProducto( producto: Producto, idx: number ){

    for (let producto1 of this.productosList) {
        if (producto1.id == producto.id) {
            producto1 = producto;
             this.productosList.splice( idx, 1 );
             this.productosList.push( producto1 );
             break;
        }
    }

    localStorage.setItem( 'ProductosList', JSON.stringify( this.productosList ) );
    this.actualizarDataCategoria();
    return;

  }

  borrarProducto( idx: number ){

    this.productosList.splice( idx, 1 );
    this.actualizarDataCategoria();

  }

  buscadorProductosNombre( termino: any ){

    this.cargarDataProductos()
    let products: Producto[] = [];
    termino = termino.toLowerCase();

    for (let producto of this.productosList) {

      let nombre = producto.nombre.toLowerCase();

      if ( nombre.indexOf( termino ) >= 0 ) {
          products.push( producto );
      }

    }

    return products;

  }

  buscadorProductosPrecioMayorIgual( termino: any ){

    this.cargarDataProductos()
    let products: Producto[] = [];

    for (let producto of this.productosList) {

      let precio = producto.precio;

      if ( precio >= termino) {
          products.push( producto );
      }

    }

    return products;

  }

  buscadorProductosPrecioMenorIgual( termino: any ){

    this.cargarDataProductos()
    let products: Producto[] = [];

    for (let producto of this.productosList) {

      let precio = producto.precio;

      if ( precio <= termino) {
          products.push( producto );
      }

    }

    return products;

  }

  buscadorProductosPrecioIgual( termino: any ){

    this.cargarDataProductos()
    let products: Producto[] = [];

    for (let producto of this.productosList) {

      let precio = producto.precio;

      if ( precio == termino) {
          products.push( producto );
      }

    }

    return products;

  }

  buscadorProductosPrecioMayor( termino: any ){

    this.cargarDataProductos()
    let products: Producto[] = [];

    for (let producto of this.productosList) {

      let precio = producto.precio;

      if ( precio > termino) {
          products.push( producto );
      }

    }

    return products;

  }

  buscadorProductosPrecioMenor( termino: any ){

    this.cargarDataProductos()
    let products: Producto[] = [];

    for (let producto of this.productosList) {

      let precio = producto.precio;

      if ( precio < termino) {
          products.push( producto );
      }

    }

    return products;

  }

  buscadorProductosId( termino: any ){

    this.cargarDataProductos()
    let products: Producto[] = [];
    termino = termino;

    for (let producto of this.productosList) {

      let id = producto.id;

      if ( id == termino ) {
          products.push( producto );
      }

    }

    return products;

  }

}
