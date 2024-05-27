import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { RestService } from 'src/app/services/rest.service';
import { StateService } from 'src/app/services/state.service';

declare var Razorpay: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public products: any = [];
  public grandTotal !: number;
  public T !: any;
  public Savers !: any;

  public Total_Amount !: any;

  orderform: FormGroup;
  orderss: any[] = [];
  
  constructor(private _rest: RestService, private _cart: CartService, private _state: StateService) {
    this.orderform = new FormGroup({
      // Email: new FormControl('', [Validators.required]),
      Shipping_address: new FormControl('', [Validators.required]),
      Order_date : new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    // this._cart.getProducts().subscribe((data: any) => {
    //   console.log('Cart Products : ', data);
    //   this.products = data;
    //   this.T = this._cart.Gettotal();
    //   this.grandTotal = this._cart.getTotalPrice();
    //   this.Savers = this.T - this.grandTotal;
    // }, (err: any) => {
    //   console.log(err)
    // })
  }

  orders() {
    this._rest.placeorder().subscribe((data: any) => {
      console.log(data);
      this.orderss = data.data;
      this.Total_Amount = this._cart.getFinaltotalPrice;
    }, (err: any) => {
      console.log(err);
    })
  }

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


// import { Component } from '@angular/core';
// import { CartService } from '../services/cart.service';
// import { OrderService } from '../services/order.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-checkout',
//   templateUrl: './checkout.component.html',
//   styleUrls: ['./checkout.component.css']
// })
// export class CheckoutComponent {
//   cartItems: any[] = [];
//   totalAmount: number = 0;
//   shippingAddress: string = '';

//   constructor(
//     private cartService: CartService,
//     private orderService: OrderService,
//     private router: Router
//   ) {
//     this.cartService.getCartItems().subscribe((data: any[]) => {
//       this.cartItems = data;
//       this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
//     });
//   }

//   placeOrder() {
//     const order = {
//       cartItems: this.cartItems,
//       totalAmount: this.totalAmount,
//       shippingAddress: this.shippingAddress
//     };

//     this.orderService.placeOrder(order).subscribe(() => {
//       this.cartService.clearCart().subscribe(() => {
//         this.router.navigate(['/order']);
//       });
//     });
//   }
// }


// For backend

// const PDFDocument = require('pdfkit');
// const nodemailer = require('nodemailer');

// exports.placeOrder = async (req, res) => {
//   // Order creation logic

//   // Generate PDF
//   const doc = new PDFDocument();
//   doc.text('Order Details');
//   // Add order details to PDF

//   const buffers = [];
//   doc.on('data', buffers.push.bind(buffers));
//   doc.on('end', () => {
//     const pdfData = Buffer.concat(buffers);

//     // Send email
//     const transporter = nodemailer.createTransport({/* SMTP configuration */});
//     const mailOptions = {
//       from: 'your-email@example.com',
//       to: 'customer@example.com',
//       subject: 'Order Confirmation',
//       text: 'Thank you for your order!',
//       attachments: [{ filename: 'order.pdf', content: pdfData }]
//     };

//     transporter.sendMail(mailOptions, (err, info) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send('Error sending email');
//       } else {
//         console.log('Email sent: ' + info.response);
//         res.status(200).send('Order placed successfully');
//       }
//     });
//   });

//   doc.end();
// };
