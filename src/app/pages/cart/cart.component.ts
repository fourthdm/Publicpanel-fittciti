import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { RestService } from 'src/app/services/rest.service';

declare var Razorpay: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  // public products: any = [];
  // cartItemList: any[] = [];

  // Total: number = 0;

  // public grandTotal !: number;
  // public T !: any;
  // public Savers !: any;
  // public totalss !: any;

  // public finalTotal !: any; productQuantity: number = 1;

  // quantityform: FormGroup;

  public products: any = [];
  cartItemList: any[] = [];

  Total: number = 0;

  public grandTotal !: number;
  public T !: any;
  public Savers !: any;
  Quantity: number = 1
  public finalTotal !: any;

  neworder: any[] = [];

  constructor(public _cart: CartService, private _route: Router, private _rest: RestService, private http: HttpClient) {
    // this.quantityform = new FormGroup({
    //   id: new FormControl(''),
    //   Quantity: new FormControl('', [Validators.required])
    // })
  }

  ngOnInit(): void {
    this.products.Product_id = 'Product_id'; // Replace with your product ID
    this.products.Quantity = 'Quantity';

    this.getcarts();

    this._cart.getProducts();
  }

  increaseQuantity(productId: string) {
    this._rest.increaseQuantity(productId).subscribe(
      response => {
        // Handle success, e.g., show a success message or update the UI
        console.log('Quantity increased successfully');
        // Refresh the cart data
        this.getcarts();
      },
      error => {
        // Handle error, e.g., show an error message
        console.error('Failed to increase quantity');
      }
    );
  }

  decreaseQuantity(productId: string) {
    this._rest.decreaseQuantity(productId).subscribe(
      response => {
        // Handle success, e.g., show a success message or update the UI
        console.log('Quantity decreased successfully');
        // Refresh the cart data
        this.getcarts();
      },
      error => {
        // Handle error, e.g., show an error message
        console.error('Failed to decrease quantity');
      }
    );
  }

  recalculatetotal() {
    this.Total = 0;
    this.products.forEach((product: any) => {
      this.Total += (product.pricewithdiscount * product.Quantity);
    })
  }

  // addtocart(product: any) {
  //   this.products.push(product);
  //   this.recalculatetotal();
  // }

  getcarts() {
    this._rest.getcartItems().subscribe((data: any) => {
      console.log(data);
      this.products = data.data;
      this.finalTotal = this.getFinaltotalPrice();
      this.T = this.Gettotal();
      this.grandTotal = this.getTotalPrice();
      this.Savers = this.T - this.grandTotal;
    }, (err: any) => {
      console.log(err);
    })
  }

  // get totl price
  getTotalPrice(): number {
    let grandTotal = 0;
    this.products.map((a: any) => {
      grandTotal += a.pricewithdiscount;
    })
    return grandTotal;
  }

  getFinaltotalPrice(): number {
    let finalTotal = 0;
    this.products.map((a: any) => {
      finalTotal += a.Total;
    })
    return finalTotal;
  }

  Gettotal(): number {
    let T = 0;
    this.products.map((a: any) => {
      T += a.Price;
    })
    return T;
  }

  emptycart(Cart_id: any) {
    if (confirm('Are you want to delete the cart')) {
      this._rest.deletecart(Cart_id).subscribe((data: any) => {
        console.log(data);
        this.products = data.data;
        this.getcarts();
        this._route.navigate(['/product']);
      }, (err: any) => {
        console.log(err);
      })
    }
  }

  removeItem(Product_id: any) {
    this._rest.deleteproductfromcart(Product_id).subscribe((data: any) => {
      console.log(data);
      this.products = data.data;
      this.getcarts();
    }, (err: any) => {
      console.log(err);
    })
  }

  // handleQuantity(val: string) {
  //   if (this.Quantity < 20 && val === 'plus') {
  //     this.Quantity += 1;
  //   } else if (this.Quantity > 1 && val === 'min') {
  //     this.Quantity -= 1;
  //   }
  // }



  placeOrder() {
    this._rest.placeorder().subscribe(
      (response) => {
        console.log('Order placed successfully', response);
        // Handle success
        this.neworder.push();
      },
      (error) => {
        console.error('Error placing order', error);
        // Handle error
      }
    );
  }

  // sendEmail() {
  //   this._rest.sendEmail(1).subscribe(
  //     response => console.log('Email sent successfully', response),
  //     error => console.error('Error sending email', error)
  //   );
  // }

  paynow() {
    const razorpayoption = {
      description: 'sample razorpay demo',
      currency: 'INR',
      // amount: 200000,
      amount: this.grandTotal * 100,
      name: 'Fittciti',
      key: 'rzp_live_kFr6gQiD2PCk11',
      image: 'https://t4.ftcdn.net/jpg/06/09/50/93/360_F_609509369_6xlux7VFjFMb0pORhdrJG4zdyn4s6EHO.jpg',
      prefill: {
        name: 'Fittciti',
        email: 'fittciti@gmail.com',
        phone: '020 4124 2513'
      },
      theme: {
        color: '#'
      },
      modal: {
        ondismiss: () => {
          console.log('dismissed')
        }
      }
    }
    const successCallback = (paymentid: any) => {
      console.log(paymentid)
    }
    const failurecallback = (e: any) => {
      console.log(e);
    }
    Razorpay.open(razorpayoption, successCallback, failurecallback)
  }
}