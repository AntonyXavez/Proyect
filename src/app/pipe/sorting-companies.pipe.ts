import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../interface/producto';

@Pipe({
  name: 'sortingCompanies'
})
export class SortingCompaniesPipe implements PipeTransform {

  transform(productos: Producto[], path: string[], order: number = 1): Producto[] {

   // Check if is not null
   if (!productos || !path || !order) return productos;

   return productos.sort((a: Producto, b: Producto) => {
     // We go for each property followed by path
     path.forEach(property => {
       a = a[property];
       b = b[property];
     })

     // Order * (-1): We change our order
     return a > b ? order : order * (- 1);
   })
 }

}
