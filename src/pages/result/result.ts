import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';


@Component({
  selector: 'page-result',
  templateUrl: 'result.html'
})
export class ResultPage {
  selectedItem: any;
  image = ''

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    if(this.selectedItem[1]){
        this.image="assets/imgs/green.png"
        var interval = setTimeout(() => {
            this.navCtrl.push(HelloIonicPage, {
                item: this.selectedItem[0]
              });  
          }, 1000);
        
    
    }
    else{
        this.image="assets/imgs/red.png"        
        var interval = setTimeout(() => {
            this.navCtrl.push(HelloIonicPage, {
                item: this.selectedItem[0]
              });  
          }, 1000);
        
    }
  }
}
