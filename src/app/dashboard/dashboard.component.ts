import { Component, OnInit, EventEmitter } from '@angular/core';
import { CommonHelper } from 'app/components/helpers/common-helper';
import { Products } from 'app/interfaces/product.interface';
import { CommonService } from 'app/shared/services/common.service';
import { Router } from '@angular/router';
import { Category } from 'app/interfaces/categories.interface';
import { ProductFilterDto } from 'app/components/models/product-filter';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: Products[] = [];
  categories: Category[] = [];
  productFilter = new ProductFilterDto();
  textSearch = "";

  basketItem: any[] = [];
  constructor(private commonService: CommonService, private ch: CommonHelper, private router: Router) { }

  ngOnInit() {
    if (!this.ch.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.getProductsFiltered(null);

    this.commonService.getAllCategories().subscribe((res) => {
      const allShow = {
        id: 999999,
        name: 'Tüm Ürünler'
      };
      this.categories.push(allShow)
      res.forEach(element => {
        this.categories.push(element)
        
      });
    });


  }

  gotoDetail(prodId: number) {
    this.commonService.setProductId(prodId);
    this.router.navigate(['/product-detail']);

  }

  getProductsFiltered(categorieId: number, searchText?: string) {
    if (categorieId != 999999) {
      this.productFilter.categoryId = categorieId;
    } else {
      this.productFilter.categoryId = null;
    }
    if (searchText != undefined && searchText != null && searchText.length > 0) {
      this.productFilter.generalSearch = searchText;
    } else {
      this.productFilter.generalSearch = null;
    }

    this.commonService.getAllProducts(this.productFilter).subscribe((res) => {
      this.products = res;
    });

  }

  findProduct() {
    this.getProductsFiltered(this.productFilter.categoryId, this.textSearch);
  }

  addBasket(prodId: number) {
    const data = {
      productId: prodId,
      userId: this.ch.currentUser.id
    }

    this.commonService.basketAdd(data).subscribe((res) => {
      if (res != "Böyle bir ürün satışta yok.") {
        this.ch.successMessage(res);
        this.commonService.getAllBasketItem(this.ch.currentUser.id).subscribe((res) => {
          this.commonService.basketItem(res);
          this.basketItem = res;
        });
      } else {

      }
    })
  }

}
