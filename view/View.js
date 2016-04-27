"use strict"
import BaseObject from './BaseObject'
import {nil, copy} from '../util/Util.js'
import {drawloop} from './Drawloop'
import {Point, Size, Edge, ViewAutoresizing} from './Geometry'

export default class View extends BaseObject {
    constructor(x=0, y=0, width=0, height=0) {
        super()
        this._backgroundColor = "#00a488"
        this._position = new Point(x, y)
        this._size = new Size(width, height)
        this.subviews = new Array()
        this.autoresizingMask = ViewAutoresizing.None
        this.superview = nil
        this.window = nil
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

    get position() {
        return this._position;
    }
    set position(newValue){
        const newPosition = newValue.round()
        if (this._position != newPosition) {
            this._position = newPosition
            this._checkAndSetNeedsRender()
        }
    }

    get size() {
        return this._size;
    }
    set size(newValue) {
        const newSize = newValue.round()
        const oldSize = this._size
        if (oldSize != newSize) {
            this._size = newSize
            this._layoutSubviews(oldSize)
            this._checkAndSetNeedsRender()
        }
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
        this._position = newPosition
        this._size = newSize
    }

    layoutSubviews() {

    }

    getContext() {
        const canvas = document.getElementById("canvas");
        return canvas.getContext("2d");
    }

    addSubview(view) {
        view.willMoveToSuperview(this)
        view.willMoveToWindow(this.window)

        this.subviews.push(view)
        view.superview = this
        view.window = this.window

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
        if (this.superView) {
            this.superView.removeSubview(this)
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
            let convertPoint = point
            while (next !== view && next !== nil) {
                convertPoint = {x:convertPoint.x + next.position.x, y:convertPoint.y + next.position.y}
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
            for (let value of array.reverse()) {
                convertPoint = {x:convertPoint.x - value.position.x, y:convertPoint.y - value.position.y}
            }
            return convertPoint
        } else if (this.window !== view.window) {
            console.log(`${this.toString()} and ${this.toString()} are not on same window`)
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
        console.log(`render:${this.toString()}`)
        this.render()
        for (let view of this.subviews) {
            view._render()
        }
    }

    render() {
        const ctx = this.getContext();
        ctx.fillStyle = this.backgroundColor;
        const position = this.convertPointToView({x:0, y:0}, this.window)
        ctx.fillRect(position.x, position.y, this.size.width, this.size.height);
    }

    toString() {
        return `${this.className()}:{position:(${this.position.x},${this.position.y}), size:(${this.size.width},${this.size.height})}`
    }
}
