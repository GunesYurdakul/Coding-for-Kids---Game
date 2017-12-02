import { Component } from '@angular/core';
import { Block } from '../block/block.component';

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


  list = []
  command_names = []
  function_list = []
  function_command_names = []
  is_function = 0

  constructor() {
    this.x = 0
    this.y = 0
    this.level = 0

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
    this.blocks[this.y][this.x].deactivate()
    this.x = this.x + x
    this.y = this.y + y
    this.blocks[this.y][this.x].activate()

    if (x === 0 && y === 0)
      this.blocks[this.y][this.x].apply()

    return this.checkStatus()
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
    this.x = 0
    this.y = 0
  }

  reshape() {
    this.list.splice(0, 1)
    for (let i = 0; i < this.function_list.length; i++) {
      this.list.unshift(this.function_list[i])
    }
  }
  
  execute() {
    while (this.list.length !== 0) {
      if (this.list[0] === "function") {
        this.reshape()
      }
      let command = this.list[0]
      let result = this.move(command[0], command[1])

      this.list.splice(0, 1)
      this.command_names.splice(0, 1)

      if (result) {
        if (this.level < 3)
          this.level = this.level + 1

        this.reload()
        return
      }
    }

  }


  left() {
    if (this.is_function) {
      this.function_list.push([0, -1]);
      this.function_command_names.push("arrow-back");
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

    else {
      this.list.push([0, 0]);
      this.command_names.push("unlock");
    }

  }

  set_function() {
    this.is_function = 1
  }

  reset_function() {
    this.is_function = 0
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
}
