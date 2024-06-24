import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

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

  // private apiKey = 'AIzaSyBqK-l4JiLYcOyqkl1epfDNUy3rajT-Il8'; // Replace with your API key
  // private placeId = 'ChIJrTLr-GyuEmsRBfy61i59si0'; // Replace with your Place ID

  // getReviews(): Observable<any> {
  //   const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${this.placeId}&fields=review&key=${this.apiKey}`;
  //   return this.http.get(url);
  // }


  // private apiKey = 'AIzaSyCJl4xqnDIODTC4Bj8Of_Tnzw5FqUXcuA0';
  // private apiUrl = 'https://maps.googleapis.com/maps/api/place/details/json';

  // getPlaceDetails(placeId: string): Observable<any> {
  //   const params = new HttpParams()
  //     .set('place_id', placeId)
  //     .set('fields', 'reviews')
  //     .set('key', this.apiKey);

  //   return this.http.jsonp(`${this.apiUrl}?${params.toString()}`, 'callback')
  //     .pipe(
  //       map((response: any) => response.result.reviews)
  //     );
  // }


  
}