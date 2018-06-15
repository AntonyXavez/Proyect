import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../interface/product';
import { Category } from '../../interface/category';
import { ProductosService } from '../../providers/productos.service';
import { CategoriasService } from '../../providers/categorias.service';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  product: Product = {
    id: 0,
    name: '',
    brand: '',
    description: '',
    price: null,
    stock: null,
    category: {
      id: 0,
      name: '',
      description: ''
    }
  }

  categories: Category[] = [];
  idx: any;
  path: string[] = ['nombre'];

  constructor(
    private _pS: ProductosService,
    private _cS: CategoriasService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ){

    this.activatedRoute.params.subscribe( parametros =>{
      this.idx = parametros['id']
      if ( this.idx !== 'nuevo' ) {

        this._pS.getProduct( this.idx )
                .subscribe( product => this.product = product );

      }
    })

  }

  ngOnInit() {
  }

  guardarProducto(){

    if (this.idx == 'nuevo') {
        this._pS.newProduct( this.product )
                .subscribe(
                  data =>{
                  this.router.navigate( ['/productos'] );
                  this.toastr.success('Producto Agregado', 'Operación Realizada Correctamente', {
                    timeOut: 4000,
                    positionClass: 'toast-top-right',
                  });
                },
                error=> console.error(error))
    } else {
      this._pS.updateProduct( this.product, this.idx )
              .subscribe(
                data =>{
                    this.router.navigate( ['/productos'] );
                    this.toastr.info('Producto Actualizado', 'Operación Realizada Correctamente', {
                      timeOut: 4000,
                      positionClass: 'toast-top-right',
                    });
                  },
                  error => console.log(error)
                )
    }

  }

}
