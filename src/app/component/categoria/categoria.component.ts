import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../interface/categoria';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriasService } from '../../providers/categorias.service';
import { ProductosService } from '../../providers/productos.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categoria: Categoria = {
    id: 0,
    nombre: '',
    descripcion: ''
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
      if ( this.idx !== 'nuevo' ) {
        this.categoria = this._cS.categoriasList[this.idx]
      }
    })

  }

  ngOnInit() {
  }

  guardarCategoria(){

    if ( this.idx != 'nuevo' ) {
        this._cS.actualizarCategoria( this.categoria, this.idx );
        this.toastr.success('Operación Realizada Correctamente', 'Categoria Actualizada', {
          timeOut: 4000,
          positionClass: 'toast-top-right'
        });
        this.verificarCategoria( this.idx );
        this.router.navigate( ['/categorias'] )
        return;
    } else {
      this.categoria.id = Math.floor(Math.random() * 1000000);
      this._cS.nuevaCategoria( this.categoria );
      this.router.navigate( ['/categorias'] )
      this.toastr.success('Operación Realizada Correctamente', 'Categoria Agregada', {
        timeOut: 4000,
        positionClass: 'toast-top-right'
      });
    }

  }

  verificarCategoria( id: any ){

    let listaProductos = JSON.parse(localStorage.getItem('ProductosList'))

    for (let i = 0; i < listaProductos.length; i++) {
        listaProductos[i];
        if ( listaProductos[i].categoria.id == this.categoria.id ) {
          listaProductos[i].categoria.nombre = this.categoria.nombre;
          listaProductos[i].categoria.descripcion = this.categoria.descripcion;
          localStorage.setItem('ProductosList', JSON.stringify(listaProductos));
        }
    }

  }

}
