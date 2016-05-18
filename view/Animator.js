"use stirct"
import {drawloop} from './Drawloop'
import {nil} from '../util/Util'

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
        this.isPaused = true
    }

    start() {
        this.isPaused = false
        if (this.willStartFunc) {
            this.willStartFunc(this)
        }
    }

    didFinish(complete) {
        this.isPaused = true
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
        this.animations = animations
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
        if (!this.isPause) {
            return
        }
        super.start()
        for (let animation of this.animations) {
            animation.start()
        }
    }
}
/*
export class SerialAnimationQueue extends AnimationBase {
    constructor(animations) {
        super()
        this.animations = animations
    }

    start() {
        if (!this.isPaused) {
            return
        }
        super.start()
        const array = this.animations
        for (let animation of this.animations) {
            if (!this.isPaused) {
                animation.resume()
            }
        }
    }
}*/

export class AnimatAction extends AnimationBase {
    constructor(view, key, to, duration=0.3) {
        super()
        const lastActor = view.animations[key]
        if (lastActor) {
            lastActor.pause()
        }
        view.animations[key] = this
        this.element = new AnimatElement(view, key, to)
        this.progress = 0
        this.duration = duration
        this.offset = 0
        this.space = (1 - this.offset) / (duration * 60)

        this._willStartFunc = nil
        this._didFinishFuncs = nil
    }

    start() {
        if (!this.isPaused) {
            return
        }
        this.progress = this.offset
        super.start()
        if (this._willStartFunc) {
            this._willStartFunc(this)
        }
        this.step()
    }

    pause() {
        this.isPaused = true
        this.didFinish(false)
    }

    cancel() {
        this.isPaused = true
        if (this._didFinishFunc) {
            this._didFinishFunc(this, false)
        }
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
        this.progess = 1
        super.toEnd()
    }

    didFinish(complete) {
        if (!complete) {
            this.element.view[this.element.key] = this.element.to.multiply(this.progress)
        } else {
            this.element.view[this.element.key] = this.element.to
        }
        if (this._didFinishFunc) {
            this._didFinishFunc(this, complete)
        }
        super.didFinish(complete)
    }

    step() {
        if (this.isPaused) {
            return
        }
        this.progress = this.progress + this.space
        if (this.progress < 1) {
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
