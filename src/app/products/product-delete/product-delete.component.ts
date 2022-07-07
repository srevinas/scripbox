import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss']
})
export class ProductDeleteComponent implements OnInit {
  products: Product[];
  id: Number;
  subscription: Subscription;
  isSelected = false;
  p: boolean = false;
  searchItem: string;
  count: boolean = true;
  list = 0;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    this.productService.fetchRecipes().subscribe();
    this.getproducts();
    this.subscription = this.productService.productChanges
      .subscribe(
        (products: Product[]) => {
          this.products = products;
        });

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  check(p) {
    if (p === true) {
      this.count = false;
      this.list += 1;
    }
    if (p === false) {
      this.list -= 1;
    }
    if (this.list === 0) {
      this.count = true;
    }

  }

  getproducts() {
    this.productService.getProductList().subscribe(products => {
      this.products = products;
      console.log(this.products)
    });
  }
  selectedProduct = [];

  deleteProduct() {
    this.selectedProduct = this.products.filter(p => {
      if (p.isSelected)
        return p;
    });
    for (let i in this.selectedProduct) {
      this.productService.removeProduct(this.selectedProduct[i].id).subscribe();
    }
    this.productService.fetchRecipes().subscribe();
    this.getproducts();
    this.subscription = this.productService.productChanges
      .subscribe(
        (products: Product[]) => {
          this.products = products;
        });
    this.dialog.open(DialogSuccessDelete, {
      width: '400px',
      height: '250px',
    });
  }
  delete() {
    this.deleteProduct();
    console.log(this.selectedProduct.length)
  }
  goback() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}

@Component({
  selector: 'success_delete_dialog',
  templateUrl: './success-delete.html',
  styleUrls: ['./product-delete.component.scss']

})
export class DialogSuccessDelete {


  constructor(
    public dialogRef: MatDialogRef<DialogSuccessDelete>) { }
}