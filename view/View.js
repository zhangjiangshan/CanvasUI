"use strict"
import BaseObject from './BaseObject'
import {nil, copy} from '../util/Util.js'
import {drawloop} from './Drawloop'
import {Point, Size, Edge, ViewAutoresizing, isPointIn} from './Geometry'
import CGContext from './CGContext'
import {AnimationModel} from './Animator'

export default class View extends BaseObject {
    constructor(x=0, y=0, width=0, height=0) {
        super()
        this._backgroundColor = "#00a488"
        this._position = new Point(x, y)
        this._size = new Size(width, height)
        this._alpha = 1
        this.backgroundAlpha = 1
        this.subviews = new Array()
        this.autoresizingMask = ViewAutoresizing.None
        this.superview = nil
        this.window = nil
        this.userInteractionEnabled = true
        this._clipToBounds = false

        //boarder && shadow
        this._boarderColor = nil
        this._boarderWidth = 0

        this._shadowBlur = 0
        this._shadowColor = "black"
        this._shadowOffset = new Point()

        this.animations = new Array()
        this.an_position = nil
        this.an_size = nil
        this.an_alpha = nil
    }

    get shadowColor() {
        return this._shadowColor
    }
    set shadowColor(newValue) {
        if (this._shadowColor != newValue) {
            this._shadowColor = newValue
            this._checkAndSetNeedsRender()
        }
    }

    get shadowBlur() {
        return this._shadowBlur
    }
    set shadowBlur(newValue) {
        if (this._shadowBlur != newValue) {
            this._shadowBlur = newValue
            this._checkAndSetNeedsRender()
        }
    }

    get shadowOffset() {
        return this._shadowOffset
    }
    set shadowOffset(newValue) {
        if (this._shadowOffset != newValue) {
            this._shadowOffset = newValue
            this._checkAndSetNeedsRender()
        }
    }

    get boarderColor() {
        return this._boarderColor
    }
    set boarderColor(newValue) {
        if (this._boarderColor != newValue) {
            this._boarderColor = newValue
            this._checkAndSetNeedsRender()
        }
    }

    get boarderWidth() {
        return this._boarderWidth
    }
    set boarderWidth(newValue) {
        if (this._boarderWidth != newValue) {
            this._boarderWidth = newValue
            this._checkAndSetNeedsRender()
        }
    }

    get clipToBounds() {
        return this._clipToBounds;
    }
    set clipToBounds(newValue){
        if (this._clipToBounds != newValue) {
            this._clipToBounds = newValue
            this._checkAndSetNeedsRender()
        }
    }

    get backgroundColor() {
        return this._backgroundColor;
    }
    set backgroundColor(newValue){
        if (this._backgroundColor != newValue) {
            this._backgroundColor = newValue
            this._checkAndSetNeedsRender()
        }
    }

    get alpha() {
        if (AnimationModel) {
            return this.an_alpha || this._alpha
        }
        return this._alpha
    }
    set alpha(newValue){
        if (AnimationModel) {
            this.an_alpha = newValue
            return
        }
        if (this.animations["alpha"]) {
            this.animations["alpha"].cancel()
            delete this.animations["alpha"]
            this._checkAndSetNeedsRender()
        }
        if (this._alpha != newValue) {
            this._alpha = newValue
            this._checkAndSetNeedsRender()
        }
    }

    get position() {
        if (AnimationModel) {
            return this.an_position || this._position
        }
        return this._position;
    }
    set position(newValue) {
        if (AnimationModel) {
            this.an_position = newValue
            return
        }
        if (this.animations["position"]) {
            this.animations["position"].cancel()
            delete this.animations["position"]
            this._checkAndSetNeedsRender()
        }
        const newPosition = newValue.round()
        if (this._position != newPosition) {
            this._position = newPosition
            this._checkAndSetNeedsRender()
        }
    }

    get size() {
        if (AnimationModel) {
            return this.an_size || this._size
        }
        return this._size;
    }
    set size(newValue) {
        if (AnimationModel) {
            this.an_size = newValue
            return
        }
        if (this.animations["size"]) {
            this.animations["size"].cancel()
            delete this.animations["size"]
            this._checkAndSetNeedsRender()
        }
        const newSize = newValue.round()
        const oldSize = this._size
        if (oldSize != newSize) {
            this._size = newSize
            this._layoutSubviews(oldSize)
            this._checkAndSetNeedsRender()
        }
    }

    get x() {
        return this.position.x
    }
    set x(newValue) {
        const newPoint = new Point(newValue, this.position.y)
        this.position = newPoint
    }

    get y() {
        return this.position.y
    }
    set y(newValue) {
        const newPoint = new Point(this.position.x, newValue)
        this.position = newPoint
    }

    get width() {
        return this.size.width;
    }
    set width(newValue) {
        const newSize = new Size(width, this.size.height)
        this.size = newSize
    }

    get height() {
        return this.size.height;
    }
    set height(newValue) {
        const newSize = new Size(height, this.size.width)
        this.size = newSize
    }

    _layoutSubviews(oldSize=this.size) {
        for (let view of this.subviews) {
            view._configAutoResizing(oldSize)
        }
        this.layoutSubviews()
    }

    _configAutoResizing(oldSize) {
        if (!this.superview) {
            return
        }

        const isFlexLeft = (this.autoresizingMask & ViewAutoresizing.FlexibleLeftMargin) > 0
        const isFlexRight = (this.autoresizingMask & ViewAutoresizing.FlexibleRightMargin) > 0
        const isFlexWidth = (this.autoresizingMask & ViewAutoresizing.FlexibleWidth) > 0

        const isFlexTop = (this.autoresizingMask & ViewAutoresizing.FlexibleTopMargin) > 0
        const isFlexBottom = (this.autoresizingMask & ViewAutoresizing.FlexibleBottomMargin) > 0
        const isFlexHeight = (this.autoresizingMask & ViewAutoresizing.FlexibleHeight) > 0

        let newPosition = this.position.copy()
        let newSize = this.size.copy()

        //横向
        const diffWidth = this.superview.size.width - oldSize.width
        let flexNumber = 0
        if (isFlexLeft) {
            flexNumber += 1
        }
        if (isFlexRight) {
            flexNumber += 1
        }
        if (isFlexWidth) {
            flexNumber += 1
        }
        if (flexNumber !=0 ) {
            const horizontalSpace = Math.round(diffWidth / flexNumber)
            if (isFlexLeft) {
                newPosition.x += horizontalSpace
            }
            if (isFlexWidth) {
                newSize.width += horizontalSpace
            }
        }
        //纵向
        const diffHeight = this.superview.size.height - oldSize.height
        flexNumber = 0
        if (isFlexTop) {
            flexNumber += 1
        }
        if (isFlexBottom) {
            flexNumber += 1
        }
        if (isFlexHeight) {
            flexNumber += 1
        }
        if (flexNumber !=0 ) {
            const verticalSpace = Math.round(diffHeight / flexNumber)
            if (isFlexTop) {
                newPosition.y += verticalSpace
            }
            if (isFlexHeight) {
                newSize.height += verticalSpace
            }
        }
        this.position = newPosition
        this.size = newSize
    }

    layoutSubviews() {

    }

    sizeToFit() {
        const value = this.fitSize()
        if (Size.prototype.isPrototypeOf(value)) {
            this.size = value
        }
    }

    fitSize() {
        return this.size
    }

    getContext() {
        const canvas = document.getElementById("canvas");
        return canvas.getContext("2d");
    }

    addSubview(view) {
        if (view.superview === this) {
            return
        }
        view.willMoveToSuperview(this)
        view.willMoveToWindow(this.window)
        view.removeFromSuperview()
        view.window = this.window

        this.subviews.push(view)
        view.superview = this

        view.didMoveToSuperview()
        view.didMoveToWindow()
    }

    removeSubview(view) {
        view.willMoveToSuperview(nil)
        view.willMoveToWindow(nil)

        this.subviews.removeObject(view)
        view.superview = nil
        view.window = nil

        view.didMoveToSuperview()
        view.didMoveToWindow()
    }

    removeFromSuperview() {
        if (this.superview) {
            this.superview.removeSubview(this)
        }
    }

    willMoveToWindow(window) {

    }

    didMoveToWindow() {
        const newWindow = this.window
        const setWindow = (view) => {
            for (let subview of view.subviews) {
                subview.willMoveToWindow(newWindow)
                subview.window = newWindow
                subview.didMoveToWindow()
                setWindow(subview)
            }
        }
        setWindow(this)
        if (newWindow) {
            this._layoutSubviews(this.size)
        }
        this._setNeedsRender()
    }

    willMoveToSuperview(view) {

    }

    didMoveToSuperview() {
        this._setNeedsRender()
    }

    isDescendantOfView(view) {
        let next = this
        while (next !== view && next) {
            next = next.superview
        }
        return !!next
    }

    isAcendantOfView(view) {
        let next = view
        while (next !== this && next) {
            next = next.superview
        }
        return !!next
    }

    convertPointToView(point, view) {
        if (this === view) {
            return point
        } else if (this.isDescendantOfView(view)) {
            let next = this
            let convertPoint = point.copy()
            while (next !== view && next !== nil) {
                convertPoint = new Point(convertPoint.x + next.position.x, convertPoint.y + next.position.y)
                next = next.superview
            }
            return convertPoint
        } else if (this.isAcendantOfView(view)){
            const array = new Array()
            let next = view
            while (next !== this && next !== nil) {
                array.push(next)
                next = next.superview
            }
            let convertPoint = point.copy()
            for (let value of array.reverseArray()) {
                convertPoint = new Point(convertPoint.x - value.position.x, convertPoint.y - value.position.y)
            }
            return convertPoint
        } else if (this.window !== view.window) {
            return nil
        }
    }

    _setNeedsRender() {
        drawloop.needsForRender()
    }

    _checkAndSetNeedsRender() {
        if (this.window !== nil && this.window === drawloop.keyWindow) {
            drawloop.needsForRender()
        }
    }

    _render() {
        //console.log(`render:${this.toString()}`)
        const ctx = new CGContext(this)
        ctx.save()
        if (this.clipToBounds) {
            ctx.clip({position:(new Point()), size:this.size.copy()}, "nonzero")
        }
        ctx.alpha = ctx.alpha * this.alpha
        if (ctx.alpha != 0) {
            this.render(ctx)
            for (let view of this.subviews) {
                view._render()
            }
        }
        ctx.restore()
    }

    render(ctx) {
        ctx.save()
        ctx.alpha = ctx.alpha * this.backgroundAlpha
        if (ctx.alpha != 0) {
            ctx.shadowColor = this.shadowColor
            ctx.shadowBlur = this.shadowBlur
            ctx.shadowOffset = this.shadowOffset
            ctx.fillStyle = this.backgroundColor;
            ctx.fillRect(0, 0, this.size.width, this.size.height)
            if (this.boarderWidth != 0) {
                ctx.strokeStyle = this.boarderColor
                ctx.lineWidth = this.boarderWidth
                ctx.strokeRect(0, 0, this.size.width, this.size.height)
            }
        }
        ctx.restore()
    }

    toString() {
        return `${this.className()}:{position:(${this.position.x},${this.position.y}), size:(${this.size.width},${this.size.height})}`
    }

    // touch
    hitTest(point) {
        let finalView = nil
        for (let subview of this.subviews.reverseArray()) {
            if (subview.pointInside(point)) {
                const view = subview.hitTest(this.convertPointToView(point, subview))
                if (view.userInteractionEnabled == true) {
                    finalView = view
                    break
                }
            }
        }
        if (finalView) {
            return finalView
        } else {
            return this
        }
    }

    pointInside(point) {
        return isPointIn(point, this.position, this.size)
    }

    mouseDown(event) {
        //console.log(`I'm down ${this.toString()}`)
    }

    mouseMove(event) {
        //console.log(`I'm move ${this.toString()}`)
    }

    mouseUp(event) {
        //console.log(`I'm up ${this.toString()}`)
    }

    mouseCancel(event) {
        //console.log(`I'm cancel ${this.toString()}`)
    }

}
