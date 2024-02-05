import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { HeaderComponent } from './components/header/header.component';
import { CategoryComponent } from './components/category/category.component';
import { AddNewcategoryComponent } from './components/add-newcategory/add-newcategory.component';

const routes: Routes = [
  {
    path: '', component: CategoryComponent, children: [
      { path: 'listCategory', component: CategoryListComponent },
      { path: 'addNewCategory', component: AddNewcategoryComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
