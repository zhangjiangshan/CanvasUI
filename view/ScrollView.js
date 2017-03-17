"use strict"
import {nil} from '../util/Util'
import View from './View'
import {Point, Size, Edge, ViewAutoresizing} from './Geometry'
import TouchEvent from './TouchEvent'
import BezierPath from './BezierPath'
import {AnimatAction} from '../view/Animator'

export default class ScrollViewIndicator extends View {
    constructor(x=0, y=0, width=5, height=64) {
        super(x, y, width, height)
        this.backgroundAlpha = 0.6
        this.backgroundColor = "black"
        this.cornerRadius = 3
        this.timeoutID = nil
        this.alpha = 0
        this.clipToBounds = true
    }

    flash() {
        if(this.timeoutID != nil) {
            window.clearTimeout(this.timeoutID)
            this.timeoutID = nil
        }
        this.alpha = 1
        this.timeoutID = setTimeout(() => {
            const animation = new AnimatAction(this, "alpha", 0, 0.3)
            animation.start()
        }, 1000)
    }

    draw(ctx) {
        
    }
}

export default class ScrollView extends View {
    constructor(x=0, y=0, width=0, height=0) {
        super(x, y, width, height)
        this.offset = new Point(0, 0)
        this.contentSize = this.size
        this._firstResponser = this
        this.clipToBounds = true

        this.verticalIndicator = new ScrollViewIndicator(0, 0, 5, 64)
        this.addSubview(this.verticalIndicator)
        this.verticalIndicator.position = new Point(this.contentSize.width - this.verticalIndicator.width, 0)
        this.verticalIndicator.autoresizingMask = ViewAutoresizing.FlexibleLeftMargin

        this.horizontalIndicator = new ScrollViewIndicator(0, 0, 64, 5)
        this.addSubview(this.horizontalIndicator)
        this.horizontalIndicator.position = new Point(0, this.contentSize.height - this.horizontalIndicator.height)
        this.horizontalIndicator.autoresizingMask = ViewAutoresizing.FlexibleTopMargin
    }

    addSubview(view) {
        super.addSubview(view)
        this.bringSubviewToFront(this.verticalIndicator)
        this.bringSubviewToFront(this.horizontalIndicator)
    }

    refreshIndicator() {
        this.verticalIndicator.position = new Point(this.contentOffset.x + this.width - this.verticalIndicator.width, this.contentOffset.y / (this.contentSize.height - this.height) * (this.contentSize.height - this.verticalIndicator.size.height))
        this.horizontalIndicator.position = new Point(this.contentOffset.x / (this.contentSize.width - this.width) * (this.contentSize.width - this.horizontalIndicator.size.width), this.contentOffset.y + this.height - this.horizontalIndicator.height)

    }

    get contentOffset() {
        return this._offset;
    }
    set contentOffset(newValue){
        if (this._offset != newValue) {
            const maxX = this.contentSize.width - this.size.width
            const maxY = this.contentSize.height - this.size.height
            const value = new Point(Math.min(Math.max(newValue.x, 0), maxX), Math.min(Math.max(newValue.y, 0), maxY))
            this._offset = value
            this.refreshIndicator()
            this.verticalIndicator.flash()
            this.horizontalIndicator.flash()
            this._checkAndForceRender()
        }
    }

    mouseDown(event) {
        const responser = this.hitTest(event.point)
        if (responser === this) {
            return
        }
        this._firstResponser = responser
        const newEvent = new TouchEvent()
        newEvent.isDown = true
        newEvent.firstResponser = responser
        newEvent.point = this.convertPointToView(event.point, event.firstResponser)
        newEvent.windowPoint = event.windowPoint.copy()
        newEvent.event = "mouseDown"
        if (newEvent.firstResponser !== this) {
            newEvent.firstResponser.mouseDown(event)
        }
    }

    mouseMove(event) {
        if (!event.isDown) {
            return
        }
        if (this._firstResponser) {
            const newEvent = new TouchEvent()
            newEvent.isDown = true
            newEvent.firstResponser = this._firstResponser
            newEvent.point = this.convertPointToView(event.point, event.firstResponser)
            newEvent.windowPoint = event.windowPoint.copy()
            newEvent.event = "mouseCancel"
            newEvent.offset = event.offset
            if (newEvent.firstResponser !== this) {
                newEvent.firstResponser.mouseCancel(event)
            }
            this._firstResponser = nil
        }
        if (event.offset) {
            this.contentOffset = new Point(this.contentOffset.x + event.offset.x, this.contentOffset.y + event.offset.y)
        }
    }

    mouseUp(event) {
        if (this._firstResponser) {
            const newEvent = new TouchEvent()
            newEvent.isDown = false
            newEvent.firstResponser = this._firstResponser
            newEvent.point = this.convertPointToView(event.point, event.firstResponser)
            newEvent.windowPoint = event.windowPoint.copy()
            newEvent.event = "mouseUp"
            if (newEvent.firstResponser !== this) {
                newEvent.firstResponser.mouseUp(event)
            }
            this._firstResponser = nil
        }
    }

    mouseCancel(event) {
        if (this._firstResponser) {
            const newEvent = new TouchEvent()
            newEvent.isDown = false
            newEvent.firstResponser = this._firstResponser
            newEvent.point = this.convertPointToView(event.point, event._firstResponser)
            newEvent.windowPoint = event.windowPoint.copy()
            newEvent.event = "mouseCancel"
            if (newEvent.firstResponser !== this) {
                newEvent.firstResponser.mouseCancel(event)
            }
            this._firstResponser = nil
        }
    }

    render(ctx) {
        ctx.save()
        ctx.alpha = ctx.alpha * this.backgroundAlpha
        if (ctx.alpha != 0) {
            ctx.shadowColor = this.shadowColor
            ctx.shadowBlur = this.shadowBlur
            ctx.shadowOffset = this.shadowOffset
            ctx.fillStyle = this.backgroundColor;
            ctx.fillRect(0, 0, this.contentSize.width, this.contentSize.height)
            this.draw(ctx)
            if (this.boarderWidth != 0) {
                ctx.strokeStyle = this.boarderColor
                ctx.lineWidth = this.boarderWidth
                ctx.strokeRect(0, 0, this.contentSize.width, this.contentSize.height)
            }
        }
        ctx.restore()
    }

    hitTest(point) {
        return this
    }
}
