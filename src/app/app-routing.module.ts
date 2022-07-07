import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthComponent } from './auth/auth/auth.component';


const routes: Routes = [
  { path: '' , component: AboutComponent},
  { path: 'signin' , component: AuthComponent},

  {path:'products', loadChildren:'./products/products.module#ProductsModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
