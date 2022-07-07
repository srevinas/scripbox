import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './about/about.component';
import { HeaderComponent, ViewProfile, LogoutSuccess } from './header/header.component';
import { ProductsModule } from './products/products.module';
import { AuthComponent, AuthSuccess } from './auth/auth/auth.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from '@angular/material/tooltip';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HeaderComponent,
    AuthComponent,
    ViewProfile,
    AuthSuccess,
    LogoutSuccess,
    FooterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ProductsModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
  ],
  entryComponents:[
    ViewProfile,
    AuthSuccess,
    LogoutSuccess
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
