import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {
  @Input() Category_id: any;
  @Input() Brand_id: any;
  @Input() id: any;

  enquiry: any[] = [];
  enquiryform: FormGroup;

  AllCategory: any[] = [];
  AllBrand: any[] = [];
  AllProduct: any[] = [];

  constructor(private _rest: RestService, private fb: FormBuilder) {
    // this.enquiryform = new FormGroup({
    //   Name: new FormControl('', [Validators.required]),
    //   Email: new FormControl('', [Validators.required]),
    //   Mobileno: new FormControl('', [Validators.required]),
    //   Message: new FormControl('', [Validators.required])
    //   Date: new FormControl('', [Validators.required])
    // })
    // this.enquiryform = this.fb.group({
    //   Name: ['', [Validators.required]],
    //   Email: ['', [Validators.required, Validators.email]],
    //   Mobileno: ['', [Validators.required]],
    //   Product: ['', [Validators.required]],
    //   Category: ['', [Validators.required]],
    //   Brand: ['', [Validators.required]],
    //   Message: ['']
    // });

    this.enquiryform = this.fb.group({
      Name: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      Mobileno: ['', [Validators.required]],
      Products: [[], [Validators.required]],
      Categories: [[], [Validators.required]],
      Brands: [[], [Validators.required]],
      Message: [''],
      Review: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.getCategory();
    this.getbrand();
    this.getproduct();
  }

  Addcontact() {
    const formValue = this.enquiryform.value;
    formValue.Message = `Customer Interested to knowing about Products: ${formValue.Products.join(', ')}, Categories: ${formValue.Categories.join(', ')}, Brands: ${formValue.Brands.join(', ')}`;

    this._rest.enquiry(formValue).subscribe(
      (result: any) => {
        console.log(result);
        this.enquiry.push(result);
        this.enquiryform.reset();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  // Addcontact() {
  //   const formValue = this.enquiryform.value;
  //   formValue.Message = `Interested in Product: ${formValue.Product}, Category: ${formValue.Category}, Brand: ${formValue.Brand}`;

  //   this._rest.enquiry(formValue).subscribe(
  //     (result: any) => {
  //       console.log(result);
  //       this.enquiry.push(result);
  //       this.enquiryform.reset();
  //     },
  //     (err: any) => {
  //       console.log(err);
  //     }
  //   );
  // }
  // Addcontact() {
  //   this._rest.enquiry(this.enquiryform.value).subscribe((result: any) => {
  //     console.log(result);
  //     this.enquiry.push(result);
  //     this.enquiryform.reset();
  //   }, (err: any) => {
  //     console.log(err);
  //   })
  // }

  getproduct() {
    this._rest.products().subscribe((data: any) => {
      console.log(data);
      this.AllProduct = data.data
    }, (err: any) => {
      console.log(err);
    })
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

}