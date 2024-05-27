import { Injectable, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RestService } from './rest.service';
import { HttpClient } from '@angular/common/http';
import { StateService } from './state.service';
import { Router } from '@angular/router';
import { WishlistService } from './wishlist.service';

declare var Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class CartService {

  @Input() id = 0;
  @Input() Quantity = 1;
  public cartItemList: any[] = [];
  public productlist: any[] = [];

  constructor(private _rest: RestService, private _http: HttpClient,
    private _route: Router, private _state: StateService, private _wishlist: WishlistService) { }


  getProducts() {
    this._rest.getcartItems().subscribe((cart: any) => {
      console.log(cart);
      this.cartItemList = cart.data
    }, (err: any) => {
      console.log(err);
      // this._route.navigate(['/login']);
    })
  }

  addtoCart(product: any) {
    this._rest.addtoCart(product.id, 1).subscribe(
      (cart: any) => {
        console.log(cart);
        this.cartItemList = cart.data;
      },
      (err: any) => {
        console.log(err);
        if (err.status === 404 && err.error.message === 'Product is not available') {
          console.log('Product is not available, adding to wishlist...');
          this._wishlist.Addtowishlist(product);
        } else {
          this._route.navigate(['/login']);
        }
      }
    );
  }



  // get totl price
  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.pricewithdiscount;
    })
    return grandTotal;
  }

  getFinaltotalPrice(): number {
    let finalTotal = 0;
    this.cartItemList.map((a: any) => {
      finalTotal += a.Total;
    })
    return finalTotal;
  }

  Gettotal(): number {
    let T = 0;
    this.cartItemList.map((a: any) => {
      T += a.Price;
    })
    return T;
  }

  // // remove single item
  // removeCartItem(product: any) {
  //   this.cartItemList.map((a: any, index: any) => {
  //     if (product.id === a.id) {
  //       this.cartItemList.splice(index, 1);
  //     }
  //   })
  //   this.productList.next(this.cartItemList)
  // }

  removeproduct(product: any) {
    this._state.checktoken();
    this._rest.deleteproductfromcart(product.Product_id).subscribe((data: any) => {
    })

    this.cartItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    })
    // this.productList.next(this.cartItemList)
  }

  // empty cart at a time
  removeAllCart() {
    this.cartItemList = [];
    // this.productList.next(this.cartItemList);
  }

  


}
