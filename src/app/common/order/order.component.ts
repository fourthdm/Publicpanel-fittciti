import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { RestService } from 'src/app/services/rest.service';

declare var Razorpay: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderData: any[] = [];
  public finalTotal !: number;

  constructor(private _rest: RestService,
    public _cart: CartService, private _router: Router, private _activateroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.orders();
    this.finalTotal = this._cart.getFinaltotalPrice();
  }

  cancelOrder(orderId: number | undefined) {
    orderId && this._rest.cancelorder(orderId).subscribe((result) => {
      if (result) {
        this.orders();
      }
    })
  }

  orders() {
    this._rest.Getorder().subscribe((data: any) => {
      console.log();
      this.orderData = data.data;
      this.orderData[data.Total_amount] = this.total();
    }, (err: any) => {
      console.log(err)
    })
  }


  total() {
    this._cart.getFinaltotalPrice();
  }

  paynow() {
    const razorpayoption = {
      description: 'sample razorpay demo',
      currency: 'INR',
      // amount: 200000,
      amount: this.finalTotal * 100,
      name: 'Fittciti',
      key: 'rzp_live_kFr6gQiD2PCk11',
      image: '/assets/logo.png',
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
