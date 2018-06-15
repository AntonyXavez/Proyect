import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../providers/productos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-buscardor',
  templateUrl: './buscardor.component.html',
  styleUrls: ['./buscardor.component.css']
})
export class BuscardorComponent implements OnInit {

  productoslista: any[] = [];
  listaOrdenada: any[] = [];
  termino: any = '';
  combo: any[] = [];
  comboPrecio: any[] = [];
  combito: any;
  combitoPrecio: any;
  hizoBusqueda: boolean = false;
  path: string[] = ['categoria'];
  order: number = 1; // 1 asc, -1 desc;
  order1: string = 'nombre';
  reverse: boolean = false
  mostrarPrecio: boolean = false;

  constructor(
    private _pS: ProductosService,
    private activatedRoute:ActivatedRoute,
    private toastr: ToastrService
  ) {

    this.combo.push( 'Nombre' )
    this.combo.push( 'Precio' )
    this.combo.push( 'Id' )
    this.comboPrecio.push( '>=' )
    this.comboPrecio.push( '<=' )
    this.comboPrecio.push( '=' )
    this.comboPrecio.push( '>' )
    this.comboPrecio.push( '<' )

    this._pS.cargarDataProductos();

  }

  ngOnInit(): void{

    this.listaOrdenada = this.productoslista;

  }

  buscar(){

    if (this.combito == null) {
      this.toastr.error('Debe de elegir una opción', 'ERROR', {
        timeOut: 4000,
        positionClass: 'toast-top-right'
      });
      return;
    }

    if (this.combitoPrecio == null) {
      this.toastr.error('Debe de elegir una opción de precio', 'ERROR', {
        timeOut: 4000,
        positionClass: 'toast-top-right'
      });
      return;
    }

    if (this.termino == '') {
      this.toastr.error('Debe de ingresar texto hacer una busqueda', 'ERROR', {
        timeOut: 4000,
        positionClass: 'toast-top-right'
      });
      return;
    }

    if (this.combito == 'Nombre') {
      this.productoslista = this._pS.buscadorProductosNombre( this.termino );
    } else if (this.combito == 'Precio') {
      if (this.combitoPrecio == '>=') {
        this.productoslista = this._pS.buscadorProductosPrecioMayorIgual( this.termino );
      } else if (this.combitoPrecio == '<=') {
          this.productoslista = this._pS.buscadorProductosPrecioMenorIgual( this.termino );
      } else if (this.combitoPrecio == '=') {
          this.productoslista = this._pS.buscadorProductosPrecioIgual( this.termino );
      } else if (this.combitoPrecio == '>') {
          this.productoslista = this._pS.buscadorProductosPrecioMayor( this.termino );
      } else if (this.combitoPrecio == '<') {
        this.productoslista = this._pS.buscadorProductosPrecioMenor( this.termino );
      }
    } else if (this.combito == 'Id') {
      this.productoslista = this._pS.buscadorProductosId( this.termino );
    }

    this.hizoBusqueda = true;

  }

  sortTable(prop: string) {
     this.path = prop.split('.')
     this.order = this.order * (-1); // change order
     if (this.order1 === prop) {
       this.reverse = !this.reverse;
     }

     this.order1 = prop;
     return false; // do not reload
   }

   MostrarPre(){
     if (this.combito == 'Precio') {
         this.mostrarPrecio = true;
     } else {
       this.mostrarPrecio = false;
     }
   }

}
