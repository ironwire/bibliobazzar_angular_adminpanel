import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductHeaderComponent } from './components/product-header/product-header.component';
import { ProductAddNewComponent } from './components/product-add-new/product-add-new.component';
import { MatToolbar } from '@angular/material/toolbar';
import { ProductComponent } from './components/product/product.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CustomStepperComponent } from './components/custom-stepper/custom-stepper.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { DragDirective } from './drag.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ShowBookImagesDialogComponent } from './components/show-book-images-dialog/show-book-images-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ImageCarouselComponent } from './components/image-carousel/image-carousel.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductHeaderComponent,
    ProductAddNewComponent,
    ProductComponent,
    CustomStepperComponent,
    DragDirective,
    ShowBookImagesDialogComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatToolbar,
    MatFormField,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatPaginatorModule,
    MatDialogModule,
    ImageCarouselComponent,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class ProductModule {}
