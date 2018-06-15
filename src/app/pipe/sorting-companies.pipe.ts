import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interface/product';

@Pipe({
  name: 'sortingCompanies'
})
export class SortingCompaniesPipe implements PipeTransform {

  transform(productos: Product[], path: string[], order: number = 1): Product[] {

   // Check if is not null
   if (!productos || !path || !order) return productos;

   return productos.sort((a: Product, b: Product) => {
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
