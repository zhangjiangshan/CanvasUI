"use strict"
import {nil} from '../util/Util'
import {Point, Size, Edge, ViewAutoresizing} from './Geometry'
import Font from './Font'
import Label from './Label'
import ImageView from './ImageView'

export const ControlState {
    Normal:       0,
    Highlighted:  1,
    Disabled:     1 << 1,
    Selected:     1 << 2,
}

export default class Button extends View {
    constructor(target, func) {
        this._controlState = ControlState.Normal
        this.backgroundImageView = new ImageView()
        this.addSubview(this.backgroundImageView)
        this.imageView = new ImageView()
        this.addSubview(this.imageView)
        this.titleLabel = new Label()
        this.addSubview(this.titleLabel)
        this.func = func
        this.target = target
        this.images = {}
        this.backgroundImages = {}
        this.titleColors = {
            ControlState.Normal: "white",
        }
        this.titles = {}
        this._enable = false
    }

    setBackgroundImage(image, controlState) {
        this.backgroundImages[controlState] = image
    }

    setImage(image, controlState) {
        this.images[controlState] = image
    }

    setTitleColor(color, controlState) {
        this.titleColors[controlState] = color
    }

    setTitle(title, controlState) {
        this.titles[controlState] = title
    }

    get controlState() {
        return this._controlState
    }
    set controlState(newValue) {
        if (this._controlState != newValue) {
            this._controlState = newValue
            this.backgroundImageView.image = this.backgroundImages[newValue] || this.backgroundImages[.Normal]
            this.titleLabel.text = this.titles[newValue] || this.titles[.Normal] || ""
            this.imageView.image = this.images[newValue] || this.images[.Normal]
            this._checkAndSetNeedsRender()
        }
    }

    get enable() {
        return this._controlState
    }
    set enable(newValue) {
        if (this._enable != newValue) {
            this._enable = newValue
            if (!newValue) {
                this.controlState = ControlState.Disabled
            } else if (this.controlState === ControlState.Disabled) {
                this.controlState = ControlState.Normal
            }
        }
    }

    mouseDown(event) {
        this.controlState = ControlState.Highlighted
        console.log(`I'm down ${this.toString()}`)
    }

    mouseMove(event) {
        console.log(`I'm move ${this.toString()}`)
    }

    mouseUp(event) {
        this.controlState = ControlState.Normal
        console.log(`I'm up ${this.toString()}`)
        this.func.apply(this.target)
    }

    mouseCancel(event) {
        this.controlState = ControlState.Normal
        console.log(`I'm cancel ${this.toString()}`)
    }
}
