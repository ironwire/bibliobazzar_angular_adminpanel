import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../common/category';
import { CategoryService } from '../../../../services/category.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-newcategory',
  templateUrl: './add-newcategory.component.html',
  styleUrl: './add-newcategory.component.css'
})
export class AddNewcategoryComponent implements OnInit {

  categories: Category[] = [];

  clist: Category[] = [];


  category: Category = {
    id: 0,
    name: "",
    allParentIDs: "",
    enabled: true,
    parent: null,
    children: null,
  }


  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.listCategories();

  }

  listCategories() {
    this.categoryService.getCategoryList().subscribe(
      {
        next: (data: Category[]) => {
          this.categories = data;
          this.getHierarchicalCategories();
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      }

    );
  }

  getHierarchicalCategories() {
    this.categories.forEach((category) => {
      console.log(this.categories);
      if (category.allParentIDs === '') {
        this.clist.push(category);
        let children: Category[] = category.children;
        if (children.length > 0) {
          children.forEach((child) => {
            child.parent = category;
            child.name = '--' + child.name;
            this.clist.push(child);
            this.listChildren(child, 1);
          });
        }
      }
      console.log(this.clist);
    });
    this.clist.forEach((element) => {
      element.children = null;
    });

  }

  listChildren(parent: Category, sublevel: number): void {
    let newSublevel: number = sublevel + 1;
    let childs: Category[] = parent.children;
    childs.forEach((child) => {
      let tempString = "";
      for (let i = 0; i < newSublevel; i++) {
        tempString = tempString + '--';
      }
      child.parent = parent;
      child.name = tempString + child.name;
      this.clist.push(child);
      this.listChildren(child, newSublevel);
    });
  }

  parentLevelChange(parentId: number) { }

  addCategory(categoryForm: NgForm) {
    console.log(this.category);
    if (categoryForm.controls.parent.value === '0') {
      this.category.parent = null;
    }

    this.categoryService.addCategory(this.category).subscribe(
      {
        next: (data: Category) => console.log(data),
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      }

    );
  }
}