import { Component, OnInit } from '@angular/core';
import { CommonHelper } from 'app/components/helpers/common-helper';
import { CommonService } from 'app/shared/services/common.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ActionTypes } from 'app/enums/action-types.enum';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'app/confirmation-dialog/confirmation-dialog.component';
import { Category } from 'app/interfaces/categories.interface';
import { AddCategoryComponent } from 'app/add-category/add-category.component';


@Component({
  selector: 'app-category-list-admin',
  templateUrl: './category-list-admin.component.html',
  styleUrls: ['./category-list-admin.component.css']
})
export class CategoryListAdminComponent implements OnInit {
  categoryId: number;
  categories: Category[] = [];
  displayedColumns: string[] = ['name', 'islemler'];
  dataSource = new MatTableDataSource(null)
  dialogRefNewCategory: any;

  constructor(public commonService: CommonService, public ch: CommonHelper, public router: Router, private matDialog: MatDialog) { }

  ngOnInit() {
    if (!this.ch.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.getAllCategories();
  }

  getAllCategories() {
    this.commonService.getAllCategories().subscribe((res) => {
      this.categories = res;
      this.dataSource = new MatTableDataSource(this.categories);
    })
  }

  gotoLoginPage() {
    this.router.navigate(['/login']);
  }

  gotoHomePage() {
    this.router.navigate(['/dashboard']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAddCategory(): void {
    this.dialogRefNewCategory = this.matDialog.open(AddCategoryComponent, {
      disableClose: true,
      panelClass: 'contact-form-dialog',
      width: '600px',
      data: {
        action: ActionTypes.New
      }
    }).afterClosed().subscribe((res) => {
      if (res != undefined) {
        this.ch.successMessage("Kategori başarıyla eklendi.")
        this.getAllCategories();
      }
    })
  }

  onEditCategory(category): void {
    this.dialogRefNewCategory = this.matDialog.open(AddCategoryComponent, {
      disableClose: true,
      panelClass: 'contact-form-dialog',
      width: '600px',
      data: {
        action: ActionTypes.Edit,
        category: category
      }
    }).afterClosed().subscribe((res) => {
      if (res != undefined) {
        this.ch.successMessage("Kategori başarıyla güncellendi.")
        this.getAllCategories();
      }
    })
  }

  dialogRef: any;
  onDeleteCategory(category: Category): void {

    this.dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Ürün Sil',
        confirmMessage: ' [' + category.name + '] isimli kategoriyi silmek istediğinize emin misiniz?',
        nameLabel: 'Ürün Adı',
        toConfirmationMessage: 'Onaylıyorsanız lütfen, kategori adını alttaki kutuya yazın. [' + category.name + ']',
        textControl: category.name,
        persistMessage: 'Bu işlem kesinlikle geri alınamaz..',
        confirmButton: "Sil"
      }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.commonService.deleteCategory(category.id).subscribe(res => {
          //todo burada sıkıntı var
          this.ch.successMessage("Kategori silindi.")
          this.getAllCategories();
        });
      }
    });
  }

}
