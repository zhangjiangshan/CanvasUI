"use strict"
import {nil} from '../util/Util.js'

class Drawloop {
    constructor() {
        this.needsRender = false
        this.keyWindow = nil
        this.trackRender = true

    }

    render() {
        if (this.keyWindow) {
            this.keyWindow._render()
        }
    }

    needsForRender() {
        if (this.trackRender && this.needsRender === false) {
            this.needsRender = true
            setTimeout(() => {
                this.render()
                this.needsRender = false
            }, 1);
        }
    }

    performWithoutRender(func) {
        this.trackRender = false
        func()
        this.trackRender = true
    }

    forceRender() {
        this.render()
        this.needsRender = false
    }
}

export const drawloop = new Drawloop()
