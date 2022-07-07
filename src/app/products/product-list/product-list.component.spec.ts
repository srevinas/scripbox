// import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {async,inject,
   ComponentFixture, TestBed
  } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Router} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { FilterByNamePipe } from '../filter-by-name.pipe';
import { tap } from 'rxjs/operators';
// import {routing} from './app.routes';


class MockProductService {
  productChanges = new Subject<Product[]>();

products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([
  {
    "productName": "Terminal Stack",
      "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/71ncRs6HzyL._SL1500_.jpg",
      "manufacturer": "Terminal Stack",
      "productPrice": 34999,
      "productQuantity": 2,
      "productDescription": "The award for the most unusual probably goes to The Stupid Hackathon — where “participants conceptualize and create projects that have no value whatsoever,” contrary to the usual mission of creating useful, functional products",
      "isSelected": false,
      "count": 7,
  },
  {
    "productName": "Reboot Rebels",
    "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/51f%2BFmi9fFL._SL1480_.jpg",
    "manufacturer": "Voltas",
    "productPrice": 29999,
    "productQuantity": 2,
    "productDescription": "Quickly and efficiently circulate cool air by installing the Voltas 1.5 Ton 3 Star Copper 183 EZA Split AC. Built with durable copper condenser, it is sure to last several years. The air conditioner with a 1.5-Ton capacity provides great cooling.",
    "isSelected": false,
    "count": 2,
     }
]);
getProductList(): BehaviorSubject<Product[]> {
  return this.products; 
}
getProductId(index: number){
  return this.products[index];
}
postProduct(product: Product) {
  let tempEmployees = this.products.getValue();
  tempEmployees.push(product);
  this.products.next(tempEmployees);
}
updateProduct(index: number, product: Product){
  let tempEmployees = this.products.getValue();
  tempEmployees[index] = product;
  this.products.next(tempEmployees);
}
removeProduct(id: number){
  let tempEmployees = this.products.getValue();
  tempEmployees.splice(id,1);
  this.products.next(tempEmployees);
}

setRecipes(products: Product[]){
  let tempEmployees = products;
  
  this.productChanges.next(tempEmployees);
}
fetchRecipes(){
return this.products.pipe(tap(p=> this.setRecipes(p)));
}

};

describe('ProductListComponent', () => {
  //component class testing
  describe('Component Class', () => {


  let component: ProductListComponent;
  let productService: ProductService;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:      [ FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatCardModule,
        MatCheckboxModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatTooltipModule ,
        RouterTestingModule.withRoutes([])],
      declarations: [ ProductListComponent,
      FilterByNamePipe ],
      providers: [
        { provide: ProductService, useClass: MockProductService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  
  it('should not have productsview after construction', () => {
    expect(component.productsview).toBeFalsy();
  });

  it('Customize dropdown options initial state', () => {
    expect(component.isPrice).toBeTruthy();
    expect(component.isQuantity).toBeTruthy();
    expect(component.IsManufacturer).toBeTruthy();
    expect(component.isDescription).toBeTruthy();
  });
  it('Customize dropdown options state after selection', () => {
    component.IsManufacturer = true;
    component.isPrice= true;
    component.isQuantity=true;
    component.isDescription = true;
    component.apply();
    expect(component.Price).toEqual(component.isPrice);
    expect(component.Quantity).toEqual(component.isQuantity);
    expect(component.Manufacturer).toEqual(component.IsManufacturer);
    expect(component.Description).toEqual(component.isDescription );
  });

  it('should not have productsviewcount after construction', () => {
    expect(component.productViewCount.length).toBe(0);
  });

  it('should have isSelected as false after construction', () => {
    expect(component.isSelected).toBeFalsy();
  });
  it('should trigger customize dropdown on click ', () => {
    component.isSelected = false;
    component.open();
    expect(component.isSelected).toBe(true);
    component.open() ;
    expect(component.isSelected).toBe(false);
    component.open() ;
    component.close();
    expect(component.isSelected).toBe(false);
  });
  
  
  it('should not have counter array after construction', () => {
    expect(component.counter.length).toBe(0);
  });
  it('should not have productNameViewed after construction', () => {
    expect(component.productNameViewed.length).toBe(0);
  });
  it('should have products after ngOnInIt method called', () => {
   component.ngOnInit();
   expect(component.products.length).toEqual(2);
  });
});

 
describe('Component DOM', () => {


  let component: ProductListComponent;
  let productService: ProductService;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:      [ FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatCardModule,
        MatCheckboxModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatTooltipModule ,
        RouterTestingModule.withRoutes([])],
      declarations: [ ProductListComponent,
      FilterByNamePipe ],
      providers: [
        { provide: ProductService, useClass: MockProductService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should render heading in a h3 tag', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Challenges List')
  });
  it(`should render a text box to Search Products by name`, () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#searchItem input[type="text"]')).toBeTruthy();
  });
  it(`should render a Customize button`, () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#customizeDropdown button').textContent).toContain('Customize');
  });
  it(`should render a top viewed button`, () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#topViewed button').textContent).toContain('Top Viewed');
  });
  it(`should render a Add button`, () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#addButton button').textContent).toContain('Add Challenge');
  });
  it(`should render a Delete button`, () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('#addButton button')[1].textContent).toContain('Delete Challenge');
  });
  it(`should render a first Challenge Name `, () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('mat-card-content span')[0].textContent).toEqual(' Terminal Stack ');
  });
  it(`should render a second Challenge Name`, () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('mat-card-content span')[3].textContent).toEqual(' Voltas 1.5 Split AC ');
  });
  it(`should render a label as Manufacturer`, () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('label')[0].textContent).toEqual('Manufacturer:');
  });
  it(`should render a label as Price`, () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('label')[1].textContent).toEqual('Price : ');
  });
  it(`should render a label as Quantity`, () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('label')[2].textContent).toEqual('Quantity :');
  });
  it(`should render manufacturer of 1st product`, () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('#pManufacturer')[0].textContent).toEqual('Terminal Stack');
  });
  it(`should render price of 1st product`, () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('#pPrice')[0].textContent).toEqual('₹34,999.00');
  });
  it(`should render quantity of 1st product`, () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('#pQuantity')[0].textContent).toEqual('2');
  });
 

  it(`should render manufacturer of 2nd product`, () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('#pManufacturer')[1].textContent).toEqual('Voltas');
  });
  it(`should render price of 2nd product`, () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('#pPrice')[1].textContent).toEqual('₹29,999.00');
  });
  it(`should render quantity of 2nd product`, () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('#pQuantity')[1].textContent).toEqual('2');
  });
});

});
