import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { AuthService } from './auth.service';
import { Auth } from './auth.model';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [AuthService]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  describe('AuthService', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let authService: AuthService;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        providers: [
            AuthService
        ]
      });
      httpClient = TestBed.get(HttpClient);
      httpTestingController = TestBed.get(HttpTestingController);
      authService = TestBed.get(AuthService);
    });
  
    afterEach(() => {
      httpTestingController.verify();
    })
    describe('get Registration Details', () => {
      let expectedSRegisterDetails: Auth[];
  
      beforeEach(() => {
        expectedSRegisterDetails = [
            {
                "firstName": "bhagyamma",
                "lastName": "Dhevulapalli",
                "email": "bhagya@gmail.com",
                "password": "wipro123",
                "location": "bangalore",
                "mobileNumber": "9528646890",
                
              }
         ] as Auth[];
      });
  
      it('should return expected Register Details (called once)', () => {
  
        authService.fetchSigninDetails().subscribe(
            result => expect(result).toEqual(expectedSRegisterDetails, 'should return expected Register Details'),
          fail
        );
  
        const req = httpTestingController.expectOne(authService.url);
        expect(req.request.method).toEqual('GET');
  
        req.flush(expectedSRegisterDetails);
      });
    });
  
    describe('post regiser details', () => {
      let expectedResult: Auth;
      expectedResult = {
        
            "firstName": "bhagyamma",
            "lastName": "Dhevulapalli",
            "email": "bhagya@gmail.com",
            "password": "123456",
            "location": "Bangalore",
            "mobileNumber": "8088060960"
          
      };
   
      it('should add an register details and return inserted ', () => {
  
        const detailsToAdd: Auth = {
           
            "firstName": "bhagyamma",
            "lastName": "Dhevulapalli",
            "email": "bhagya@gmail.com",
            "password": "123456",
            "location": "Bangalore",
            "mobileNumber": "8088060960"
          };
  
        authService.postsignDetails(detailsToAdd).subscribe(
          data => expect(data).toEqual(expectedResult, 'should return the registration details inserted'),
          fail
        );
  
        const req = httpTestingController.expectOne(authService.url);
        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(expectedResult);
  
        const expectedResponse = new HttpResponse(
          { status: 200, statusText: 'OK', body: expectedResult });
        req.event(expectedResponse);
      });
    });
});
});
