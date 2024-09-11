import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Category } from '../../shared/interface/category.interface';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CategoryService } from '../../services/category.service';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialog,
} from '@angular/material/dialog';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-category-table',
  standalone: true,
  imports: [
    HeaderComponent,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    DatePipe,
    RouterLink,
    RouterLinkActive,
    MatButtonModule
  ],
  templateUrl: './category-table.component.html',
  styleUrl: './category-table.component.css'
})
export class CategoryTableComponent implements OnInit {
  displayedColumns: string[] = ['categoryImage', 'categoryName', 'words', 'lastModificationDate', 'action'];
  dataSource!: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public CategoryService: CategoryService, public dialog: MatDialog, public router: Router, public GlobalService: GlobalService) {
  }

  ngOnInit(): void {
    this.refreshDataSource();
  }

  refreshDataSource() {
    this.GlobalService.showSpinner = true;
    this.CategoryService.getAllCategories()?.then(
      (categories) => {
        this.dataSource = new MatTableDataSource(categories);
        this.GlobalService.showSpinner = false;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = function (data, filter: string): boolean {
          return data.categoryName.toLowerCase().includes(filter) || data.words.length.toString() == filter;
        };
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editCategory(identifier: string) {
    this.router.navigate([`/language-game/category-form/${identifier}`]);
  }

  deleteCategory(enterAnimationDuration: string, exitAnimationDuration: string, identifier: string): void {
    let dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(
      (res) => {
        if (res) {
          this.CategoryService.deleteCategory(identifier);
          this.refreshDataSource();
        }
      }
    )
  }

  getFormattedDate(categoryDate: any) {
    return new Date(categoryDate.seconds * 1000);
  }
}


@Component({
  selector: 'dialog-animations-example-dialog',
  template: `
  <h2 mat-dialog-title>Delete Category</h2>
<mat-dialog-content>
  Do you want to delete the category ?
</mat-dialog-content>
<mat-dialog-actions class="dialog-btn-container">
  <button  mat-flat-button
    color="accent" mat-dialog-close class="dialog-cancel-btn dialog-proceed-btn">Cancel</button>
  <button  mat-flat-button
    color="primary" [mat-dialog-close]="true" cdkFocusInitial class="dialog-proceed-btn">Proceed</button>
</mat-dialog-actions>
  `,
  standalone: true,
  styleUrl: './category-table.component.css',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) { }
}