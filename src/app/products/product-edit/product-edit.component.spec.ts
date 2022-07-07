import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditComponent } from './product-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('ProductEditComponent', () => {
  let component: ProductEditComponent;
  let fixture: ComponentFixture<ProductEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([]),
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatTooltipModule
      ],
      declarations: [ ProductEditComponent ]
    }) 
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should not have index on intialization', () => {
    expect(component.index).toBeFalsy();
  });
  it('should not have editfalse on intialization', () => {
    expect(component.editfalse).toBeFalsy();
  });
  it('should not have product on intialization', () => {
    expect(component.product).toBeFalsy();
  });
  it('should not have isChanged on intialization', () => {
    expect(component.isChanged).toBeFalsy();
  });

  it('should not have Manufa on intialization', () => {
    expect(component.Manufa).toBeFalsy();
  });
  
  it('should  have count as 0 on intialization', () => {
    expect(component.count).toBe(0);
  });
  it('should have input field with formControl name productName ', () => {
    const compiled = fixture.nativeElement
    expect(compiled.querySelector('input[formControlName="productName"]')).toBeTruthy();
  });
  it('should have input field with formControl name Training Team ', () => {
    const compiled = fixture.nativeElement
    expect(compiled.querySelector('input[formControlName="Training Team"]')).toBeTruthy();
  });
  it('should have input field with formControl name productPrice ', () => {
    const compiled = fixture.nativeElement
    expect(compiled.querySelector('input[formControlName="productPrice"]')).toBeTruthy();
  });
  it('should have input field with formControl name productQuantity ', () => {
    const compiled = fixture.nativeElement
    expect(compiled.querySelector('input[formControlName="productQuantity"]')).toBeTruthy();
  });
  it('should have input field with formControl name imageUrl ', () => {
    const compiled = fixture.nativeElement
    expect(compiled.querySelector('input[formControlName="imageUrl"]')).toBeTruthy();
  });
  it('should have textField field with formControl name productDescription ', () => {
    const compiled = fixture.nativeElement
    expect(compiled.querySelector('textarea[formControlName="productDescription"]')).toBeTruthy();
  });
  it('should create', () => {
    const compiled = fixture.nativeElement
    expect(compiled.querySelector('button').textContent).toEqual(' save ');
  });
  it('should create', () => {
    const compiled = fixture.nativeElement
    expect(compiled.querySelectorAll('button')[1].textContent).toEqual('Cancel');
  });
 
});
