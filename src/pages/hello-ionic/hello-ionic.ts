import { Component } from '@angular/core';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})

export class HelloIonicPage {

  tes = "can";
  list = []
  command_names=[]
  function_list=[]
  function_command_names=[]  
  is_function=0
  constructor() {
  }
  left() {
    
    if(this.is_function){
      this.tes = "left"
      this.function_list.push([0,-1]);
      this.function_command_names.push("arrow-back");
    }
    else{
      this.tes = "left"
      this.list.push([0,-1]);
      this.command_names.push("arrow-back");
    }
  }

  right() {
    if(this.is_function){
      this.tes = "right"
      this.function_list.push([0,1]);
      this.function_command_names.push("arrow-forward");
    }
    else{
      this.tes = "right"
      this.list.push([0,1]);
      this.command_names.push("arrow-forward");
    }
  }

  up() {

    if(this.is_function){
      this.tes = "up"
      this.function_list.push([1,0]);
      this.function_command_names.push("arrow-up");
    }
    else{
      this.tes = "up"
      this.list.push([1,0]);
      this.command_names.push("arrow-up");
    }
    
  }

  down() {

    if(this.is_function){
      this.tes = "down"
      this.function_list.push([1,0]);
      this.function_command_names.push("arrow-down");
    }
    else{
      this.tes = "down"
      this.list.push([-1,0]);
      this.command_names.push("arrow-down");  
    }
    
    
  }

  function() {
    
    if(this.is_function){
      this.tes = "function"
      this.function_list.push([3,3]);
      this.function_command_names.push("albums");
    }
    else{
      this.tes = "function"
      this.list.push([3,3]);
      this.command_names.push("albums");
    }

    for(let entry of this.list)
    {
      this.tes+=" "
      this.tes += entry
    }
  }

  unlock() {
    if(this.is_function){
      this.tes = "unlock"
      this.function_list.push([2,2]);
      this.function_command_names.push("unlock");
    }
    else{
      this.tes = "unlock"
      this.list.push([2,2]);
      this.command_names.push("unlock");
    }
    
  }

  set_function(){
    this.is_function=1    
  }

  reset_function(){
    this.is_function=0   
  }
  delete_function(icon){
    let counter=0
      while(this.function_command_names[counter]!=icon){
        counter++
      }
      this.function_command_names.splice(counter,1)
      this.function_list.splice(counter,1)      
      this.tes = "delete1"
  }
  delete_command(icon){
    let counter=0
      while(this.command_names[counter]!=icon){
        counter++
      }
      this.command_names.splice(counter,1)
      this.list.splice(counter,1)      
      this.tes = "delete2"      
    }
  get_color(item){
    if(item==="unlock")
      return "secondary"
    else if(item==="albums")
      return "blueCustom"
    else 
      return "primary"
  }
}
