"use strict"
import {nil} from '../util/Util'
import {Point} from './Geometry'

export default class TouchEvent {
    constructor() {
        this.isDown = false
        this.firstResponser = nil
        this.point = nil
        this.windowPoint = nil
        this.event = nil
        this.offset = new Point()
    }
}
