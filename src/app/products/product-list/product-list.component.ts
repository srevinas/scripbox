import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chart } from "chart.js"
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy{

   products : Product[] ;
   productsview : Product[] ;

   id: Number;
   subscription: Subscription;
   isSelected = false;
   IsManufacturer= true;
   isPrice = true;
   isQuantity= true;
   isDescription = true;
   Manufacturer= true;
   Price = true;
   Quantity= true;
   Description=  true;
   p: boolean = false;
   searchItem: string;
   productViewCount = [];
   counter =[];
   productNameViewed =[];
   view : boolean =false;
    myChart : Chart;
    ctx;
   
  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
        this.productService.fetchRecipes().subscribe();
        this.getproducts();
        this.subscription= this.productService.productChanges
         .subscribe(
           (products: Product[])=>{
             this.products= products;
         });
        
  } 
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
 
count=0;
  viewChart(id:number){
    this.count++;
    let productsview =[];
    
    this.productService.fetchRecipes().subscribe();

     this.productService.productChanges
    .subscribe(
      (products: Product[])=>{
        productsview =products
       this.counter = []
       this.productViewCount =[];
       this.productNameViewed =[];
        productsview.forEach(p=> 
        
         this.productViewCount.push(p.count))

         this.counter = this.productViewCount.sort((n1,n2) => n2 - n1).slice(0,id);
         let pCountValues = this.counter.filter((value,index)=> this.counter.indexOf(value)=== index);
       
         for(let i in pCountValues){
           for(let j in productsview){
             if(productsview[j].count == pCountValues[i] && this.productNameViewed.length < id){
               this.productNameViewed.push(productsview[j].productName);
             }
           }
         }
      
          if(this.count !==1){
            this.myChart.destroy();
          }
         this.ctx = document.getElementById('myChart') as HTMLCanvasElement;
        this.myChart = new Chart(this.ctx, {
           type: 'bar',
           data: {
               labels: this.productNameViewed,

               datasets: [{
                   label: '# Most Viewed Products',
                   data: this.counter,
                   backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1
                  
               }]
               
           },
           options: {
               scales: {
               

                   yAxes: [{
                       ticks: {
                           beginAtZero: true
                       }
                   }]
               }
           }
       });
    });
  }

  

  apply(){
    this.Manufacturer= this.IsManufacturer;
    this.Price = this.isPrice;
    this.Quantity= this.isQuantity;
    this.Description= this.isDescription;
    this.isSelected = false;
  }

  open(){
    this.isSelected = ! this.isSelected;
  }
  close(){
    this.isSelected = false;
  }

  getproducts(){
    this.productService.getProductList().subscribe(products => {
      this.products = products;
      console.log(this.products)
    });
  }
  

  AddProduct(){
    this.router.navigate(['new'],
    {relativeTo: this.route});
  }
 product : Product;
  getDetails(index: number){
    this.productService.getProductId(index).subscribe( result => {
       this.product = result;
       this.product.count += 1;
      this.productService.updateProduct(index, this.product).subscribe();        
});
    this.router.navigate([index],{relativeTo: this.route});
  }
  editProduct(index: number){
    this.router.navigate([index, 'edit'],{relativeTo: this.route});

  }
  
  deleteProduct(){
    this.router.navigate(['delete'],{relativeTo: this.route});
  }
 
 
}

