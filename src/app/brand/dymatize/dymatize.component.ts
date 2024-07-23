import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { RestService } from 'src/app/services/rest.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-dymatize',
  templateUrl: './dymatize.component.html',
  styleUrls: ['./dymatize.component.css']
})
export class DymatizeComponent implements OnInit {

  @Input() Category_id: any;
  @Input() Brand_id: any;

  @Input() liked: boolean = false;
  errormessage: string = " ";

  AllCategory: any[] = [];
  AllBrand: any[] = [];

  Wishlist: any[] = [];

  productList: any[] = [];
  pro: any;

  @Input() index = -1;

  constructor(private _rest: RestService, private _cart: CartService,
    private _wishlist: WishlistService, private _activateroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCategory();
    this.getbrand();
    this.in2();
    this.getproduct();
  }

  in2() {
    // const Brand_id = this._activeroute.snapshot.paramMap.get('Brand_id');
    // console.log(Brand_id);
    this._rest.bybrandid(4).subscribe((data: any) => {
      this.productList = data.data;
    }, (err: any) => {
      console.log(err);
    })
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
      console.log(data);
      this.AllCategory = data.data;
    }, (err: any) => {
      console.log(err);
    })
  }

  getbrand() {
    this._rest.brand().subscribe((data: any) => {
      console.log(data);
      this.AllBrand = data.data;
    }, (err: any) => {
      console.log(err);
    })
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


  addtowish(product: any) {
    this._wishlist.Addtowishlist(product.id).subscribe((cart: any) => {
      console.log(cart);
      this.Wishlist = cart.data
    }, (err: any) => {
      console.log(err);
      // this._route.navigate(['/login']);
    })
  }

  // togglelikes(id: number) {
  //   this._rest.addwish(id).subscribe((data: any) => {
  //     console.log(data);
  //     this.togglelike(id);
  //     this.Wishlist = data.data;
  //     this.liked = !this.liked; // Move the toggle inside the subscription block
  //   }, (err: any) => {
  //     console.log(err)
  //   });
  // }

  togglelikes(i: number) {
    this.togglelike(i);
  }

  togglelike(i: number) {
    this.productList[i].liked = !this.productList[i].liked;
  }

  addToCart(product: any) {
    this._cart.addtoCart(product);
  }

  Filter() {
    this._rest.bycategoryandbrand({ Category_id: this.Category_id, Brand_id: this.Brand_id }).subscribe((data: any) =>
    // {
    //   console.log(data);
    //   this.productList = data.data;
    // }, (err: any) => {
    //   console.log(err);
    // }
    {
      if (data && data.data && data.data.length > 0) {
        console.log(data);
        this.productList = data.data;
      } else {
        console.log("Data not found in the table.");
        this.errormessage = "Data not found in the table."; // Set errorMessage
      }
    },
      (err: any) => {
        console.log(err);
        this.errormessage = "Error occurred while fetching data."; // Set errorMessage for errors
      }
    )
  }

}
