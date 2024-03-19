import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbar } from '@angular/material/toolbar';
import { CategoryComponent } from './components/category/category.component';
import { AddNewcategoryComponent } from './components/add-newcategory/add-newcategory.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { ConfirmDialogComponent } from '../../common/components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CategoryListComponent } from './components/category-list/category-list.component';


@NgModule({
  declarations: [
    HeaderComponent,
    CategoryListComponent,
    CategoryComponent,
    AddNewcategoryComponent
  ],
  imports: [

    CommonModule,
    CategoryRoutingModule,
    MatToolbar,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    MatSortModule,
    MatIconModule,

    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
  ],

})
export class CategoryModule { }
