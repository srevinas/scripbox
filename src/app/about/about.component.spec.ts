import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render in h3 tag', () => {
      const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#info h3' ).textContent).toEqual('About this Application');
  });
  it('should render in p tag', () => {
    const compiled = fixture.nativeElement;
  expect(compiled.querySelector('#info p' ).innerText).toEqual('This Application provides you the list of Challenges. On Which You can perform the following... on Sign In.');
});
it('should render in li tag', () => {
    const compiled = fixture.nativeElement;
  expect(compiled.querySelectorAll('#info li')[0].textContent).toEqual('You can Add a new Challenge.');

  expect(compiled.querySelectorAll('#info li')[1].textContent).toEqual('You can Delete a one or Multiple Challenges.');

  expect(compiled.querySelectorAll('#info li')[2].textContent).toEqual('You can Update an existing Challenge.');
  expect(compiled.querySelectorAll('#info li')[3].textContent).toEqual('You can view Details of each Challenge.');

});
it('should render in h3 tag', () => {
    const compiled = fixture.nativeElement;
  expect(compiled.querySelector('#home-heading h3' ).textContent).toEqual('Are You Ready To View Challenge?');
});
it('should render in anchor tag', () => {
    const compiled = fixture.nativeElement;
  expect(compiled.querySelector('#home-heading a' ).textContent).toEqual('Click here to View Challenge');
});
});
