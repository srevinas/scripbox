import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { ProductService } from './product.service';
import { Product } from './product.model';

describe('ProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [
        ProductService
    ]
  }));

  it('should be created', () => {
    const service: ProductService = TestBed.get(ProductService);
    expect(service).toBeTruthy();
  });
  describe('EmployeesService', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let productService: ProductService;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        providers: [
            ProductService
        ]
      });
      httpClient = TestBed.get(HttpClient);
      httpTestingController = TestBed.get(HttpTestingController);
      productService = TestBed.get(ProductService);
    });
  
    afterEach(() => {
      httpTestingController.verify();
    })
    describe('getProductList', () => {
      let expectedProducts: Product[];
  
      beforeEach(() => {
        expectedProducts = [
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
         ] as Product[];
      });
  
      it('should return expected products (called once)', () => {
  
        productService.getProductList().subscribe(
            products => expect(products).toEqual(expectedProducts, 'should return expected products'),
          fail
        );
  
        const req = httpTestingController.expectOne(productService.productUrl);
        expect(req.request.method).toEqual('GET');
  
        req.flush(expectedProducts);
      });
    });
  
    describe('postProduct', () => {
      let expectedAddProduct: Product;
      expectedAddProduct = {
        "productName": "Brainihacks",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/81JuZO83LOL._SL1500_.jpg",
        "manufacturer": "Bosch",
        "productPrice": 24990,
        "productQuantity": 2,
        "productDescription": "Bosch WAK24168IN Fully-automatic Front-loading Washing Machine (7 Kg, Silver)",
        "isSelected": false,
        "count": 1,
      };
  
      it('should add an product and return with id inserted ', () => {
  
        const productToAdd: Product = {
            "productName": "Brainihacks",
            "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/81JuZO83LOL._SL1500_.jpg",
            "manufacturer": "Bosch",
            "productPrice": 24990,
            "productQuantity": 2,
            "productDescription": "Bosch WAK24168IN Fully-automatic Front-loading Washing Machine (7 Kg, Silver)",
            "isSelected": false,
            "count": 1,
          };
  
        productService.postProduct(productToAdd).subscribe(
          data => expect(data).toEqual(expectedAddProduct, 'should return the product  inserted'),
          fail
        );
  
        const req = httpTestingController.expectOne(productService.productUrl);
        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(productToAdd);
  
        const expectedResponse = new HttpResponse(
          { status: 200, statusText: 'OK', body: expectedAddProduct });
        req.event(expectedResponse);
      });
    });
  
    describe('UpdateProduct', () => {
       let expectedUpdatedProduct = {
          "productName": "Brainihacks",
          "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/81JuZO83LOL._SL1500_.jpg",
          "manufacturer": "Bosch",
          "productPrice": 24990,
          "productQuantity": 2,
          "productDescription": "Bosch WAK24168IN Fully-automatic Front-loading Washing Machine (7 Kg, Silver)",
          "isSelected": false,
          "count": 1,
          "id" : 3
        };
    
        it('should Update an product ', () => {
    
          const productToUpdate = {
              "productName": "Brainihacks",
              "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/81JuZO83LOL._SL1500_.jpg",
              "manufacturer": "Bosch",
              "productPrice": 24990,
              "productQuantity": 2,
              "productDescription": "Bosch WAK24168IN Fully-automatic Front-loading Washing Machine (7 Kg, Silver)",
              "isSelected": false,
              "count": 1,
              "id": 3
            };
    
          productService.updateProduct(productToUpdate.id, productToUpdate).subscribe(
            data => expect(data).toEqual(expectedUpdatedProduct, 'should return the product  inserted'),
            fail
          );
    
          const req = httpTestingController.expectOne(productService.productUrl+`/${productToUpdate.id}`);
          expect(req.request.method).toEqual('PUT');
          expect(req.request.body).toEqual(expectedUpdatedProduct);
    
          const expectedResponse = new HttpResponse(
            { status: 200, statusText: 'OK', body: expectedUpdatedProduct
        });
      });
  });

  describe('DeleteProduct', () => {
    // let expectedAddProduct: Product;
   let expectedDeleteProduct = {
      "productName": "Brainihacks",
      "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/81JuZO83LOL._SL1500_.jpg",
      "manufacturer": "Bosch",
      "productPrice": 24990,
      "productQuantity": 2,
      "productDescription": "Bosch WAK24168IN Fully-automatic Front-loading Washing Machine (7 Kg, Silver)",
      "isSelected": false,
      "count": 1,
      "id" : 3
    };

    it('should Delete an product ', () => {

      const productToDelete = {
          "productName": "Brainihacks",
          "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/81JuZO83LOL._SL1500_.jpg",
          "manufacturer": "Bosch",
          "productPrice": 24990,
          "productQuantity": 2,
          "productDescription": "Bosch WAK24168IN Fully-automatic Front-loading Washing Machine (7 Kg, Silver)",
          "isSelected": false,
          "count": 1,
          "id": 3
        };


     expect(productService.removeProduct(productToDelete.id)).toBeTruthy();
     productService.removeProduct(productToDelete.id).subscribe();

      const req = httpTestingController.expectOne(productService.productUrl+`/${productToDelete.id}`);
      expect(req.request.method).toEqual('DELETE');
    //   expect(req.request.body).toEqual(expectedDeleteProduct);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: expectedDeleteProduct
    });
  });
});
});
});
