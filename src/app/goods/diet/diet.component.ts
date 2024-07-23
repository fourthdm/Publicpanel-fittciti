import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.css']
})
export class DietComponent implements OnInit {

  Products: any[] = [];

  scrolltop = document.getElementById('scrolltop');
  rootelement = document.documentElement;

  scroll() {
    this.rootelement.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  constructor(private _rest: RestService, private _activateroute: ActivatedRoute, private _cart: CartService) { }

  ngOnInit(): void {
    this.fetchProducts(2, 3);
  }

  fetchProducts(Category_id: number, Brand_id: number): void {
    this._rest.BycategoryBrandid(Category_id, Brand_id).subscribe(
      (response: any) => {
        if (response.success) {
          this.Products = response.data;
        } else {
          response.message;
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  AllProducts() {
    // const Brand_id = this._activeroute.snapshot.paramMap.get('Brand_id');
    // console.log(Brand_id);
    this._rest.BycategoryBrandid(1, 5).subscribe((data: any) => {
      this.Products = data.data;
    }, (err: any) => {
      console.log(err);
    })
  }

  addToCart(product: any) {
    this._cart.addtoCart(product);
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
}