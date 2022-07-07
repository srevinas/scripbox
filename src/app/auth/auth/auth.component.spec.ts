import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AuthComponent } from "./auth.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { Auth } from '../auth.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from '../auth.service';
import { MatIconModule } from "@angular/material/icon";
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


class MockAuthService {
    user = new Subject<Auth[]>();

    userDetails: BehaviorSubject<Auth[]> = new BehaviorSubject<Auth[]>([
        {
            "firstName": "bhagyamma",
            "lastName": "Dhevulapalli",
            "email": "bhagya@gmail.com",
            "password": "123456",
            "location": "bangalore",
            "mobileNumber": "9634787654",

        },
        {
            "firstName": "bhagyamma",
            "lastName": "Dhevulapalli",
            "email": "bhagya@gmail.com",
            "password": "12345678",
            "location": "bangalore",
            "mobileNumber": "8345876367",

        }
    ]);
    fetchSigninDetails(): BehaviorSubject<Auth[]> {
        return this.userDetails;
    }

    postProduct(product: Auth) {
        let tempDetails = this.userDetails.getValue();
        tempDetails.push(product);
        this.userDetails.next(tempDetails);
    }
};


describe("AuthComponent", () => {
    describe('Component Class', () => {
        let component: AuthComponent;
        let fixture: ComponentFixture<AuthComponent>;
        let authService: AuthService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [
                    FormsModule,
                    HttpClientModule,
                    ReactiveFormsModule,
                    MatCardModule,
                    MatCheckboxModule,
                    MatInputModule,
                    MatSelectModule,
                    MatDialogModule,
                    MatTooltipModule,
                    MatIconModule,
                    BrowserAnimationsModule,
                    RouterTestingModule.withRoutes([])
                ],

                declarations: [AuthComponent],
                providers: [{ provide: AuthService, useClass: MockAuthService }]
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AuthComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it("should create", () => {
            expect(component).toBeTruthy();
        });

        it("should have intial values as expected", () => {
            expect(component.isLogIn).toBeTruthy();
            expect(component.hide).toBeTruthy();
            expect(component.login).toBeFalsy();
            expect(component.emailSigninError).toBeFalsy();
            expect(component.emailErroe).toBeFalsy();
            expect(component.errorMessage).toEqual('Incorrect Email (or) Password')
            expect(component.ErrorMessage).toEqual('Email Already Used')
        });
        it("should have UserDetails of length 2", () => {
            component.ngOnInit();
            expect(component.userDetails.length).toEqual(2);
        });
        it("should have isLogIn o be false", () => {
            component.signin();
            expect(component.isLogIn).toEqual(false);
        });

    });
    describe('Component Dom', () => {
        let component: AuthComponent;
        let fixture: ComponentFixture<AuthComponent>;
        let authService: AuthService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [
                    FormsModule,
                    HttpClientModule,
                    ReactiveFormsModule,
                    MatCardModule,
                    MatCheckboxModule,
                    MatInputModule,
                    MatSelectModule,
                    MatDialogModule,
                    MatTooltipModule,
                    MatIconModule,
                    BrowserAnimationsModule,
                    RouterTestingModule.withRoutes([])
                ],

                declarations: [AuthComponent],
                providers: [{ provide: AuthService, useClass: MockAuthService }]
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AuthComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
        it('should render input of formControl Email', () => {
            const compiled = fixture.nativeElement;
            expect(compiled.querySelector('input[formControlName="email"]')).toBeTruthy();
        });
        it('should render input of formControl password', () => {
            const compiled = fixture.nativeElement;
            expect(compiled.querySelectorAll('#pasword input[formControlname="password"')).toBeTruthy();
        });
        it('should render not a  user in span tag', () => {
            const compiled = fixture.nativeElement;
            expect(compiled.querySelectorAll('#register span')[0].textContent).toEqual('Not a User? ');
        });
        it('should render register in span', () => {
            const compiled = fixture.nativeElement;
            expect(compiled.querySelectorAll('#register span')[1].textContent).toEqual('Register');
        });
        it('should render Sign in in button', () => {
            const compiled = fixture.nativeElement;
            expect(compiled.querySelector('#buttonLogin button').textContent).toEqual(' Sign In ');
        });
    });
});
