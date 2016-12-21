"use strict"
import BaseObject from './BaseObject'
import {nil, copy} from '../util/Util.js'
import {drawloop} from './Drawloop'
import {Point, Size, Edge, ViewAutoresizing, isPointIn} from './Geometry'
import CGContext from './CGContext'
import {AnimationModel} from './Animator'

export default class BezierPath {
    constructor(view) {
        this.path = new Path2D()
        this.view = view
    }

    convertPoint(point, offset=true) {
        const position = this.view.convertPointToView(point, this.view.window, offset)
        return [position.x, position.y]
    }

    addPath(path2d) {
        this.path.addPath(path2d)
    }

    closePath() {
        this.path.closePath()
    }

    moveTo(px, py) {
        const [x, y] = this.convertPoint(new Point(px, py))
        this.path.moveTo(x, y)
    }

    lineTo(px, py) {
        const [x, y] = this.convertPoint(new Point(px, py))
        this.path.lineTo(x, y)
    }

    bezierCurveTo(cp1x, cp1y, cp2x, cp2y, px, py) {
        const [c1x, c1y] = this.convertPoint(new Point(cp1x, cp1y))
        const [c2x, c2y] = this.convertPoint(new Point(cp2x, cp2y))
        const [x, y] = this.convertPoint(new Point(px, py))
        this.path.bezierCurveTo(c1x, c1y, c2x, c2y, x, y)
    }

    quadraticCurveTo(cp1x, cp1y, px, py) {
        const [c1x, c1y] = this.convertPoint(new Point(cp1x, cp1y))
        const [x, y] = this.convertPoint(new Point(px, py))
        this.path.quadraticCurveTo(c1x, c1y, x, y)
    }

    arc(px, py, radius, startAngle, endAngle, anticlockwise) {
        const [x, y] = this.convertPoint(new Point(px, py))
        this.arc(x, y, radius, startAngle, endAngle, anticlockwise)
    }

    arcTo(px1, py1, px2, py2, radius) {
        const [x1, y1] = this.convertPoint(new Point(px1, py1))
        const [x2, y2] = this.convertPoint(new Point(px2, py2))
        this.path.quadraticCurveTo(x1, y1, x2, y2, radius)
    }

    ellipse(px, py, radiuspx, radiuspy, rotation, startAngle, endAngle, anticlockwise) {
        const [x1, y1] = this.convertPoint(new Point(px1, py1))
        const [x2, y2] = this.convertPoint(new Point(radiuspx, radiuspy))
        this.path.ellipse(x1, y1, x2, y2, rotation, startAngle, endAngle, anticlockwise)
    }

    rect(px, py, width, height) {
         const [x, y] = this.convertPoint(new Point(px, py))
         this.path.rect(x, y, width, height)
    }
}
