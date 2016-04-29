"use strict"
import View from './View'
import {Point, Size, Edge, ViewAutoresizing} from './Geometry'
import CGContext from './CGContext'

export const EqualRatio = {
    None:                  0,
    FlexibleHeight:        1,
    FlexibleWidth:         2
};

export default class ImageView extends View {
    constructor(image=nil) {
        super()
        this.image = image
        this._autoSizing = false
        this._equalRatio = EqualRatio.None
    }

    get autoSizing() {
        return this._autoSizing
    }
    set autoSizing(newValue){
        if (this._autoSizing != newValue) {
            this._autoSizing = newValue
            this._checkAndSetNeedsRender()
        }
    }

    get equalRatio() {
        return this._equalRatio
    }
    set equalRatio(newValue){
        if (this._equalRatio != newValue) {
            this._equalRatio = newValue
            this._checkAndSetNeedsRender()
        }
    }

    get image() {
        return this._image;
    }
    set image(newValue){
        if (this._image != newValue) {
            if (this._image) {
                this._image.removeEventListener('load', this._imageOnload)
            }
            this._image = newValue
            if (this._image) {
                if (this._image.complete) {
                    this._renderWithImage(this._image)
                } else {
                    if (!this._imageOnload) {
                        this._imageOnload = () => {
                            this._renderWithImage(this._image)
                        }
                    }
                    this._image.addEventListener('load', this._imageOnload)
                }
            } else {
                this._checkAndSetNeedsRender()
            }
        }
    }

    fitSize() {
        if (this.image.complete) {
            return new Size(this.image.width, this.image.height)
        } else {
            return this.size
        }
    }

    _renderWithImage(image) {
        if (this.autoSizing) {
            this.size = new Size(this._image.width, this._image.height)
        } else if (this.equalRatio == EqualRatio.FlexibleHeight) {
            const imageRatio = image.height / image.width
            this.size = new Size(this.size.width, imageRatio * this.size.width)
        } else if (this.equalRatio == EqualRatio.FlexibleWidth) {
            const imageRatio = image.width / image.height
            this.size = new Size(imageRatio * this.size.height, this.size.height)
        }
        this._checkAndSetNeedsRender()
    }

    render(ctx) {
        super.render(ctx)
        ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, this.size.width, this.size.height)
    }
}
