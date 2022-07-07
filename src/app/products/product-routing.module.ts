import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CanDeactivateGaurdService } from './can-deactivate-gaurd.service';
import { ProductDeleteComponent } from './product-delete/product-delete.component';
import { CanActivateService } from '../can-activate.service';



export const routes: Routes =[
    {path:'', component:ProductListComponent},
    {path: 'delete', component:ProductDeleteComponent, canActivate:[CanActivateService]},

    {path: 'new', component:ProductEditComponent,canActivate :[CanActivateService],canDeactivate : [CanDeactivateGaurdService]},
    {path: ':id', component:ProductDetailsComponent, canActivate:[CanActivateService]},

    {path:':id/edit', component:ProductEditComponent , canActivate:[CanActivateService],canDeactivate : [CanDeactivateGaurdService]}
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)],
    exports: [RouterModule]

})

export class ProductRoutingModule{

}