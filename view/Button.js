"use strict"
import {nil} from '../util/Util'
import {Point, Size, Edge, ViewAutoresizing} from './Geometry'
import Font from './Font'
import Label, {TextAlignment, VerticalAlignment} from './Label'
import ImageView from './ImageView'
import View from './View'

export const ControlState = {
    Normal:       0,
    Highlighted:  1,
    Disabled:     1 << 1,
    Selected:     1 << 2,
}

export default class Button extends View {
    constructor(target, func) {
        super()
        this._controlState = ControlState.Normal
        this.backgroundImageView = new ImageView()
        this.addSubview(this.backgroundImageView)
        this.imageView = new ImageView()
        this.addSubview(this.imageView)
        this.titleLabel = new Label()
        this.titleLabel.clipToBounds = true
        this.titleLabel.textAlignment = TextAlignment.Center
        this.titleLabel.verticalAlignment = VerticalAlignment.Center
        this.titleLabel.size = this.size.copy()
        this.addSubview(this.titleLabel)

        this.func = func
        this.target = target
        this.images = {}
        this.backgroundImages = {}
        this.backgroundColors = {}
        this.titleColors = {}
        this.titleColors[ControlState.Normal] = "black"
        this.titles = {}
        this._enable = false
    }

    setBackgroundColor(color, controlState) {
        this.backgroundColors[controlState] = color
        if (controlState == this.controlState) {
            this.backgroundColor = color
        }
    }

    setBackgroundImage(image, controlState) {
        this.backgroundImages[controlState] = image
        if (controlState == this.controlState) {
            this.backgroundImageView.image  = image
        }
    }

    setImage(image, controlState) {
        this.images[controlState] = image
        if (controlState == this.controlState) {
            this.imageView.image  = image
        }
    }

    setTitleColor(color, controlState) {
        this.titleColors[controlState] = color
        if (controlState == this.controlState) {
            this.titleLabel.textColor  = color
        }
    }

    setTitle(title, controlState) {
        this.titles[controlState] = title
        if (controlState == this.controlState) {
            this.titleLabel.text  = title
        }
    }

    get controlState() {
        return this._controlState
    }
    set controlState(newValue) {
        if (this._controlState != newValue) {
            this._controlState = newValue
            this.backgroundImageView.image = this.backgroundImages[newValue] || this.backgroundImages[ControlState.Normal]
            this.titleLabel.text = this.titles[newValue] || this.titles[ControlState.Normal] || ""
            this.imageView.image = this.images[newValue] || this.images[ControlState.Normal]
            this.backgroundColor = this.backgroundColors[newValue] || this.backgroundColors[ControlState.Normal]

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

    layoutSubviews() {
        super.layoutSubviews()
        this.titleLabel.size = this.size.copy()
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
        if (this.func && this.target) {
            this.func.apply(this.target, this)
        }
    }

    mouseCancel(event) {
        this.controlState = ControlState.Normal
        console.log(`I'm cancel ${this.toString()}`)
    }
}
