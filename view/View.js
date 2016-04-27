"use strict"
import BaseObject from './BaseObject'
import {nil} from '../util/Util.js'
import {drawloop} from './Drawloop'

export default class View extends BaseObject {
    constructor() {
        super()
        this._backgroundColor = "#00a488"
        this._position = {x:0, y:0}
        this._size = {width:0, height:0}
        this.subviews = new Array()
        this.superview = nil
        this.window = nil
    }

    get backgroundColor() {
       return this._backgroundColor;
    }
    set backgroundColor(newValue){
       this._backgroundColor = newValue
       this._checkAndSetNeedsRender()
    }

    get position() {
       return this._position;
    }
    set position(newValue){
       this._position = newValue
       this._checkAndSetNeedsRender()
    }

    get size() {
       return this._size;
    }
    set size(newValue){
       this._size = newValue
       this._checkAndSetNeedsRender()
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
        var newWindow = this.window
        var setWindow = (view) => {
            for (var subview in view.subviews) {
                subview.willMoveToWindow(newWindow)
                subview.window = newWindow
                subview.didMoveToWindow()
                setWindow(subview)
            }
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
