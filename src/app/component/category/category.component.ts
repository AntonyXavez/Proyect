import { Component, OnInit } from '@angular/core';
import { Category } from '../../interface/category';
import { Product } from '../../interface/product';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriasService } from '../../providers/categorias.service';
import { ProductosService } from '../../providers/productos.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  category: Category = {
    id: 0,
    name: '',
    description: ''
  }

  idx: any;

  constructor(
    private _cS: CategoriasService,
    private _pS: ProductosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ){

    this.activatedRoute.params.subscribe( parametros =>{
      this.idx = parametros['id']
      if ( this.idx != 'nuevo' ) {
        this._cS.getCategory( this.idx )
                .subscribe( category => this.category = category );
      }
    })

    this.isCategoryExist(0);

  }

  ngOnInit() {
  }

  setCategory(){

    if ( this.idx != 'nuevo' ) {
        this._cS.updateCategory( this.category, this.idx );
        this.toastr.success('Operación Realizada Correctamente', 'Categoria Actualizada', {
         timeOut: 4000,
         positionClass: 'toast-top-right'
        });
        this.isCategoryExist( this.idx );
        this.router.navigate( ['/categorias'] )
        return;
    } else {
      this.category.id = Math.floor(Math.random() * 1000000);
      this._cS.setCategory( this.category ).subscribe(category => console.log(category));
      this.router.navigate( ['/categorias'] )
      this.toastr.success('Operación Realizada Correctamente', 'Categoria Agregada', {
        timeOut: 4000,
        positionClass: 'toast-top-right'
      });
    }

  }

  isCategoryExist( id: any ){

    let productList : Product[] = []

    console.log("Llego a is category")
    this._pS.getProducts().subscribe(products => {
      console.log(products)
      productList = products
      });

    for(let product of productList){
      console.log(product);
    }

  }

}
