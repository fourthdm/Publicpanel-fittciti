import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fittciti';

  scrolltop = document.getElementById("scrolltop");
  root = document.documentElement;

  scroll() {
    this.root.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
}
