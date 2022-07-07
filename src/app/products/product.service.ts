import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import {  tap } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[];
  productChanges = new Subject<Product[]>();

   productUrl : string = 'http://localhost:3000/products';

  constructor(private http : HttpClient) { }

getProductList(){
  return this.http.get<Product[]>(this.productUrl);
}

getProductId(index: number){
  return this.http.get<Product>(this.productUrl +`/${index}`);

  }

postProduct(body: Product){

 return  this.http.post<Product>(this.productUrl, body);
 }

 updateProduct(index: number, product: Product){   
  return  this.http.put(this.productUrl +`/${index}`, product);
 }

 removeProduct(id: number){
   console.log(id)
   return this.http.delete(this.productUrl +`/${id}` );
 }
 

 getRecipes(){
  return this.products.slice(); 
}

 setRecipes(products: Product[]){
  this.products= products;
  this.productChanges.next(this.products);
}
 fetchRecipes(){
  return this.http.get<Product[]>(this.productUrl)
  .pipe(
  tap(products => { 
    this.setRecipes(products);
  })
  );
 }
}
