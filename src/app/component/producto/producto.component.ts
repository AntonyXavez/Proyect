import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from '../../interface/producto';
import { Categoria } from '../../interface/categoria';
import { ProductosService } from '../../providers/productos.service';
import { CategoriasService } from '../../providers/categorias.service';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  producto: Producto = {
    id: 0,
    nombre: '',
    precio: 0,
    categoria: {
      id: 0,
      nombre: '',
      descripcion: ''
    }
  }

  categorias: Categoria[] = [];
  idx: any;
  path: string[] = ['nombre'];

  constructor(
    private _pS: ProductosService,
    private _cS: CategoriasService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ){

    this._cS.cargarData();

    this.activatedRoute.params.subscribe( parametros =>{
      this.idx = parametros['id']
      if ( this.idx !== 'nuevo' ) {

        this.producto = this._pS.productosList[this.idx]
      }
    })

  }

  ngOnInit() {
  }

  guardarProducto(){

    if (this.producto.categoria.id === 0) {
      this.toastr.error('Debe de elegir una categoria', 'ERROR', {
        timeOut: 4000,
        positionClass: 'toast-top-right'
      });
      return;
    }

    if (this.idx != 'nuevo') {
      this._pS.actualizarProducto( this.producto, this.idx );
      this.toastr.success('Operación Realizada Correctamente', 'Producto Actualizado', {
        timeOut: 4000,
        positionClass: 'toast-top-right'
      });
      this.router.navigate( ['/productos'] )
      return;
    } else {
      this.producto.id = Math.floor(Math.random() * 1000000)
      let listaCategorias: Categoria[] = this._cS.categoriasList;
      for (let categoria1 of listaCategorias) {
          if (categoria1.id == this.producto.categoria.id) {
              this.producto.categoria = categoria1;
          }
      }
      this._pS.nuevoproducto( this.producto )
        this.router.navigate( ['/productos'] )
        this.toastr.success('Operación Realizada Correctamente', 'Producto Agregado', {
          timeOut: 4000,
          positionClass: 'toast-top-right'
        });
    }


  }

}
