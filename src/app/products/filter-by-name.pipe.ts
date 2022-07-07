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
      // return products.filter(p=> p.productName.toLowerCase().indexOf(searchItem.toLowerCase()) !== -1);
      return products.filter(p=> p.productName.toLowerCase().match(searchItem.toLowerCase()));
      // return products.filter(p=> p.productName.toLowerCase().startsWith(searchItem.toLowerCase()));


    }
    
  }

}
