import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsComponent } from './product-details.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductService } from '../product.service';






describe('ProductDetailsComponent', () => {
    let component: ProductDetailsComponent;
    let fixture: ComponentFixture<ProductDetailsComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule,
                HttpClientModule,

                RouterTestingModule.withRoutes([{ path: 'products/0', component: ProductDetailsComponent }])],
            declarations: [ProductDetailsComponent],
        })
            .compileComponents();

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();

    });
    it('should not have product  before construction', () => {

        expect(component.id).toBeFalsy();
        expect(component.product).toBeFalsy();


    });
    it('should be falsy on initialization', () => {

        expect(component.id).toBeFalsy();
        expect(component.product).toBeFalsy();


    });
    it('should be falsy on initialization', () => {
        const compiled = fixture.nativeElement;

        expect(compiled.querySelectorAll('h3 span')[1].textContent).toEqual('Challenge Details');


    });
    it('should render label as Challenge name', () => {

        const compiled = fixture.nativeElement;

        expect(compiled.querySelectorAll('label')[0].textContent).toEqual('PrChallengeoduct Name :');

    });
    it(`should render a label as Training Team`, () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelectorAll('label')[1].textContent).toEqual('Training Team:');

    });
    it(`should render a label as Price`, () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelectorAll('label')[2].textContent).toEqual('Price : ');

    });
    it(`should render a label as Quantity`, () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelectorAll('label')[3].textContent).toEqual('Quantity :');

    });
    it(`should render a label as Description`, () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelectorAll('label')[4].textContent).toEqual('Description :');

    });
    it(`should not have a Challenge Name `, () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('#pName div').textContent).toEqual('');

    });
});
