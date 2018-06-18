import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Category } from '../interface/category';

@Injectable()
export class CategoriasService {

  urlCategories: string = 'https://store-3a51c.firebaseio.com/Category'
  urlCategory: string = 'https://store-3a51c.firebaseio.com/Category/'
  public categoriesList: Category[] = [];

  constructor(
                private http: Http
              ){

                this.getCategories().subscribe( data =>{
                  this.categoriesList = data;
                })

  }


  getCategories(){

    let headers = new Headers({
      'Content-Type':'application/json'
    });

    let url =`${ this.urlCategories }.json`

    return this.http.get( url , { headers } )
                    .map( res => res.json() );

  }

  setCategory( category : Category ){

    let body = JSON.stringify( category );
    let url =`${ this.urlCategories }.json`
    let headers = new Headers({
      'Content-Type':'application/json'
    });

    return this.http.post(url, body, {headers}).map(res => res.json())
  }

  getCategory( key$:string ){

    let url = `${ this.urlCategory }/${ key$ }.json`;
    return this.http.get( url )
                    .map( res => res.json());

  }

  updateCategory( category: Category, key$: string ){

    let body = JSON.stringify( category );
    let headers = new Headers({
      'Content-Type':'application/json'
    });

    let url = `${ this.urlCategory }/${ key$ }.json`;

    return this.http.put( url, body, { headers } )
                    .map( res =>{
                      return res.json();
                    })


  }

}
