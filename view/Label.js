"use strict"
import {nil} from '../util/Util'
import View from './View'
import {Point, Size, Edge, ViewAutoresizing} from './Geometry'
import Font from './Font'

export default class Label extends View {
    constructor(x=0, y=0, width=0, height=0) {
        super(x, y, width, height)
        this._multiLine = false
        this._font = new Font()
        this._text = nil
        this._textColor = "black"
    }

    get text() {
        return this._text;
    }
    set text(newValue){
        if (this._text != newValue) {
            this._text = newValue
            this._checkAndSetNeedsRender()
        }
    }

    get isMultiLine() {
        return this._multiLine;
    }
    set isMultiLine(newValue){
        if (this._multiLine != newValue) {
            this._multiLine = newValue
            this._checkAndSetNeedsRender()
        }
    }

    get textColor() {
        return this._textColor;
    }
    set setTextColor(newValue) {
        if (this._textColor != newValue) {
            this._textColor = newValue
            this._checkAndSetNeedsRender()
        }
    }

    get font() {
        return this._font;
    }
    set font(newValue){
        if (this._font != newValue) {
            this._font = newValue
            this._checkAndSetNeedsRender()
        }
    }

    render(ctx) {
        super.render(ctx)
        const drawingText = (this.text == nil ? "" : this.text)
        ctx.fillStyle = this.textColor
        ctx.font = this.font
        ctx.textBaseline = "top"
        if (this.isMultiLine) {
            ctx.wrapText(drawingText, 0, 0, this.size.width, parseInt(this.font.fontSize))
        } else {
            ctx.fillText(drawingText, 0, 0, this.size.width)
        }
    }
}
