import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from '../product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  id: number;
  product: Product ;
  subscription: Subscription;
  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
   this.subscription = this.route.params
    .subscribe(
      (params: Params) =>{
        this.id= +params['id'];
        this.productService.getProductId(this.id).subscribe( result => {
                 this.product= result;
        });
        });
      }
      ngOnDestroy(){
        this.subscription.unsubscribe();
      }

      editProduct(){
        this.router.navigate(['edit'], {relativeTo: this.route});
      }
    
      goback(){
        this.router.navigate(['../'],{relativeTo: this.route});
    
      }

}
