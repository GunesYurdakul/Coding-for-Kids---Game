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

  right() {
    this.tes = "right"
  }

  up() {
    this.tes = "up"
  }

  down() {
    this.tes = "down"
  }

  function() {
    this.tes = "function"
  }

  unlock() {
    this.tes = "unlock"
  }
}
