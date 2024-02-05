import { MatTableDataSource } from '@angular/material/table';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from '../../../../common/category';
import { CategoryService } from '../../../../services/category.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { PageEvent } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})

export class CategoryListComponent implements OnInit {

  totalElements: number = 0;
  filterValue: string = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['Category ID', 'Category Name', 'Enabled', 'Action'];

  categories: Category[] = [];
  dataSource: any;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories({ page: "0", size: "5" });
  }

  private getCategories(request) {
    this.categoryService.getAllCategories(request)
      .subscribe(
        {
          next: (data) => {
            console.log(data['_embedded'].categoryList);
            this.totalElements = data['page'].totalElements;
            this.dataSource = new MatTableDataSource(data['_embedded'].categoryList);
          },
          error: (e) => console.error(e),
          complete: () => console.info('complete')
        });

  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.loadCategoryPage()
        )).subscribe();

  }

  loadCategoryPage() {
    if (this.filterValue === "")
      this.getCategories({ page: this.paginator.pageIndex, size: this.paginator.pageSize });
    else
      this.getCategories({ page: this.paginator.pageIndex, size: this.paginator.pageSize, keyword: this.filterValue });
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();
    this.getCategories({ page: "0", size: "5", keyword: this.filterValue });
  }

  deleteCategory(element) {
    console.log(element);
  }

  hasChildren(someone: Category): boolean {
    if (someone.children !== null && someone.children.length !== 0) {
      return true;
    }
    return false;

  }
}

