import { Component, Input, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { CartComponent } from '../cart/cart.component';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() Category_id: any;
  @Input() Brand_id: any;

  @Input() selectedBrand: any;

  errormessage: string = " ";

  @Input() liked: boolean = false;

  AllCategory: any[] = [];
  AllBrand: any[] = [];

  Wishlist: any[] = [];

  productList: any[] = [];
  pro: any;

  productQuantity: number = 1;

  @Input() index = -1;

  @Input() id = 0;
  Quantity = 1;

  Product_id: number = 0;

  cartitem: any[] = [];

  constructor(private _rest: RestService,
    private _cart: CartService,
    private _wishlist: WishlistService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {
    this.getproduct();
    this.getCategory();
    this.getbrand();
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }

  getproduct() {
    this._rest.products().subscribe((data: any) => {
      this.productList = data.data;
    }, (err: any) => {
      console.log(err);
    })

    this.productList.forEach((a: any) => {
      Object.assign(a, { quantity: 1, total: a.pricewithdiscount });
    });
  }

  getCategory() {
    this._rest.category().subscribe((data: any) => {
      // console.log(data);
      this.AllCategory = data.data;
    }, (err: any) => {
      console.log(err);
    })
  }

  getbrand() {
    this._rest.brand().subscribe((data: any) => {
      // console.log(data);
      this.AllBrand = data.data;
    }, (err: any) => {
      console.log(err);
    })
  }

  addToCart(product: any) {
    this._cart.addtoCart(product);
  }

  toggleWishlist(product: any) {
    const index = this.Wishlist.findIndex(item => item.id === product.id);
    if (index === -1) {
      this.addtowish(product);
      this.Wishlist.push(product);
    } else {
      const id = this.Wishlist[index].Product_id;
      this.removeFromWishlist(id);
      this.Wishlist.splice(index, 1);
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
      this.Wishlist = data.data
      // Optionally, update the Wishlist array here if needed
    }, (err: any) => {
      console.log(err);
    })
  }

  isInWishlist(product: any): boolean {
    return this.Wishlist.some((item: any) => item.id === product.id);
  }

  getButtonStyle(product: any): any {
    return {
      'color': this.isInWishlist(product) ? 'red' : 'white'
    };
  }

  avialble(product: any): boolean {
    return this.productList.some((item: any) => item.status === product.status);
  }

  getStyle(product: any): any {
    if (product.status == "1") {  
      return {
        'color': 'green',
        // 'text':'Product is in Stock',
        // 'border': '2px solid green'
      }
    } else if (product.status == "0") {
      return {
        'color': 'red',
        // 'text':'Product is in Stock',
        // 'border': '2px solid red'
      }
    }
  }

  addtowish(product: any) {
    this._wishlist.Addtowishlist(product.id).subscribe((cart: any) => {
      console.log(cart);
      this.Wishlist = cart.data
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

  Filter() {
    if (this.Category_id === 'All') {
      this.Category_id = null; // Set category ID to null to indicate no filter
    }
    if (this.Brand_id === 'All') {
      this.Brand_id = null; // Set brand ID to null to indicate no filter
    }
    this._rest.bycategoryandbrand({ Category_id: this.Category_id, Brand_id: this.Brand_id }).subscribe((data: any) => {
      if (data && data.data && data.data.length > 0) {
        console.log(data);
        this.productList = data.data;
      } else {
        this.productList = [];
      }
    },
      (err: any) => {
        console.log(err);
        this.errormessage = "Error occurred while fetching data."; // Set errorMessage for errors
      }
    )
  }

}