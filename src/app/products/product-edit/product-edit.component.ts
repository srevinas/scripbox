import { Component, OnInit, Inject } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { CanComponentDeactivate } from '../can-deactivate-gaurd.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, CanComponentDeactivate {
  subscription: Subscription;
  index: number;
  editfalse: boolean = false;
  productForm: FormGroup;
  product: Product;
  isChanged = false;
  Manufa: string;
  count = 0;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    this.subscription = this.route.params.
      subscribe(
        (params: Params) => {
          this.index = params['id'];
          this.editfalse = params['id'] != null;
          this.inItForm();

        }
      )
    if (this.editfalse) {
      this.productService.getProductId(this.index).subscribe(p => {
        this.count = p.count;
        console.log(this.count)
      })
    } else {
      this.count = 0;
    }

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private inItForm() {
    let pName = "";
    let pImage = "";
    let pManufacturer = "";
    let pPrice = null;
    let pQuantity = null;
    let pDescription = "";

    if (this.editfalse) {
      this.productService.getProductId(this.index).subscribe(p => {
        pName = p.productName;
        pImage = p.imageUrl;
        pManufacturer = p.manufacturer;
        pPrice = p.productPrice;
        pQuantity = p.productQuantity
        pDescription = p.productDescription;
        console.log(pName)
        this.productForm = new FormGroup({
          'productName': new FormControl(pName, Validators.required),
          'imageUrl': new FormControl(pImage, [Validators.required]),
          'manufacturer': new FormControl(pManufacturer, Validators.required),
          'productPrice': new FormControl(pPrice, Validators.required),
          'productQuantity': new FormControl(pQuantity, Validators.required),
          'productDescription': new FormControl(pDescription, [Validators.required, Validators.maxLength(300)]),
        })
      }
      );
    }
    else {
      this.productForm = new FormGroup({
        'productName': new FormControl(pName, Validators.required),
        'imageUrl': new FormControl(pImage, Validators.required),
        'manufacturer': new FormControl(pManufacturer, Validators.required),
        'productPrice': new FormControl(pPrice, Validators.required),
        'productQuantity': new FormControl(pQuantity, Validators.required),
        'productDescription': new FormControl(pDescription, Validators.required),
      });
    }
  }

  newProduct: Product;
  onSubmit() {
    this.newProduct = {
      productName: this.productForm.get('productName').value,
      imageUrl: this.productForm.get('imageUrl').value,
      manufacturer: this.productForm.get('manufacturer').value,
      productPrice: this.productForm.get('productPrice').value,
      productQuantity: this.productForm.get('productQuantity').value,
      productDescription: this.productForm.get('productDescription').value,
      isSelected: false,
      count: this.count
    };
    console.log(this.newProduct.count);

    if (this.editfalse) {
      this.productService.updateProduct(this.index, this.newProduct).subscribe();
    }
    else {
      this.productService.postProduct(this.newProduct).subscribe();
    }

    this.dialog.open(DialogSuccess, {
      width: '400px',
      height: '244px',
      data: { name: this.editfalse }
    });
    this.isChanged = true;
    this.onClear();
  }

  onClear() {
    this.router.navigate(['/products']);
  }

  submit() {
    this.onSubmit();
  }



  canDeactivate(): Observable<boolean> | boolean {
    if (!this.isChanged) {
      this.isChanged = false;
      const dialogRef = this.dialog.open(DialogCanDeactive, {
        width: '400px',
        height: '240px'
      });

      return dialogRef.afterClosed().pipe(map(result => {
        if (result === 'cancel') {
          return false;
        }

        if (result === 'discard') {
          return true;
        }
      }), first());

    }
    return true;
  }
}


@Component({
  selector: 'can_success_dialog',
  templateUrl: './dialog-success.html',
  styleUrls: ['./product-edit.component.scss']

})
export class DialogSuccess {
  constructor(
    public dialogRef: MatDialogRef<DialogSuccess>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}



@Component({
  selector: 'can_deactive_dialog',
  templateUrl: './canDeactivate.html',
  styleUrls: ['./product-edit.component.scss']

})
export class DialogCanDeactive {

  constructor(
    public dialogRef: MatDialogRef<DialogCanDeactive>) { }
}


