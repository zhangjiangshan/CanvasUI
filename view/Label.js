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
        this._lineHeight = parseFloat(this.font)
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

    get lineHeight() {
        return this._lineHeight;
    }
    set lineHeight(newValue){
        if (this._lineHeight != newValue) {
            this._lineHeight = newValue
            this._checkAndSetNeedsRender()
        }
    }

    fitSize() {
        if (!this.text) {
            return new Size()
        } else {
            if (this.isMultiLine) {
                return
            } else {
                const context = new CGContext(this)
                return new Size(context.measureText(this.text), this.lineHeight)
            }
        }
    }

    render(ctx) {
        super.render(ctx)
        const drawingText = (this.text == nil ? "" : this.text)
        ctx.fillStyle = this.textColor
        ctx.font = this.font
        if (this.isMultiLine) {
            ctx.wrapText(drawingText, 0, 0, this.size.width, this.lineHeight)
        } else {
            ctx.fillText(drawingText, 0, 0, this.size.width)
        }
    }
}
