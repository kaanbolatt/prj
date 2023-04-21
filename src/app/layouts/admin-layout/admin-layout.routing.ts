import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { LoginComponent } from 'app/login/login.component';
import { ProductDetailComponent } from 'app/product-detail/product-detail.component';
import { ProductListAdminComponent } from 'app/product-list-admin/product-list-admin.component';
import { CategoryListAdminComponent } from 'app/category-list-admin/category-list-admin.component';
import { RegisterComponent } from 'app/register/register.component';

export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard', component: DashboardComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'product-detail', component: ProductDetailComponent },
    { path: 'product-list', component: ProductListAdminComponent },
    { path: 'category-list', component: CategoryListAdminComponent },
];
