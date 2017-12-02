import { Component } from '@angular/core';
import { Block } from '../block/block.component';
import { NavController, NavParams } from 'ionic-angular';
import { ResultPage } from '../result/result';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})

export class HelloIonicPage {
  x: number
  y: number
  blocks: [[Block]]
  level: number
  levels: [[[Block]]]
  nMove: number  
  list = []
  command_names = []
  function_list = []
  loop_list = []
  function_command_names = []
  loop_command_names = []
  is_function = 0
  is_loop = 0
  loop_count = 2
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(navParams.get('item'))
      this.level = navParams.get('item');
    else
      this.level = 0  
    this.x = 0
    this.y = 0
    this.nMove = 0    
    this.levels = [
      [[new Block("black_active"), new Block("black"), new Block("black"), new Block("grey"), new Block("grey"), new Block("grey")]
        , [new Block("grey"), new Block("grey"), new Block("red"), new Block("grey"), new Block("grey"), new Block("grey")]
        , [new Block("grey"), new Block("grey"), new Block("red"), new Block("grey"), new Block("grey"), new Block("grey")]
        , [new Block("grey"), new Block("black"), new Block("black"), new Block("grey"), new Block("grey"), new Block("grey")]
        , [new Block("grey"), new Block("black"), new Block("grey"), new Block("grey"), new Block("grey"), new Block("grey")]
        , [new Block("grey"), new Block("black"), new Block("black"), new Block("black"), new Block("black"), new Block("black")]
      ],
      [[new Block("black_active"), new Block("black"), new Block("black"), new Block("black"), new Block("black"), new Block("red")]
        , [new Block("grey"), new Block("grey"), new Block("grey"), new Block("grey"), new Block("grey"), new Block("black")]
        , [new Block("red"), new Block("black"), new Block("black"), new Block("black"), new Block("black"), new Block("red")]
        , [new Block("black"), new Block("grey"), new Block("grey"), new Block("grey"), new Block("grey"), new Block("grey")]
        , [new Block("black"), new Block("grey"), new Block("grey"), new Block("grey"), new Block("grey"), new Block("grey")]
        , [new Block("red"), new Block("black"), new Block("black"), new Block("black"), new Block("black"), new Block("red")]
      ],
      [[new Block("black_active"), new Block("red"), new Block("grey"), new Block("grey"), new Block("grey"), new Block("grey")]
        , [new Block("grey"), new Block("black"), new Block("red"), new Block("grey"), new Block("grey"), new Block("grey")]
        , [new Block("grey"), new Block("grey"), new Block("black"), new Block("red"), new Block("grey"), new Block("grey")]
        , [new Block("grey"), new Block("grey"), new Block("grey"), new Block("black"), new Block("red"), new Block("grey")]
        , [new Block("grey"), new Block("grey"), new Block("grey"), new Block("grey"), new Block("black"), new Block("red")]
        , [new Block("grey"), new Block("grey"), new Block("grey"), new Block("grey"), new Block("grey"), new Block("grey")]
      ],
      [[new Block("black_active"), new Block("black"), new Block("red"), new Block("grey"), new Block("grey"), new Block("grey")]
        , [new Block("grey"), new Block("grey"), new Block("black"), new Block("grey"), new Block("grey"), new Block("grey")]
        , [new Block("red"), new Block("black"), new Block("red"), new Block("grey"), new Block("grey"), new Block("grey")]
        , [new Block("black"), new Block("grey"), new Block("grey"), new Block("grey"), new Block("grey"), new Block("grey")]
        , [new Block("red"), new Block("black"), new Block("red"), new Block("grey"), new Block("grey"), new Block("grey")]
        , [new Block("grey"), new Block("grey"), new Block("black"), new Block("grey"), new Block("grey"), new Block("grey")]
      ]
    ]

    this.blocks = this.levels[this.level]
  }
  move(y, x) {
    if (!!this.blocks[this.y + y][this.x + x] && !!this.blocks[this.y][this.x] && this.blocks[this.y + y][this.x + x].color !== "grey") {
      this.blocks[this.y][this.x].deactivate()
      this.x = this.x + x
      this.y = this.y + y
      this.blocks[this.y][this.x].activate()

      if (x === 0 && y === 0)
        this.blocks[this.y][this.x].apply()
    }
    return this.checkStatus()
  }
  resetMap() {
    for (let i = 0; i < this.blocks.length; i++) {
      for (let j = 0; j < this.blocks[i].length; j++) {
        this.blocks[i][j].deactivate()

        if (this.blocks[i][j].color === "green")
          this.blocks[i][j] = new Block("red")
      }
    }
    this.blocks[0][0].activate()
  }

  checkStatus() {
    for (let i = 0; i < this.blocks.length; i++) {
      for (let j = 0; j < this.blocks[i].length; j++) {
        if (this.blocks[i][j].color === "red")
          return false
      }
    }
    return true
  }
  reload() {
    this.blocks = this.levels[this.level]
    this.resetMap()

    this.x = 0
    this.y = 0
    this.nMove = 0

    this.list = []
    this.function_list = []

    this.command_names = []
    this.function_command_names = []
  }

  reshape() {
    if (this.list[0] === "function"){
      this.list.splice(0, 1)
      for (let i = 0; i < this.function_list.length; i++) {
        this.list.unshift(this.function_list[i])
      }
    }
    else{
      this.list.splice(0, 1)
      for(let j = 0; j < this.loop_count; j ++){
        for (let i = 0; i < this.loop_list.length; i++) {
          this.list.unshift(this.loop_list[i])
        }
      } 
    }
  }

  // Can was here
  execute() {
    var interval = setInterval(() => {
      if (this.list.length !== 0) {
        if (this.list[0] === "function") {
          this.reshape()
        }
        let command = this.list[0]
        let result = this.move(command[0], command[1])

        this.list.splice(0, 1)
        this.command_names.splice(0, 1)
        if (result || this.nMove > 30) {
          if (this.level < 3 && result)
            this.level = this.level + 1

          clearInterval(interval)
          this.reload()
          this.navCtrl.push(ResultPage, {
            item: [this.level,true]
          });
          return
        }
      }
      else {
        clearInterval(interval)
        this.reload()
        this.navCtrl.push(ResultPage, {
          item: [this.level,false]
        });
        return
      }
    }, 500);
  }

  left() {
    if (this.is_function) {
      this.function_list.push([0, -1]);
      this.function_command_names.push("arrow-back");
    }
    else if (this.is_loop) {
      this.loop_list.push([0, -1]);
      this.loop_command_names.push("arrow-back");
    }
    else {
      this.list.push([0, -1]);
      this.command_names.push("arrow-back");
    }
  }

  right() {
    if (this.is_function) {
      this.function_list.push([0, 1]);
      this.function_command_names.push("arrow-forward");
    }
    else if (this.is_loop) {
      this.loop_list.push([0, 1]);
      this.loop_command_names.push("arrow-forward");
    }
    else {
      this.list.push([0, 1]);
      this.command_names.push("arrow-forward");
    }
  }

  up() {
    if (this.is_function) {
      this.function_list.push([-1, 0]);
      this.function_command_names.push("arrow-up");
    }
    else if (this.is_loop) {
      this.loop_list.push([-1, 0]);
      this.loop_command_names.push("arrow-up");
    }
    else {
      this.list.push([-1, 0]);
      this.command_names.push("arrow-up");
    }
  }

  down() {
    if (this.is_function) {
      this.function_list.push([1, 0]);
      this.function_command_names.push("arrow-down");
    }
    else if (this.is_loop) {
      this.loop_list.push([1, 0]);
      this.loop_command_names.push("arrow-down");
    }
    else {
      this.list.push([1, 0]);
      this.command_names.push("arrow-down");
    }
  }

  function() {
    if (this.is_function) {
      this.function_list.push("function");
      this.function_command_names.push("albums");
    }
    else if (this.is_loop) {
      this.loop_list.push("function");
      this.loop_command_names.push("refresh");
    }
    else {
      this.list.push("function");
      this.command_names.push("albums");
    }
  }

  unlock() {
    if (this.is_function) {
      this.function_list.push([0, 0]);
      this.function_command_names.push("unlock");
    }
    else if (this.is_loop) {
      this.loop_list.push([0, 0]);
      this.loop_command_names.push("unlock");
    }
    else {
      this.list.push([0, 0]);
      this.command_names.push("unlock");
    }

  }

  delete_function(icon) {
    let counter = 0
    while (this.function_command_names[counter] != icon) {
      counter++
    }
    this.function_command_names.splice(counter, 1)
    this.function_list.splice(counter, 1)
  }

  delete_command(icon) {
    let counter = 0
    while (this.command_names[counter] != icon) {
      counter++
    }
    this.command_names.splice(counter, 1)
    this.list.splice(counter, 1)
  }

  get_color(item) {
    if (item === "unlock")
      return "secondary"

    else if (item === "albums")
      return "blueCustom"

    else
      return "primary"
  }
  
  loop() {
    if (this.is_function) {
      this.function_list.push("loop");
      this.function_command_names.push("refresh");
    }
    else if (this.is_loop) {
    }
    else {
      this.list.push("loop");
      this.command_names.push("refresh");
    }

  }

  set_function() {
    this.is_function = 1
    this.is_loop = 0
  }

  set_loop() {
    this.is_function = 0
    this.is_loop = 1
  }

  reset_function() {
    this.is_function = 0
    this.is_loop = 0
  }

  set_loop_count() {    
    if (this.loop_count === 5) {
      this.loop_count = 2
    }
    else {
      this.loop_count++
    }
  }
}
