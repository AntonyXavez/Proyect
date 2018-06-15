import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Category } from '../interface/category';

@Injectable()
export class CategoriasService {

  urlCategories: string = 'https://store-3a51c.firebaseio.com/category.json'
  public categoriesList: Category[] = [];

  constructor(
                private http: Http
              ){

                this.getCategory().subscribe( data =>{
                  this.categoriesList = data;
                })

  }


  getCategory(){

    return this.http.get( this.urlCategories )
                    .map( res => res.json() );

  }

}
