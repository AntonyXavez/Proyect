import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/component/home/home.component';
import { CategoriesComponent } from '../app/component/categories/categories.component';
import { CategoryComponent } from '../app/component/category/category.component';
import { ProductosComponent } from '../app/component/productos/productos.component';
import { ProductoComponent } from '../app/component/producto/producto.component';
import { SearchComponent } from '../app/component/search/search.component';
import { InventarioComponent } from '../app/component/inventario/inventario.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'categorias', component: CategoriesComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'categorias/categoria/:id', component: CategoryComponent },
  { path: 'producto/:id', component: ProductoComponent },
  { path: 'buscar', component: SearchComponent },
  { path: 'inventario', component: InventarioComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
