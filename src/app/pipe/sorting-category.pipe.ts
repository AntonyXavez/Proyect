import { Pipe, PipeTransform } from '@angular/core';
import { Categoria } from '../interface/categoria';

@Pipe({
  name: 'sortingCategory'
})
export class SortingCategoryPipe implements PipeTransform {

  transform(categorias: Categoria[], path: string[], order: number = 1): Categoria[] {

   // Check if is not null
   if (!categorias || !path || !order) return categorias;

   return categorias.sort((a: Categoria, b: Categoria) => {
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
