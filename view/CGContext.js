"use strict"
import {nil, copy} from '../util/Util.js'
import {Point, Size, Edge, ViewAutoresizing} from './Geometry'

export default class CGContext {
    constructor(view) {
        this.view = view
        this._font = nil
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
        return this.context.fillStyle;
    }
    set fillStyle(newValue){
        this.context.fillStyle = newValue
    }

    get textBaseline() {
        return this.context.textBaseline;
    }
    set textBaseline(newValue){
        this.context.textBaseline = newValue
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

    save() {
        this.context.save()
    }

    restore() {
        this.context.restore()
    }

    convertPoint(point) {
        const position = this.view.convertPointToView(point, this.view.window)
        return [position.x, position.y]
    }

    fillRect(px, py, width, height) {
        const [x, y] = this.convertPoint(new Point(px, py))
        this.context.fillRect(x, y, width, height);
    }

    wrapText(text, px, py, maxWidth, lineHeight=26) {
        let [x, y] = this.convertPoint(new Point(px, py))

        var words = text.split('');
        var line = '';

        for(var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + '';
            var metrics = this.context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                this.context.fillText(line, x, y);
                line = words[n] + '';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        this.context.fillText(line, x, y);
    }

    fillText(text, px, py, maxWidth=9999) {
        const [x, y] = this.convertPoint(new Point(px, py))
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
}
