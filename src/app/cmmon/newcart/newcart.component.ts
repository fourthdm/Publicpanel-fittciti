import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';
import { StateService } from 'src/app/services/state.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-newcart',
  templateUrl: './newcart.component.html',
  styleUrls: ['./newcart.component.css']
})
export class NewcartComponent implements OnInit {

  Users: any[] = [];
  Wishlist: any[] = [];

  selecteduser: any = null;

  updateuserform: FormGroup;

  constructor(private _rest: RestService, private _state: StateService, public _wishlist: WishlistService) {
    this.updateuserform = new FormGroup({
      User_id: new FormControl(),
      Name: new FormControl('', [Validators.required]),
      Username: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required]),
      Address: new FormControl('', [Validators.required]),
      Mobileno: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.getusers();
    this.getwishlist();
  }

  getusers() {
    this._rest.Users().subscribe((data: any) => {
      console.log(data);
      this.Users = data.data
    }, err => {
      console.log(err);
    })
  }

  getwishlist() {
    this._wishlist.getwishlist();
  }


  removeFromWishlist(Product_id: any) {
    this._rest.removewishlist(Product_id).subscribe((data: any) => {
      console.log(data);
      // this.Wishlist = data.data;
      // this.Wishlist;
      this.getwishlist();
    }, (err: any) => {
      console.log(err);
    })
  }

  edituser(i: number) {
    this.selecteduser = 1;
    this.updateuserform.patchValue(this.Users[i - 1]);
  }

  Updateuser() {
    this._rest.Updateusers(this.updateuserform.value).subscribe((data: any) => {
      console.log(data);
      this.selecteduser = null;
      this.updateuserform.reset();
      this.ngOnInit();
    }, (err: any) => {
      console.log(err);
    })
  }
  
}