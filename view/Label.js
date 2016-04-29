"use strict"
import {nil} from '../util/Util'
import View from './View'
import {Point, Size, Edge, ViewAutoresizing} from './Geometry'

export default class Label extends View {
    constructor(x=0, y=0, width=0, height=0) {
        super(x, y, width, height)
        this._multiLine = false
        this.text = nil
        this._textColor = "black"

    }

    get isMultiLine() {
        return this._multiLine;
    }
    set setMultiLine(newValue){
        if (this._multiLine != newValue) {
            this._multiLine = newValue
            this._checkAndSetNeedsRender()
        }
    }

    get textColor() {
        return this._textColor;
    }
    set setTextColor(newValue){
        if (this._textColor != newValue) {
            this._textColor = newValue
            this._checkAndSetNeedsRender()
        }
    }



    render(ctx) {
        super.render(ctx)
        const drawingText = (this.text == nil ? "" : this.text)
        ctx.fillStyle = this.textColor
        ctx.textBaseline = "top"
        if (this.isMultiLine) {
            ctx.wrapText(drawingText, 0, 0, this.size.width)
        } else {
            ctx.fillText(drawingText, 0, 0, this.size.width)
        }
    }
}
