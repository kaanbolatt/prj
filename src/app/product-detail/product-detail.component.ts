import { Component, OnInit } from '@angular/core';
import { CommonHelper } from 'app/components/helpers/common-helper';
import { CommonService } from 'app/shared/services/common.service';
import { Router } from '@angular/router';
import { Products } from 'app/interfaces/product.interface';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  prodId: number;
  product: Products;


  constructor(public commonService: CommonService, public ch: CommonHelper, public router: Router) { }

  ngOnInit() {
    this.prodId = this.commonService.getProductId();
    if (!this.ch.isLoggedIn()) {
      this.gotoLoginPage();
      return;
    } else if (this.prodId == undefined) {
      this.ch.warningMessage("Ürün bulunamadı!");
      this.gotoHomePage();
      return;
    }
    this.getProductById();
  }

  getProductById() {
    this.commonService.getProductById(this.prodId).subscribe((res) => {
      this.product = res;

    })
  }

  gotoLoginPage() {
    this.router.navigate(['/login']);
  }

  gotoHomePage() {
    this.router.navigate(['/dashboard']);
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
        })
      } else {
      }
    })
  }

}
