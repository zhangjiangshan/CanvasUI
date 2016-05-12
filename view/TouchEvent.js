"use strict"
import {nil} from '../util/Util'

export default class TouchEvent {
    constructor() {
        this.isDown = false
        this.firstResponser = nil
        this.point = nil
        this.windowPoint = nil
        this.event = nil
    }
}
