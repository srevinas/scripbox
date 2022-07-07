import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductRoutingModule } from './product-routing.module';
import {MatCardModule} from '@angular/material/card';
import { MatCheckboxModule } from '@angular/Material';
import { ProductEditComponent, DialogCanDeactive, DialogSuccess } from './product-edit/product-edit.component'
import {MatInputModule} from '@angular/material/input';
import { ProductDetailsComponent } from './product-details/product-details.component';
import {MatSelectModule} from '@angular/material/select';
import { CanDeactivateGaurdService } from './can-deactivate-gaurd.service';
import {MatDialogModule} from '@angular/material/dialog';
import { FilterByNamePipe } from './filter-by-name.pipe';
import { ProductDeleteComponent, DialogSuccessDelete } from './product-delete/product-delete.component';
import { CanActivateService } from '../can-activate.service';
import {MatTooltipModule} from '@angular/material/tooltip';




@NgModule({
  declarations: [
    ProductListComponent,
    ProductEditComponent,
    ProductDetailsComponent,
    DialogCanDeactive,
    DialogSuccess,
    FilterByNamePipe,
    ProductDeleteComponent,
    DialogSuccessDelete
  ],

  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatTooltipModule
   
  ],
  entryComponents: [
    DialogCanDeactive,
    DialogSuccess,
    DialogSuccessDelete
  ],
  providers : [CanDeactivateGaurdService,
    CanActivateService]
})
export class ProductsModule { }
