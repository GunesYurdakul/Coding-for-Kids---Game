import { Component } from '@angular/core';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

  tes = "can";
  list = [[0,1]]
  constructor() {
  }
  left() {
    this.tes = "left"
    this.list.push([0,-1]);
    
  }

  right() {
    this.tes = "right"
    this.list.push([0,1]);
    
  }

  up() {
    this.tes = "up"
    this.list.push([1,0]);
    
  }

  down() {
    this.tes = "down"
    this.list.push([-1,0]);
    
  }

  function() {
    this.tes = "function"
    
  }

  unlock() {
    this.tes = "unlock"
    this.list.push([2,2]);
    
  }
}
