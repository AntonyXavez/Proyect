import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

//routes
import { APP_ROUTING } from './app.routing';

//services
import { CategoriasService } from '../app/providers/categorias.service';
import { ProductosService } from '../app/providers/productos.service';

//pipe
import { KeysPipe } from './pipe/keys.pipe';

import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { CategoriasComponent } from './component/categorias/categorias.component';
import { CategoriaComponent } from './component/categoria/categoria.component';
import { ProductosComponent } from './component/productos/productos.component';
import { ProductoComponent } from './component/producto/producto.component';
import { BuscardorComponent } from './component/buscardor/buscardor.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { InventarioComponent } from './component/inventario/inventario.component';
import { SortingCompaniesPipe } from './pipe/sorting-companies.pipe';
import { SortingCategoryPipe } from './pipe/sorting-category.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoriasComponent,
    KeysPipe,
    CategoriaComponent,
    ProductosComponent,
    ProductoComponent,
    BuscardorComponent,
    NavbarComponent,
    InventarioComponent,
    SortingCompaniesPipe,
    SortingCategoryPipe
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
    CategoriasService,
    ProductosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
