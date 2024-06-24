import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from './state.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  product: any[] = [];
  report: any[] = [];
  cartData = new EventEmitter<any[] | []>();

  constructor(private http: HttpClient, private _router: Router, private _state: StateService) { }
  token = ''
  // cartData:any[]=[];

  url = 'http://localhost:5000';
  // url= 'https://adminpanel.fourthdm.com/node';

  Login(data: any) {
    return this.http.post(this.url + '/login', data);
  }

  Registeration(data: any) {
    return this.http.post(this.url + '/Registeration', data); //Registeration form
  }

  enquiry(data: any) {
    return this.http.post(this.url + '/Contact', data); //Fill the contact form 
  }

  category() {
    return this.http.get(this.url + '/Allcategory') //All category
  }

  brand() {
    return this.http.get(this.url + '/AllBrands'); //All Brands
  }

  products() {
    return this.http.get(this.url + '/AllProducts'); //All Products
  }

  homeproduct() {
    return this.http.get(this.url + '/homeProduct'); //Products for Homepage 6 products...
  }

  productwithmain(id: string) {
    return this.http.get(this.url + '/product/' + id); //Viewproductby specificId...
  }

  viewproductsss(product_id: string) {
    return this.http.get(this.url + '/api/products/similar/' + product_id);
  }

  // bycategoryandbrand(data: any) {
  //   return this.http.post(this.url + '/Productbycategoryandbrand', data);
  // }

  bycategoryandbrand(data: any) {
    return this.http.post(this.url + '/FillterProducts', data); //
  }

  bybrandid(Brand_id: number) {
    return this.http.get(this.url + '/Productbybrand/' + Brand_id);
  }

  // Addorder(Cart_id: number, orders: any) {
  //   this._state.checktoken();
  //   const headers = new HttpHeaders({ 'x-access-token': this._state.token });
  //   const data = { Cart_id: Cart_id, orders: orders };
  //   return this.http.post(this.url + '/Addorders', data, { headers })
  // }

  Addorder(data: any) {
    this._state.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this._state.token });
    // const data = { Cart_id: Cart_id, orders: orders };
    return this.http.post(this.url + '/Addordersssss', data, { headers })
  }

  Getorder() {
    this._state.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this._state.token })
    return this.http.get(this.url + '/Orders/', { headers });
  }

  cancelorder(id: number) {
    this._state.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this._state.token })
    return this.http.delete(this.url + '/cancelorder/' + id, { headers });
  }

  getcartItems() {
    this._state.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this._state.token });
    return this.http.get(this.url + '/getCartItems', { headers });
  }

  addtoCart(Product_id: number, Quantity: number) {
    this._state.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this._state.token });
    const data = { Product_id: Product_id, Quantity: Quantity };
    return this.http.post(this.url + '/ACartsss', data, { headers });
  }

  increaseQuantity(productId: string): Observable<any> {
    // const url = `/AddCart`; // Adjust the URL as necessary
    this._state.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this._state.token });
    const body = { Product_id: productId, Quantity: 1 }; // Assuming you want to increase by 1
    return this.http.post(this.url + '/ACartsss', body, { headers });
  }

  decreaseQuantity(productId: string): Observable<any> {
    this._state.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this._state.token });
    // const url = `/ACartsss`; // Adjust the URL as necessary
    const body = { Product_id: productId, Quantity: -1 }; // Assuming you want to decrease by 1
    return this.http.post(this.url + '/ACartsss', body, { headers });
  }

  updatequantity(Product_id: number, Quantity: number, action: string) {
    this._state.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this._state.token });
    const data = { Product_id: Product_id, Quantity: action === 'increase' ? 1 : -1 };
    return this.http.post('/AddCart', data, { headers });
  }

  deleteproductfromcart(Product_id: number) {
    this._state.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this._state.token })
    return this.http.delete(this.url + '/DeletebyProduct/' + Product_id, { headers });
  }

  deletecart(Cart_id: number) {
    this._state.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this._state.token })
    return this.http.delete(this.url + '/Emptycart/' + Cart_id, { headers });
  }

  getwishlists() {
    this._state.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this._state.token })
    return this.http.get(this.url + '/Wishlist', { headers });
  }

  removewishlist(Product_id: number) {
    this._state.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this._state.token })
    return this.http.delete(this.url + '/Deletewshlistbyproduct/' + Product_id, { headers });
  }

  Users() {
    this._state.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this._state.token });
    return this.http.get(this.url + '/Information', { headers });
  }

  Updateusers(data: any) {
    this._state.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this._state.token });
    return this.http.put(this.url + '/Updateuser/' + data.User_id, data, { headers });
  }


  placeorder() {
    this._state.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this._state.token });
    // const data = { Cart_id: Cart_id, orders: orders };
    return this.http.post(this.url + '/place-order', { headers })
  }


  // searchProduct(query: string) {
  //   return this.http.get(this.url + '/Product?q=${query}')
  // }


}