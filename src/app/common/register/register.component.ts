import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerform: FormGroup;
  user: any[] = [];

  constructor(private _rest: RestService, private _state: StateService, private _router: Router) {
    this.registerform = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Username: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required]),
      Address: new FormControl('', [Validators.required]),
      Mobileno: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {

  }

  register() {
    this._rest.Registeration(this.registerform.value).subscribe((result: any) => {
      console.log(result);
      this.user.push(result);
      this.registerform.reset();
      this._router.navigate(['/cart']);
    }, (err: any) => {
      console.log(err);
    })
  }
}
