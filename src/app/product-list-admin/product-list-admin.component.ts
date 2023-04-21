import { Component, OnInit } from '@angular/core';
import { CommonHelper } from 'app/components/helpers/common-helper';
import { CommonService } from 'app/shared/services/common.service';
import { Router } from '@angular/router';
import { Products } from 'app/interfaces/product.interface';
import { MatTableDataSource } from '@angular/material/table';
import { ProductFilterDto } from 'app/components/models/product-filter';
import { AddProductComponent } from 'app/add-product/add-product.component';
import { ActionTypes } from 'app/enums/action-types.enum';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'app/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-product-list-admin',
  templateUrl: './product-list-admin.component.html',
  styleUrls: ['./product-list-admin.component.css']
})
export class ProductListAdminComponent implements OnInit {
  prodId: number;
  products: Products[] = [];
  displayedColumns: string[] = ['name', 'shortDescription', 'price', 'islemler'];
  dataSource = new MatTableDataSource(null)
  productFilter = new ProductFilterDto();
  dialogRefNewProduct: any;

  constructor(public commonService: CommonService, public ch: CommonHelper, public router: Router, private matDialog: MatDialog) { }

  ngOnInit() {
    if (!this.ch.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.getAllProducts();
  }

  getAllProducts() {
    this.commonService.getAllProducts(this.productFilter).subscribe((res) => {
      this.products = res;
      this.dataSource = new MatTableDataSource(this.products);
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

  onAddProduct(): void {
    this.dialogRefNewProduct = this.matDialog.open(AddProductComponent, {
      disableClose: true,
      panelClass: 'contact-form-dialog',
      width: '600px',
      data: {
        action: ActionTypes.New
      }
    }).afterClosed().subscribe((res) => {
      if (res != undefined) {
        this.ch.successMessage("Ürün başarıyla eklendi.")
        this.getAllProducts();
      }
    })
  }

  onEditProduct(product): void {
    this.dialogRefNewProduct = this.matDialog.open(AddProductComponent, {
      disableClose: true,
      panelClass: 'contact-form-dialog',
      width: '600px',
      data: {
        action: ActionTypes.Edit,
        product: product
      }
    }).afterClosed().subscribe((res) => {
      if (res != undefined) {
        this.ch.successMessage("Ürün başarıyla güncellendi.")
        this.getAllProducts();
      }
    })
  }

  dialogRef: any;
  onDeleteProduct(product: Products): void {

    this.dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Ürün Sil',
        confirmMessage: ' [' + product.name + '] isimli ürünü silmek istediğinize emin misiniz?',
        nameLabel: 'Ürün Adı',
        toConfirmationMessage: 'Onaylıyorsanız lütfen, ürün adını alttaki kutuya yazın. [' + product.name + ']',
        textControl: product.name,
        persistMessage: 'Bu işlem kesinlikle geri alınamaz..',
        confirmButton: "Sil"
      }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.commonService.deleteProduct(product.id).subscribe(res => {
          this.ch.successMessage("Ürün silindi.")
          this.getAllProducts();
        });
      }
    });
  }

}
