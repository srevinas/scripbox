import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product.model';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

  transform(products: Product[], searchItem): Product[] {

    if(!searchItem || !products){
      return products;
    }
    else{
     return products.filter(p=> p.productName.toLowerCase().match(searchItem.toLowerCase()));
    

    }
    
  }

}
