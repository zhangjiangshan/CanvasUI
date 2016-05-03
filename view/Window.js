"use strict"
import {nil} from '../util/Util'
import View from './View'
import {drawloop} from './Drawloop'
import RootView from '../main/RootView'
import {Point, Size, Edge, ViewAutoresizing} from './Geometry'

export default class Window extends View {
    constructor(x=0, y=0, width=0, height=0) {
        super(x, y, width, height)
        this.window = this
        this.backgroundColor = "#00a488"
        this.rootView = nil
        this.firstResponser = this
    }

    render(context) {

    }

    _render() {
        const ctx = this.getContext()
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)
        super._render()
    }

    makeKeyAndVisible() {
        drawloop.keyWindow = this
        const rootView = new RootView()
        rootView.size = this.size.copy()
        this.rootView = rootView
        this.addSubview(rootView)
    }

    _layoutSubviews(oldSize) {
        super._layoutSubviews(oldSize)
    }

    receiveMouseDown(point) {
        const p = new Point(point[0], point[1])
        const responser = this.hitTest(p)
        this.firstResponser = responser
        this.firstResponser.mouseDown(this.convertPointToView(p, this.firstResponser))
    }

    receiveMouseMove(point) {
        const p = new Point(point[0], point[1])
        //this.firstResponser.mouseMove(this.convertPointToView(p, this.firstResponser))
    }

    receiveMouseUp(point) {
        const p = new Point(point[0], point[1])
        const responser = this.hitTest(p)
        if (this.firstResponser === responser) {
            this.firstResponser.mouseUp(this.convertPointToView(p, this.firstResponser))
        } else {
            this.firstResponser.mouseCancel(this.convertPointToView(p, this.firstResponser))
        }
        this.firstResponser = this
    }

    static renderHtml() {
        return `<!DOCTYPE html>
        <head>
            <title id="title"></title>
            <style type="text/css">
	           html,body { background:#fff; height:100%; margin:0; padding:0; overflow:hidden }
	              canvas { position:absolute; top:0; left:0 }
            </style>
        </head>
        <body>
            <canvas id="canvas"></canvas>
            <script src="./dist/bundle.js"></script>

        <body>`
    }
}

if (typeof window != 'undefined') {
    console.log("Hell")
    const rooWindow = new Window()
    window.rootWindow = rooWindow

    // handle retina display
    function backingScale() {
        if ('devicePixelRatio' in window) {
            if (window.devicePixelRatio > 1) {
                return window.devicePixelRatio;
            }
        }
        return 1;
    }


    function resizeCanvas() {
		const w = document.body.offsetWidth,
		      h = document.body.offsetHeight;
        const canvas = document.getElementById("canvas")
        const scale = backingScale()
        const canvasWidth = w * scale
        const canvasHeight = h * scale
		canvas.width  = canvasWidth
		canvas.height = canvasHeight
        canvas.style.width = w + "px"
        canvas.style.height = h + "px"
        canvas.style.background = "#777099"

        const ctx =  canvas.getContext("2d");
        ctx.scale(scale, scale)
        rootWindow.size = new Size(w,h)
	}

    function addTouchListener() {
        const canvas = document.getElementById("canvas")
        canvas.addEventListener("mousedown", mouseDown, false);
        canvas.addEventListener("mousemove", mouseMove, false);
        canvas.addEventListener("mouseup", mouseUp, false);
        // canvas.addEventListener("touchstart", touchDown, false);
        // canvas.addEventListener("touchend", touchUp, false);
        // canvas.addEventListener("touchmove", touchMove, false);
        // canvas.addEventListener("touchcancel", touchcancel, false);
    }

    function convertTouchPoint(e) {
        if (!e) {
            let e = event
        }
        const canvas = document.getElementById("canvas")
        const canX = e.pageX - canvas.offsetLeft
        const canY = e.pageY - canvas.offsetTop
        return [canX, canY]
    }

    function mouseDown(e) {
        const point = convertTouchPoint(e)
        rootWindow.receiveMouseDown(point)
    }

    function mouseMove(e) {
        const point = convertTouchPoint(e)
        rootWindow.receiveMouseMove(point)
    }

    function mouseUp(e) {
        const point = convertTouchPoint(e)
        rootWindow.receiveMouseUp(point)
    }


    resizeCanvas()
    addTouchListener()
    window.addEventListener('resize', resizeCanvas, false);
    rooWindow.makeKeyAndVisible()
}
