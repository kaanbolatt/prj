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
  selector: 'app-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})

export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  action: ActionTypes;
  actionTypesEnum: typeof ActionTypes = ActionTypes;
  category: any;
  categories: any[] = [];
  dialogtitle: string;

  constructor(public matDialogRef: MatDialogRef<AddCategoryComponent>, public commonService: CommonService, public ch: CommonHelper, public router: Router, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.action = data.action as ActionTypes;
    this.category = data.category as Category;
  }

  ngOnInit() {
    this.createForm();
    if (this.action === ActionTypes.New) {
      this.dialogtitle = "Kategori Ekle";

    } else if (this.action === ActionTypes.Edit) {
      this.dialogtitle = "Kategori Güncelle";
      this.ch.mapToFormGroup(this.category, this.categoryForm);
    }
  }

  createForm() {
    this.categoryForm = this.ch.formBuilder.group({
      id: [0],
      name: ['', Validators.required],
      order: [1],
    })
  }

  get id() { return this.categoryForm.get('id'); }
  get name() { return this.categoryForm.get('name'); }
  get order() { return this.categoryForm.get('order'); }

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      return;
    }

    if (this.action === ActionTypes.New) {
      const category = {
        id: 0,
        name: this.name.value,
        order: this.order.value,
      }

      this.commonService.categoryAddOrUpdate(category).subscribe((res) => {

      });
    } else if (this.action === ActionTypes.Edit) {
      const category = {
        id: this.category.id,
        name: this.name.value,
        order: this.order.value,
      }
      this.commonService.categoryAddOrUpdate(category).subscribe((res) => {

      });
    }
  }

  onClose(): void {
    this.action = ActionTypes.Close;
    this.matDialogRef.close();
  }






}
