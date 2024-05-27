import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { RestService } from 'src/app/services/rest.service';
import { StateService } from 'src/app/services/state.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  liked: boolean = false;
  Loginform: FormGroup;

  constructor(private _rest: RestService, private _cart: CartService, private _state: StateService, private _router:Router) {
    
    this.Loginform = new FormGroup({
      Username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      Password: new FormControl('', [Validators.minLength(5), Validators.maxLength(20)])
    })
  }

  ngOnInit(): void {

  }

  checktoken() {
    const token = localStorage.getItem('token');
    if (token) {
      this._state.token = token;
      this._state.decodeToken();
      this._router.navigate(['/cart']);
    }
  }

  Login() {
    this._rest.Login(this.Loginform.value).subscribe((data: any) => {
      console.log(data);
      localStorage.setItem('token', data.data);
      this._state.token = (data.data);
      this._state.decodeToken();
      this._router.navigate(['/cart']);
    }, err => {
      console.log(err);
    })
  }

  Show() {
    this.liked = !this.liked;
  }

}
