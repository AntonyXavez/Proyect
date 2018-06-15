import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/component/home/home.component';
import { CategoriasComponent } from '../app/component/categorias/categorias.component';
import { CategoriaComponent } from '../app/component/categoria/categoria.component';
import { ProductosComponent } from '../app/component/productos/productos.component';
import { ProductoComponent } from '../app/component/producto/producto.component';
import { BuscardorComponent } from '../app/component/buscardor/buscardor.component';
import { InventarioComponent } from '../app/component/inventario/inventario.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'categoria/:id', component: CategoriaComponent },
  { path: 'producto/:id', component: ProductoComponent },
  { path: 'buscar', component: BuscardorComponent },
  { path: 'inventario', component: InventarioComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
