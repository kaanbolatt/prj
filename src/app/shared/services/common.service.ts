import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { ProductFilterDto } from 'app/components/models/product-filter';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private baseURL = environment.apiUrl
  prodId: number;



  constructor(private http: HttpClient) { }

  setProductId(prodId) {
    this.prodId = prodId;
  }

  getProductId() {
    return this.prodId;
  }

  categoryAddOrUpdate(data: any): Observable<any> {
    return this.http.post(this.baseURL + 'CategoryAddOrUpdate', data, { responseType: 'text' })
  }

  basketAdd(data: any): Observable<any> {
    return this.http.post(this.baseURL + 'BasketAdd', data, { responseType: 'text' })
  }

  getAllBasketItem(userId: number): Observable<any> {

    return this.http.get(this.baseURL + 'GetBasketList?userId=' + userId)
  }

  productAddOrUpdate(data: any): Observable<any> {
    return this.http.post(this.baseURL + 'ProductAddOrUpdate', data, { responseType: 'text' })
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}Register`, data, { responseType: 'text' })
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}Login`, data)
  }

  getAllCategories(): Observable<any> {
    return this.http.get(this.baseURL + 'GetAllCategories')
  }

  getAllProducts(model: ProductFilterDto): Observable<any> {
    if (model.categoryId > 1 && (model.generalSearch == null || model.generalSearch == undefined)) {
      return this.http.get(this.baseURL + 'GetAllProducts?CategoryId=' + model.categoryId)
    } else if (model.categoryId > 0 && model.generalSearch != undefined && model.generalSearch != null) {
      return this.http.get(this.baseURL + 'GetAllProducts?CategoryId=' + model.categoryId + '&GeneralSearch=' + model.generalSearch);
    } else if (model.generalSearch != undefined && model.generalSearch != null) {
      return this.http.get(this.baseURL + 'GetAllProducts?GeneralSearch=' + model.generalSearch)
    }
    return this.http.get(this.baseURL + 'GetAllProducts')
  }

  getProductById(id): Observable<any> {
    return this.http.get(this.baseURL + 'GetProductById?id=' + id)
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}ProductDelete?id=${id}`, { responseType: 'text' })
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}CategoryDelete?id=${id}`, { responseType: 'text' })
  }

  deleteBasketItem(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}BasketProductDelete?id=${id}`, { responseType: 'text' })
  }

  allBasketProductDelete(userId: number): Observable<any> {
    return this.http.delete(`${this.baseURL}AllBasketProductDelete?userId=${userId}`, { responseType: 'text' })
  }
  basketItemSubscription = new EventEmitter<any[]>();
  loginSubscription = new EventEmitter<boolean>();

  public basketItem(basketItems: any) {
    this.basketItemSubscription.emit(basketItems);
  }

  public loginSubs(bool: boolean) {
    this.loginSubscription.emit(bool);
  }
}