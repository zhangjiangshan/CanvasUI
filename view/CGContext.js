"use strict"
import {nil, copy} from '../util/Util.js'
import {Point, Size, Edge, ViewAutoresizing} from './Geometry'

export default class CGContext {
    constructor(view) {
        this.view = view
        this._font = nil
        this.textBaseline = "top"
        this.textAlign = "left"
    }

    get context() {
        return this.view.getContext()
    }

    get alpha() {
        return this.context.globalAlpha;
    }
    set alpha(newValue){
        this.context.globalAlpha = newValue
    }

    get fillStyle() {
        return this.context.fillStyle
    }
    set fillStyle(newValue){
        this.context.fillStyle = newValue
    }

    get textBaseline() {
        return this.context.textBaseline
    }
    set textBaseline(newValue) {
        this.context.textBaseline = newValue
    }

    get textAlign() {
        return this.context.textAlign
    }
    set textAlign(newValue) {
        this.context.textAlign = newValue
    }

    get font() {
        return this._font;
    }
    set font(newValue){
        if (newValue == nil) {
            this._font = nil
            this.context.font = ""
        } else {
            this._font = newValue.copy()
            this.context.font = this.font.getFontText()
        }
    }

    get lineWidth() {
        return this.context.lineWidth
    }
    set lineWidth(newValue) {
        this.context.lineWidth = newValue
    }

    get strokeStyle() {
        return this.context.strokeStyle
    }
    set strokeStyle(newValue) {
        this.context.strokeStyle = newValue
    }

    get shadowColor() {
        return this.context.shadowColor
    }
    set shadowColor(newValue) {
        this.context.shadowColor = newValue
    }

    get shadowBlur() {
        return this.context.shadowBlur
    }
    set shadowBlur(newValue) {
        this.context.shadowBlur = newValue
    }

    get shadowOffset() {
        return new Point(this.context.shadowOffsetX, this.context.shadowOffsetY)
    }
    set shadowOffset(newValue) {
        this.context.shadowOffsetX = newValue.x
        this.context.shadowOffsetY = newValue.y
    }

    save() {
        this.context.save()
    }

    restore() {
        this.context.restore()
    }

    convertPoint(point, offset=true) {
        const position = this.view.convertPointToView(point, this.view.window, offset)
        return [position.x, position.y]
    }

    fillRect(px, py, width, height) {
        const [x, y] = this.convertPoint(new Point(px, py))
        this.context.fillRect(x, y, width, height);
    }

    strokeRect(px, py, width, height) {
        const [x, y] = this.convertPoint(new Point(px, py))
        this.context.strokeRect(x, y, width, height);
    }

    wrapText(text, px, py, maxWidth, lineHeight=26) {
        this.context.textBaseline = "top"
        let [x, y] = this.convertPoint(new Point(px, py))

        let words = text.split('')
        let line = ''
        for(let n = 0; n < words.length; n++) {
            let testLine = line + words[n] + ''
            let testWidth = this.measureText(testLine)
            if (testWidth > maxWidth && n > 0) {
                this.context.fillText(line, x, y)
                line = words[n] + ''
                y += lineHeight
            } else {
                line = testLine
            }
        }
        this.context.fillText(line, x, y)
        const width = ((y == 0) ? this.measureText(text) : maxWidth)
        return new Size(width, y )
    }

    fillText(text, px, py, maxWidth=9999) {
        const [x, y] = this.convertPoint(new Point(px, py))
        //this.context.textBaseline = this.textBaseline
        this.context.fillText(text, x, y, maxWidth);
    }

    drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
        const context = this.context
        if (image.complete) {
            const [x, y] = this.convertPoint(new Point(dx, dy))
            context.drawImage(image, sx, sy, sWidth, sHeight, x, y, dWidth, dHeight)
        } else {
            // image not load
        }
    }

    clip(rect, offset=true) {
        const [x, y] = this.convertPoint(rect.position, offset)
        this.context.rect(x, y, rect.size.width, rect.size.height)
        this.context.clip("nonzero")
    }

    measureText(text) {
        return this.context.measureText(text).width
    }

    measureMultiLineText(text, maxWidth, lineHeight) {
        let x = 0, y = 0

        let words = text.split('')
        let line = ''
        for(let n = 0; n < words.length; n++) {
            let testLine = line + words[n] + ''
            let testWidth = this.measureText(testLine);
            if (testWidth > maxWidth && n > 0) {
                line = words[n] + ''
                y += lineHeight
            } else {
                line = testLine
            }
        }
        const width = ((y == 0) ? this.measureText(text) : maxWidth)
        return new Size(width, y + lineHeight)
    }

    static createImage(width, height, drawFunc) {
        var canvas = document.createElement(uuid.v1());
        const canvasWidth = w * scale
        const canvasHeight = h * scale
        canvas.width  = canvasWidth
        canvas.height = canvasHeight
        canvas.style.width = w + "px"
        canvas.style.height = h + "px"
        var ctx = canvas.getContext("2d");
        drawFunc(ctx, width, height)
        // ctx.fillStyle = "red";
        // ctx.fillRect(0, 0, 100, 100);

        var img = document.createElement("img");
        img.src = canvas.toDataURL("image/png");
        return img
    }
}
