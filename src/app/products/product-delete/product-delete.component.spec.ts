// import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {
    async, inject,
    ComponentFixture, TestBed
} from '@angular/core/testing';
import { ProductDeleteComponent } from './product-delete.component';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    getProductId(index: number) {
        return this.products[index];
    }
    postProduct(product: Product) {
        let tempEmployees = this.products.getValue();
        tempEmployees.push(product);
        this.products.next(tempEmployees);
    }
    updateProduct(index: number, product: Product) {
        let tempEmployees = this.products.getValue();
        tempEmployees[index] = product;
        this.products.next(tempEmployees);
    }
    removeProduct(id: number) {
        let tempEmployees = this.products.getValue();
        tempEmployees.splice(id, 1);
        this.products.next(tempEmployees);
    }

    setRecipes(products: Product[]) {
        let tempEmployees = products;

        this.productChanges.next(tempEmployees);
    }
    fetchRecipes() {
        return this.products.pipe(tap(p => this.setRecipes(p)));
    }

};

describe('ProductDeleteComponent', () => {
    //component class testing
    describe('Component Class', () => {


        let component: ProductDeleteComponent;
        let productService: ProductService;
        let fixture: ComponentFixture<ProductDeleteComponent>;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule,
                    HttpClientModule,
                    ReactiveFormsModule,
                    MatCardModule,
                    MatCheckboxModule,
                    MatInputModule,
                    MatSelectModule,
                    MatDialogModule,
                    MatTooltipModule,
                    BrowserAnimationsModule,
                    RouterTestingModule.withRoutes([])],
                declarations: [ProductDeleteComponent,
                    FilterByNamePipe],
                providers: [
                    { provide: ProductService, useClass: MockProductService }
                ]
            })
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductDeleteComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });
        it('should have products after getproducts method called', () => {
            component.ngOnInit();
            expect(component.products.length).toEqual(2);
        });
        it('should not have id after construction', () => {
            expect(component.id).toBeFalsy();
        });
        it('hould not have isSelected after construction', () => {
            expect(component.isSelected).toBeFalsy();
        });
        it('should not have p after construction', () => {
            expect(component.p).toBeFalsy();
        });
        it('should not have searchItem after construction', () => {
            expect(component.searchItem).toBeFalsy();
        });
        it('should not have count to be true after construction', () => {
            expect(component.count).toBeTruthy();
        });
        it('should have list to be 0 after construction', () => {
            expect(component.list).toBe(0);
        });
        it('should have count of selected items', () => {
            component.check(true);
            expect(component.count).toBe(false)
            expect(component.list).toBe(1);
            component.check(false);
            expect(component.count).toBe(true)
            expect(component.list).toBe(0);
        });
       
    });


     describe('Component DOM', () => {


       let component: ProductDeleteComponent;
       let productService: ProductService;
       let fixture: ComponentFixture<ProductDeleteComponent>;

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
           declarations: [ ProductDeleteComponent,
           FilterByNamePipe ],
           providers: [
             { provide: ProductService, useClass: MockProductService }
           ]
         })
         .compileComponents();
       }));

       beforeEach(() => {
         fixture = TestBed.createComponent(ProductDeleteComponent);
         component = fixture.componentInstance;
         fixture.detectChanges();
       });
       it('should render heading in a h3 tag', () => {
         const compiled = fixture.nativeElement;
         expect(compiled.querySelectorAll('h3 span')[1].textContent).toContain('Challenges List')
       });
       it(`should render a text box to Search Products by name`, () => {
         const compiled = fixture.nativeElement;
         expect(compiled.querySelector('#searchItem input[type="text"]')).toBeTruthy();
       });
       it(`should render a Check box`, () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('mat-checkbox')).toBeTruthy();
      });
       it(`should render a Delete button`, () => {
         const compiled = fixture.nativeElement;
         expect(compiled.querySelectorAll('#deleteButton button')[0].textContent).toContain(' Delete ');
       });
       it(`should render a first Challenge Name `, () => {
         const compiled = fixture.nativeElement;
         expect(compiled.querySelectorAll('mat-card-content .chckbckgrd')[0].textContent).toEqual('Terminal Stack');
       });
       it(`should render a second Challenge Name`, () => {
         const compiled = fixture.nativeElement;
         expect(compiled.querySelectorAll('mat-card-content .chckbckgrd')[1].textContent).toEqual('Voltas 1.5 Split AC');
       });
       it(`should render a label as Manufacturer`, () => {
         const compiled = fixture.nativeElement;
         expect(compiled.querySelectorAll('#pManufacturer label')[0].textContent).toEqual('Manufacturer:');
       });
       it(`should render a label as Price`, () => {
         const compiled = fixture.nativeElement;
         expect(compiled.querySelectorAll('#pPrice label')[0].textContent).toEqual('Price : ');
       });
       it(`should render a label as Quantity`, () => {
         const compiled = fixture.nativeElement;
         expect(compiled.querySelectorAll('#pQuantity label')[0].textContent).toEqual('Quantity :');
       });
       it(`should render a label as Description`, () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelectorAll('#pDescription label')[0].textContent).toEqual('Description :');
      });
       it(`should render manufacturer of 1st product`, () => {
         const compiled = fixture.nativeElement;
         expect(compiled.querySelectorAll('#pManufacturer div')[0].textContent).toEqual('Terminal Stack');
       });
       it(`should render price of 1st product`, () => {
         const compiled = fixture.nativeElement;
         expect(compiled.querySelectorAll('#pPrice div')[0].textContent).toEqual('₹34,999.00');
       });
       it(`should render quantity of 1st product`, () => {
         const compiled = fixture.nativeElement;
         expect(compiled.querySelectorAll('#pQuantity div')[0].textContent).toEqual('2');
       });
       it(`should render quantity of 1st product`, () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelectorAll('#pDescription div')[0].textContent).toEqual('The award for the most unusual probably goes to The Stupid Hackathon — where “participants conceptualize and create projects that have no value whatsoever,” contrary to the usual mission of creating useful, functional products');
      });

       it(`should render manufacturer of 2nd product`, () => {
         const compiled = fixture.nativeElement;
         expect(compiled.querySelectorAll('#pManufacturer div')[1].textContent).toEqual('Voltas');
       });
       it(`should render price of 2nd product`, () => {
         const compiled = fixture.nativeElement;
         expect(compiled.querySelectorAll('#pPrice div')[1].textContent).toEqual('₹29,999.00');
       });
       it(`should render quantity of 2nd product`, () => {
         const compiled = fixture.nativeElement;
         expect(compiled.querySelectorAll('#pQuantity div')[1].textContent).toEqual('2');
       });
       it(`should render quantity of 2nd product`, () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelectorAll('#pDescription div')[1].textContent).toEqual('Quickly and efficiently circulate cool air by installing the Voltas 1.5 Ton 3 Star Copper 183 EZA Split AC. Built with durable copper condenser, it is sure to last several years. The air conditioner with a 1.5-Ton capacity provides great cooling.');
      });
     });

});
