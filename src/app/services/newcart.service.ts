import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewcartService {

  cartDataServer = []

  constructor(private http: HttpClient) { }

  // private CalculateTotal() {
  //   let Total = 0;
  //   this.cartDataServer.data.forEach(p => {
  //     const { numInCart } = p;
  //     const { price } = p.product;
  //     // @ts-ignore
  //     Total += numInCart * price;
  //   });
  //   this.cartDataServer.total = Total;
  //   this.cartTotal$.next(this.cartDataServer.total);
  // }

  private apiKey = 'AIzaSyBqK-l4JiLYcOyqkl1epfDNUy3rajT-Il8'; // Replace with your API key
  private placeId = 'ChIJrTLr-GyuEmsRBfy61i59si0'; // Replace with your Place ID

  getReviews(): Observable<any> {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${this.placeId}&fields=review&key=${this.apiKey}`;
    return this.http.get(url);
  }

}