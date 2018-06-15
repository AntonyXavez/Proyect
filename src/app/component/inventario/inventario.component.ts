import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../providers/categorias.service';
import { ProductosService } from '../../providers/productos.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  categoria: any = {
    nombre: '',
    id: 0,
    descripcion: ''
  };
  nombre: any;
  path: string[] = ['nombre'];

  constructor(
    private _cS: CategoriasService,
    private _pS: ProductosService
  ){
    this._cS.cargarData();
    this._pS.cargarDataProductos();
  }

  ngOnInit() {
  }

  getsum( nombre, productosList: any ): number {

    let sum = 0;
    let nuevalist: any[];

    for (let i = 0; i < productosList.length; i++) {
        let prod = productosList[i];
        if (prod.categoria.nombre == nombre) {
            sum +=1;
        }
    }

    return sum;

  }

  MostrarCate(){

    if (this.categoria.id == '-1') {
      this.nombre = null;
      return;
    }

    for (let categoria of this._cS.categoriasList) {
      if ( this.categoria.id == categoria.id  ) {
        this.nombre = categoria.nombre;
      }
    }

  }

}
