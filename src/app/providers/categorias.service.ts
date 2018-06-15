import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Categoria } from '../interface/categoria';

@Injectable()
export class CategoriasService {

  public categoriasList: Categoria[] = [];

  constructor( private http: Http ){

  }

  cargarData(){

    if ( localStorage.getItem( 'LitaCategorias' ) ) {

      this.categoriasList = JSON.parse( localStorage.getItem( 'LitaCategorias' ) );

    }

  }

  actualizarDataCategoria(){

    localStorage.setItem( 'LitaCategorias', JSON.stringify( this.categoriasList ) );

  }

  nuevaCategoria( categoria: Categoria ){

    this.categoriasList.push( categoria );
    localStorage.setItem( 'LitaCategorias', JSON.stringify( this.categoriasList ) );

  }

  actualizarCategoria( categoria: Categoria, idx: number ){

    for (let categoria1 of this.categoriasList) {
        if (categoria1.id == categoria.id) {
            categoria1 = categoria;
            this.categoriasList.splice( idx, 1 );
            this.categoriasList.push( categoria1 );
            break;
        }
    }

    localStorage.setItem( 'LitaCategorias', JSON.stringify( this.categoriasList ) );
    this.actualizarDataCategoria();
    return;

  }

  borrarCategoria( idx: number ){

    this.categoriasList.splice( idx, 1 );
    this.actualizarDataCategoria();

  }

}
