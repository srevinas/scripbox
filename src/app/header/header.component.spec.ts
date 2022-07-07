import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from "@angular/material/dialog";
import { Subject, BehaviorSubject } from 'rxjs';
import { Auth } from '../auth/auth.model';
import { AuthService } from '../auth/auth.service';


class MockAuthService {
          user = new Subject<Auth[]>();

        
        
          userDetails: BehaviorSubject<Auth[]> = new BehaviorSubject<Auth[]>([
            {
                "firstName": "bhagyamma",
                "lastName": "Dhevulapalli",
                "email": "bhagya@gmail.com",
                "password": "123456",
                "location": "bangalore",
                "mobileNumber": "9463268976",
                
              },
              {
                "firstName": "bhagyamma",
                "lastName": "Dhevulapalli",
                "email": "bhagya@gmail.com",
                "password": "12345678",
                "location": "bangalore",
                "mobileNumber": "9235797634",
              
              }
        ]);
        fetchSigninDetails(): BehaviorSubject<Auth[]> {
          return this.userDetails; 
        }
       
        postChallenge(Challenge: Auth) {
          let tempDetails = this.userDetails.getValue();
          tempDetails.push(Challenge);
          this.userDetails.next(tempDetails);
        }    
        };
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService : AuthService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports:[RouterTestingModule.withRoutes([]),
        HttpClientModule,
        MatDialogModule

    ],
      declarations: [ HeaderComponent ],
      providers: [{ provide: AuthService, useClass: MockAuthService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should not hav authenitcation ', () => {
    expect(component.isAuthenticated).toBeFalsy();
  });
  it('should not hav user ', () => {
    expect(component.user).toBeFalsy();
  });
  it('should not hav p ', () => {
    expect(component.p).toBeFalsy();
  });
  it('should not hav sidenav ', () => {
    expect(component.sideNav).toBeFalsy();
  });
  it('should have user and isAuthenticated to be truthy on ngOnInIt', () => {
   let userdetails={
        "firstName": "bhagyamma",
        "lastName": "Dhevulapalli",
        "email": "bhagya@wiro.com",
        "password": "123456",
        "location": "bangalore",
        "mobileNumber": "9452398765",
      }
      authService.user.next(userdetails)
      component.ngOnInit();
    expect(component.user).toBeTruthy();
    expect(component.isAuthenticated).toBeTruthy();    
  });
  it('should trigger sidenav on openNav ', () => {
      const compiled = fixture.nativeElement
      component.sideNav = false;
      component.openNav();
    expect(component.sideNav).toBeTruthy();
    expect(compiled.querySelector('#mySidenav').style.width ).toBe('250px');
    component.openNav();
    expect(component.sideNav).toBeFalsy();
    expect(compiled.querySelector('#mySidenav').style.width ).toBe('0px');
  });
  it('should not have sidenav on closeNav ', () => {
    const compiled = fixture.nativeElement
   

  component.closeNav();
  expect(component.sideNav).toBeFalsy();
  expect(compiled.querySelector('#mySidenav').style.width ).toBe('0px');
});
it('should render h3 tag', () => {
    const compiled = fixture.nativeElement
  expect(compiled.querySelector('h3').textContent ).toBe('Challenges');
});
it('should render About in a tag', () => {
    const compiled = fixture.nativeElement
  expect(compiled.querySelectorAll('li a')[0].textContent ).toBe('About');
});
it('should render Challenge in a tag', () => {
    const compiled = fixture.nativeElement
  expect(compiled.querySelectorAll('li a')[1].textContent ).toBe('Challenges List');
});
it('should render Log In in a tag', () => {
    const compiled = fixture.nativeElement
    component.isAuthenticated = false;
  expect(compiled.querySelectorAll('li a')[2].textContent ).toBe('Log In');
});
});
