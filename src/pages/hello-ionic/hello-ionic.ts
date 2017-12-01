import { Component } from '@angular/core';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

  tes = "can";
  constructor() {

  }

  left() {
    this.tes = "left"
  }

}
