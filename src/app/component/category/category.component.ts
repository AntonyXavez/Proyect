import { Component, OnInit } from '@angular/core';
import { Category } from '../../interface/category';
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

  }

  ngOnInit() {
  }

  setCategory(){

    if ( this.idx != 'nuevo' ) {
        // this._cS.actualizarCategoria( this.categoria, this.idx );
        // this.toastr.success('Operación Realizada Correctamente', 'Categoria Actualizada', {
        //   timeOut: 4000,
        //   positionClass: 'toast-top-right'
        // });
        // this.verificarCategoria( this.idx );
        // this.router.navigate( ['/categorias'] )
        return;
    } else {
      this.category.id = Math.floor(Math.random() * 1000000);
      console.log(this.category)
      this._cS.setCategory( this.category );
      this.router.navigate( ['/categorias'] )
      this.toastr.success('Operación Realizada Correctamente', 'Categoria Agregada', {
        timeOut: 4000,
        positionClass: 'toast-top-right'
      });
    }

  }

  // verificarCategoria( id: any ){
  //
  //   let listaProductos = JSON.parse(localStorage.getItem('ProductosList'))
  //
  //   for (let i = 0; i < listaProductos.length; i++) {
  //       listaProductos[i];
  //       if ( listaProductos[i].categoria.id == this.categoria.id ) {
  //         listaProductos[i].categoria.nombre = this.categoria.nombre;
  //         listaProductos[i].categoria.descripcion = this.categoria.descripcion;
  //         localStorage.setItem('ProductosList', JSON.stringify(listaProductos));
  //       }
  //   }
  //
  // }

}
