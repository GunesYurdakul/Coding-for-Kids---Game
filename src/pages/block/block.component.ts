import { Component } from '@angular/core';

@Component({
    selector: 'block',
    template: '<img src={{img}}>'
})

export class Block {
    color: String
    img: String
    path = "assets/imgs/"

    constructor(_color: String) {
        this.color = _color
        this.img = this.path + this.color + ".png"
    }

    activate() {
        this.img = this.path + this.color + "_active" + ".png"
    }

    deactivate() {
        if (this.color.indexOf("_active") !== -1)
            this.color = this.color.substr(0,this.color.indexOf("_active"))
        this.img = this.path + this.color + ".png"
    }

    apply() {
        if (this.color === "red") {
            this.color = "green"
            this.deactivate()
            this.activate()
        }
    }
}
