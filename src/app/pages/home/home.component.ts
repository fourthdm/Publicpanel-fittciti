import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { CartComponent } from '../cart/cart.component';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productList: any[] = [];
  pro: any;

  scrolltop = document.getElementById("scrolltop");
  rootelement = document.documentElement;

  scroll() {
    this.rootelement.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  constructor(private _rest: RestService, private _cart: CartService, private _wishlist: WishlistService) { }

  ngOnInit(): void {
    this._rest.homeproduct().subscribe((data: any) => {
      this.productList = data.data;
    }, (err: any) => {
      console.log(err);
    })

    this.productList.forEach((a: any) => {
      Object.assign(a, { quantity: 1, total: a.pricewithdiscount });
    });
  }

  addToCart(product: any) {
    this._cart.addtoCart(product);
  }

  toggleWishlist(product: any) {
    const index = this._wishlist.Wishlist.findIndex(item => item.id === product.id);
    if (index === -1) {
      this.addtowish(product);
      this._wishlist.Wishlist.push(product);
    } else {
      const id = this._wishlist.Wishlist[index].Product_id;
      this.removeFromWishlist(id);
      this._wishlist.Wishlist.splice(index, 1);
    }
  }


  // toggleWishlist(product: any) {
  //   const index = this.Wishlist.findIndex(item => item.id === product.id);
  //   if (index === -1) {
  //     this.addtowish(product);
  //     this.Wishlist.push(product);
  //   } else {
  //     const Product_id = this.Wishlist[index].id; // Get the id of the product to remove
  //     this.removeFromWishlist(Product_id); // Call removeFromWishlist with product id
  //     this.Wishlist.splice(index, 1); // Remove the product from the Wishlist array
  //   }
  // }

  removeFromWishlist(Product_id: any) {
    this._rest.removewishlist(Product_id).subscribe((data: any) => {
      console.log(data);
      this._wishlist.Wishlist = data.data
      // Optionally, update the Wishlist array here if needed
    }, (err: any) => {
      console.log(err);
    })
  }

  isInWishlist(product: any): boolean {
    return this._wishlist.Wishlist.some((item: any) => item.id === product.id);
  }

  getButtonStyle(product: any): any {
    return {
      'color': this.isInWishlist(product) ? 'red' : 'white'
    };
  }

  addtowish(product: any) {
    this._wishlist.Addtowishlist(product.id).subscribe((cart: any) => {
      console.log(cart);
      this._wishlist.Wishlist = cart.data
    }, (err: any) => {
      console.log(err);
      // this._route.navigate(['/login']);
    })
  }

  // removeFromWishlist(Product_id: any) {
  //   this._rest.removewishlist(Product_id).subscribe((data: any) => {
  //     console.log(data);
  //     this.Wishlist = data.data;
  //     this.Wishlist;
  //   }, (err: any) => {
  //     console.log(err);
  //   })
  // }

}