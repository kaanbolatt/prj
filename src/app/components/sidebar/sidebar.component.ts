import { Component, OnInit } from '@angular/core';
import { CommonHelper } from '../helpers/common-helper';
import { Route } from '@angular/router';
import { Role } from 'app/enums/role.enum';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Anasayfa', icon: 'dashboard', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(public ch: CommonHelper) { }

  ngOnInit() {
    if (this.ch.currentUser.roleId === Role.admin) {
      var newRoutes = {
        path: '/product-list', title: 'Ürün Yönetimi', icon: 'add_shopping_cart', class: ''
      }
      ROUTES.push(newRoutes)
      var newRoutes = {
        path: '/category-list', title: 'Kategori Yönetimi', icon: 'attach_file', class: ''
      }
      ROUTES.push(newRoutes)
    }
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
