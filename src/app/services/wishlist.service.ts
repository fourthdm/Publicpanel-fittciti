import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Observable } from 'rxjs';
import { StateService } from './state.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  token = ''
  private wishlist: number[] = [];

  Wishlist: any[] = [];

  constructor(private _http: HttpClient,
    private _rest: RestService,
    private _state: StateService, private _route: Router) { }

  url = 'http://localhost:5000';
// url= 'https://adminpanel.fourthdm.com/node';

  // addToWishlist(productId: number): Observable<any> {
  //   return this._http.post<any>(this.url + '/AddWishlist', { productId });
  // }

  Addtowishlist(Product_id: number) {
    this._state.checktoken();
    const headers = new HttpHeaders({ 'x-access-token': this._state.token })
    const data = { Product_id: Product_id };
    return this._http.post(this.url + '/AddWishlist', data, { headers });
  }

  getwishlist() {
    this._rest.getwishlists().subscribe((cart: any) => {
      console.log(cart);
      this.Wishlist = cart.data
    }, (err: any) => {
      console.log(err);
      // this._route.navigate(['/login']);
    })
  }


  removeFromWishlist(Product_id: any) {
    this._rest.removewishlist(Product_id).subscribe((data: any) => {
      console.log(data);
      this.Wishlist = data.data;
      this.getwishlist();
    }, (err: any) => {
      console.log(err);
    })
  }

  // getWishlist(): number[] {
  //   // You can also fetch wishlist from localStorage here
  //   return this.wishlist;
  // }

}
 