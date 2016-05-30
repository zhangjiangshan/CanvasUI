"use stirct"
import {drawloop} from './Drawloop'
import {nil} from '../util/Util'
import {Tween} from '../util/Tween'

export let AnimationModel = false

export class AnimatElement {
    constructor(view, key, to, from=view[key]) {
        this.view = view
        this.key = key
        this.to = to
        this.from = from
        this._progress = 0
    }

    get progress() {
        return this._progress
    }
    set progress(newValue) {
        this._progress = newValue
        if (this.view && this.key) {
            if (newValue == 1) {
                this.view[this.key] = this.to
            } else {
                this.view[this.key] = this.from.add(this.to.minus(this.from).multiply(newValue))
            }
        }
    }
}

class AnimationBase {
    constructor() {
        this.willStartFunc = nil
        this.didFinishFuncs = nil
        this._willStartFunc = nil
        this._didFinishFunc = nil
        this.isPaused = true
    }

    start() {
        this.isPaused = false
        if (this.willStartFunc) {
            this.willStartFunc(this)
        }
        if (this._willStartFunc) {
            this._willStartFunc(this)
        }
    }

    didFinish(complete) {
        this.isPaused = true
        if (this._didFinishFunc) {
            this._didFinishFunc(this, complete)
        }
        if (this.didFinishFunc) {
            this.didFinishFunc(this, complete)
        }
    }

    toEnd() {
        this.didFinish(true)
    }
}

export class ConcurrentAnimationQueue extends AnimationBase {
    constructor(animations) {
        super()
        this.animations = animations.slice()
        let runningNumber = 0
        for (let animation of this.animations) {
            animation._willStartFunc = () => {
                runningNumber += 1
            }
            animation._didFinishFunc = () => {
                runningNumber -= 1
                if (runningNumber == 0) {
                    this.didFinish(true)
                }
            }
        }
    }

    toEnd() {
        super.toEnd()
        for (let animation of this.animations) {
            animation.toEnd()
        }
    }

    start() {
        if (!this.isPaused) {
            return
        }
        super.start()
        for (let animation of this.animations) {
            animation.start()
        }
    }
}

export class SerialAnimationQueue extends AnimationBase {
    constructor(animations) {
        super()
        this.animations = animations
        this.runningNumber = 0
        for (let animation of this.animations) {
            animation._didFinishFunc = () => {
                this.runningNumber  += 1
                if (this.runningNumber  == this.animations.count) {
                    this.didFinish(true)
                } else {
                    this.nextAnimation()
                }
            }
        }
        this.nextAnimation()
    }

    nextAnimation() {
        if (this.runningNumber  >= this.animations.length) {
            return
        }
        const animation = this.animations[this.runningNumber]
        animation.start()
    }

    toEnd() {
        this.runningNumber = this.animations.length
        super.toEnd()
        for (let animation of this.animations) {
            animation.toEnd()
        }
    }
}

export const AnimationCurve = {
    Linear:             0,
    CurveEaseIn:        1,
    CurveEaseOut:       2,
    CurveEaseInOut:     3
};

export class AnimatAction extends AnimationBase {
    constructor(view, key, to, duration, curve=AnimationCurve.Linear) {
        super()
        const lastActor = view.animations[key]
        if (lastActor) {
            lastActor.pause()
        }
        view.animations[key] = this
        this.element = new AnimatElement(view, key, to)
        this.duration = duration
        this.frameNum = duration * 60
        this.currentFrame = 0
        const frames = this.frameNum
        switch (curve) {
            case AnimationCurve.CurveEaseIn:
                this.timeFunc = (x) => {
                    return Tween.Linear(x, 0, 1, frames)
                }
                break
            case AnimationCurve.CurveEaseOut:
                this.timeFunc = (x) => {
                    return Tween.Quad.easeIn(x, 0, 1, frames)
                }
                break
            case AnimationCurve.CurveEaseInOut:
                this.timeFunc = (x) => {
                    return Tween.Quad.easeOut(x, 0, 1, frames)
                }
                break
            default:
                this.timeFunc = (x) => {
                    return Tween.Quad.easeInOut(x, 0, 1, frames)
                }
                break
        }
    }

    get progress() {
        return this.timeFunc(this.currentFrame)
    }

    start() {
        if (!this.isPaused) {
            return
        }
        this.currentFrame = 0
        super.start()
        this.step()
    }

    pause() {
        this.isPaused = true
        this.didFinish(false)
    }

    cancel() {
        this.isPaused = true
        super.didFinish(false)
    }

    immediatelyToEnd() {
        this.isPaused = true
        const key = "_" + this.element.key
        this.element.view[key] = this.element.to
        super.didFinish(false)
    }

    resume() {
        if (!this.isPaused) {
            return
        }
        this.isPaused = false
        this.step()
    }

    toEnd() {
        this.isPaused = false
        this.currentFrame = this.frameNum - 1
        super.toEnd()
    }

    didFinish(complete) {
        if (!complete) {
            this.element.view[this.element.key] = this.element.to.multiply(this.progress)
        } else {
            this.element.view[this.element.key] = this.element.to
        }
        super.didFinish(complete)
    }

    step() {
        if (this.isPaused) {
            return
        }
        this.currentFrame += 1
        if (this.currentFrame < this.frameNum - 1) {
            requestAnimationFrame((timestamp) => {
                if (this.isPaused) {
                    return
                }
                AnimationModel = true
                this.element.progress = this.progress
                drawloop.forceRender()
                AnimationModel = false
                this.step()
            })
        } else {
            requestAnimationFrame((timestamp) => {
                if (this.isPaused) {
                    return
                }
                AnimationModel = true
                this.element.progress = 1
                drawloop.forceRender()
                AnimationModel = false
                this.didFinish(true)
            })
        }
    }
}
