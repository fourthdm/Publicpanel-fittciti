import { Component, OnInit } from '@angular/core';
import { NewcartService } from 'src/app/services/newcart.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

declare const google: any;

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {

  googleReviews: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchGoogleReviews();
  }

  fetchGoogleReviews() {
    const placeId = 'ChIJrTLr-GyuEmsRBfy61i59si0'; // Replace with the actual place ID
    const apiKey = 'AIzaSyBqK-l4JiLYcOyqkl1epfDNUy3rajT-Il8'; // Replace with your API key
    const url = `https://maps.googleapis.com/maps/api/place/details/json`;

    let params = new HttpParams()
      .set('place_id', placeId)
      .set('fields', 'reviews')
      .set('key', apiKey)
      .set('callback', 'JSONP_CALLBACK');

    this.http.jsonp(url,'callback').pipe(
      map((response: any) => response.result.reviews)
    ).subscribe((reviews: any[]) => { 
      this.googleReviews = reviews;
    });
  }


  // ngOnInit(): void {
  //   this.fetchGoogleReviews();
  // }

  // fetchGoogleReviews() {
  //   const placeId = 'YOUR_PLACE_ID'; // Replace with the actual place ID
  //   const apiKey = 'YOUR_API_KEY'; // Replace with your API key
  //   const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;

  //   this.http.get(url).subscribe((data: any) => {
  //     this.reviews = data.result.reviews;
  //   });
  // }
}