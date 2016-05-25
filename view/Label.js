"use strict"
import {nil} from '../util/Util'
import View from './View'
import {Point, Size, Edge, ViewAutoresizing} from './Geometry'
import Font from './Font'



export const TextAlignment = {
    Left: 0,
    Center: 1,
    Right: 2
}

export const VerticalAlignment = {
    Top: 0,
    Center: 1,
    Bottm: 2
}

export default class Label extends View {
    constructor(x=0, y=0, width=0, height=0) {
        super(x, y, width, height)
        this._multiLine = false
        this._font = new Font()
        this._text = nil
        this._textColor = "black"
        this._lineHeight = parseFloat(this.font.fontSize)
        this._autoSizing = false
        this._textAlignment = TextAlignment.Left   // only support single line label
        this._verticalAlignment = TextAlignment.Top // only support single line label
        this.backgroundAlpha = 0
        this.userInteractionEnabled = false
    }

    get textAlignment() {
        return this._textAlignment
    }
    set textAlignment(newValue){
        if (this._textAlignment != newValue) {
            this._textAlignment = newValue
            this.autoResize()
            this._checkAndSetNeedsRender()
        }
    }

    get verticalAlignment() {
        return this._verticalAlignment
    }
    set verticalAlignment(newValue){
        if (this._verticalAlignment != newValue) {
            this._verticalAlignment = newValue
            this.autoResize()
            this._checkAndSetNeedsRender()
        }
    }

    get autoSizing() {
        return this._autoSizing
    }
    set autoSizing(newValue){
        if (this._autoSizing != newValue) {
            this._autoSizing = newValue
            this.autoResize()
            this._checkAndSetNeedsRender()
        }
    }

    get text() {
        return this._text;
    }
    set text(newValue){
        if (this._text != newValue) {
            this._text = newValue
            this.autoResize()
            this._checkAndSetNeedsRender()
        }
    }

    get isMultiLine() {
        return this._multiLine;
    }
    set isMultiLine(newValue){
        if (this._multiLine != newValue) {
            this._multiLine = newValue
            this.autoResize()
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
            this.autoResize()
            this._checkAndSetNeedsRender()
        }
    }

    get lineHeight() {
        return this._lineHeight;
    }
    set lineHeight(newValue){
        if (this._lineHeight != newValue) {
            this._lineHeight = newValue
            this.autoResize()
            this._checkAndSetNeedsRender()
        }
    }

    autoResize() {
        if (this.autoSizing) {
            this.sizeToFit()
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
            let x = 0
            let y = 0
            if (this.verticalAlignment == VerticalAlignment.Center) {
                ctx.textBaseline = "middle"
                y = this.size.height / 2
            } else if (this.verticalAlignment == VerticalAlignment.Bottom) {
                ctx.textBaseline = "bottom"
                y = this.size.height
            }

            if (this.textAlignment == TextAlignment.Center) {
                ctx.textAlign = "center"
                x = this.size.width / 2

            } else if (this.textAlignment == TextAlignment.Right) {
                ctx.textAlign = "right"
                x = this.size.width
            }
            ctx.fillText(drawingText, x, y, this.size.width)
        }
    }
}
