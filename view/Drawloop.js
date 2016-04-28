"use strict"
import {nil} from '../util/Util.js'

class Drawloop {
    constructor() {
        this.needsRender = false
        this.keyWindow = nil
    }

    render() {
        console.log("begin render")
        this.keyWindow._render()
        console.log("end render")
    }

    needsForRender() {
        if (this.needsRender === false) {
            this.needsRender = true
            this.render()
            this.needsRender = false
            //setTimeout(() => {this.render()}, 1);
        }
    }
}

export const drawloop = new Drawloop()
