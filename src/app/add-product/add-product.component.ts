import { Component, OnInit, Inject } from '@angular/core';
import { CommonHelper } from 'app/components/helpers/common-helper';
import { CommonService } from 'app/shared/services/common.service';
import { Router } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { ActionTypes } from 'app/enums/action-types.enum';
import { Products } from 'app/interfaces/product.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from 'app/interfaces/categories.interface';

@Component({
  selector: 'app-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  action: ActionTypes;
  actionTypesEnum: typeof ActionTypes = ActionTypes;
  product: any;
  categories: Category[] = [];
  dialogtitle: string;

  constructor(public matDialogRef: MatDialogRef<AddProductComponent>, public commonService: CommonService, public ch: CommonHelper, public router: Router, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.action = data.action as ActionTypes;
    this.product = data.product as Products;
  }

  ngOnInit() {
    this.createForm();
    if (this.action === ActionTypes.New) {
      this.dialogtitle = "Ürün Ekle";

    } else if (this.action === ActionTypes.Edit) {
      this.dialogtitle = "Ürün Güncelle";
      this.ch.mapToFormGroup(this.product, this.productForm);
    }
  }

  createForm() {
    this.commonService.getAllCategories().subscribe((res) => {
      this.categories = res;
    })
    this.productForm = this.ch.formBuilder.group({
      id: ['0'],
      name: ['', Validators.required],
      categoryId: ['', Validators.required],
      detail: ['', Validators.required],
      shortDescription: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
    })
  }

  get id() { return this.productForm.get('id'); }
  get name() { return this.productForm.get('name'); }
  get categoryId() { return this.productForm.get('categoryId'); }
  get detail() { return this.productForm.get('detail'); }
  get shortDescription() { return this.productForm.get('shortDescription'); }
  get price() { return this.productForm.get('price'); }
  get image() { return this.productForm.get('image'); }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    if (this.action === ActionTypes.New) {
      const product = {
        id: 0,
        name: this.name.value,
        categoryId: this.categoryId.value,
        detail: this.detail.value,
        shortDescription: this.shortDescription.value,
        price: this.price.value,
        image: this.image.value,
      }

      this.commonService.productAddOrUpdate(product).subscribe((res) => {

      });
    } else if (this.action === ActionTypes.Edit) {
      const product = {
        id: this.product.id,
        name: this.name.value,
        categoryId: this.categoryId.value,
        detail: this.detail.value,
        shortDescription: this.shortDescription.value,
        price: this.price.value,
        image: this.image.value,
      }
      this.commonService.productAddOrUpdate(product).subscribe((res) => {

      });
    }
  }

  onClose(): void {
    this.action = ActionTypes.Close;
    this.matDialogRef.close();
  }






}
