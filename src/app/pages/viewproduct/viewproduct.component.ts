import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {

  productList: any;
  mainImages: any[] = [];
  similarProducts: any[] = [];
  pro: any;
  cart: any[] = [];
  // product_id: any;

  productQuantity: number = 1;
  constructor(private _rest: RestService, private _cart: CartService, private _activeroute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.getproduct();
    // this.getsimilarproduct();
    this.getProductAndSimilar();
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }

  getproduct() {
    const id = this._activeroute.snapshot.paramMap.get('id');
    console.log(id);
    id && this._rest.productwithmain(id).subscribe((data: any) => {
      if (data.success) {
        this.productList = data.data;
        this.mainImages = data.data[0].mainimage.split(',');
        this.mainImages.reverse();
      } else {
        console.error('Error fetching product:', data.message);
      }
    }, (err: any) => {
      console.log(err);
    })

  }

  // getsimilarproduct() {
  //   const id = this._activeroute.snapshot.paramMap.get('id');
  //   console.log(id);
  //   id && this._rest.viewproductsss(id).subscribe((data: any) => {
  //     console.log(data);
  //     this.productList = data.data;
  //   }, (err: any) => {
  //     console.log(err);
  //   })
  // }

  // getSimilarProducts(id: string) {
  //   this._rest.viewproductsss(id).subscribe((similarData: any) => {
  //     console.log(similarData);
  //     this.similarProducts = similarData.data;
  //   }, (error: any) => {
  //     console.error('Error fetching similar products:', error);
  //   });
  // }

  // getProductAndSimilar() {
  //   const id = this._activeroute.snapshot.paramMap.get('id');
  //   if (!id) {
  //     console.error('Product id not found in route parameters');
  //     return;
  //   }

  //   this._rest.productwithmain(id).subscribe((productData: any) => {
  //     if (productData.success) {
  //       this.productList = productData.data;
  //       this.mainImages = productData.data[0].mainimage.split(',');
  //       this.mainImages.reverse();

  //       // Fetch similar products after getting the main product details
  //       // this.getSimilarProducts(id);

  //       this._rest.viewproductsss('product_id').subscribe((similarData: any) => {
  //         console.log(similarData);
  //         this.similarProducts = similarData;
  //       }, (error: any) => {
  //         console.error('Error fetching similar products:', error);
  //       });
  //     } else {
  //       console.error('Error fetching product:', productData.message);
  //     }
  //   }, (error: any) => {
  //     console.error('Error fetching product:', error);
  //   });
  // }

  getProductAndSimilar() {
    const id = this._activeroute.snapshot.paramMap.get('id');
    if (!id) {
      console.error('Product id not found in route parameters');
      return;
    }

    this._rest.productwithmain(id).subscribe((productData: any) => {
      if (productData.success) {
        this.productList = productData.data;
        this.mainImages = productData.data[0].mainimage.split(',');
        this.mainImages.reverse();

        // Fetch similar products after getting the main product details
        this.getSimilarProducts(id);
      } else {
        console.error('Error fetching product:', productData.message);
      }
    }, (error: any) => {
      console.error('Error fetching product:', error);
    });
  }

  getSimilarProducts(product_id: string) {
    this._rest.viewproductsss(product_id).subscribe((similarData: any) => {
      console.log(similarData);
      this.similarProducts = similarData;
    }, (error: any) => {
      console.error('Error fetching similar products:', error);
    });
  }

  addToCart(product: any) {
    this._cart.addtoCart(product);
  }
  
}