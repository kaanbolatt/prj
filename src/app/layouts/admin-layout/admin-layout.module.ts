import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from 'app/login/login.component';
import { ProductDetailComponent } from 'app/product-detail/product-detail.component';
import { ProductListAdminComponent } from 'app/product-list-admin/product-list-admin.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { AddProductComponent } from 'app/add-product/add-product.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ConfirmationDialogComponent } from 'app/confirmation-dialog/confirmation-dialog.component';
import { CategoryListAdminComponent } from 'app/category-list-admin/category-list-admin.component';
import { AddCategoryComponent } from 'app/add-category/add-category.component';
import { RegisterComponent } from 'app/register/register.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatToolbarModule
  ],
  declarations: [
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    ProductDetailComponent,
    ConfirmationDialogComponent,
    ProductListAdminComponent,
    CategoryListAdminComponent,
    AddProductComponent,
    AddCategoryComponent
  ]
})

export class AdminLayoutModule { }
