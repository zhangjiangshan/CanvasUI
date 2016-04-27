"use strict"
import {nil} from '../util/Util'
import View from './View'
import {drawloop} from './Drawloop'
import RootView from '../demo/RootView'
import {Point, Size, Edge, ViewAutoresizing} from './Geometry'

export default class Window extends View {
    constructor(x=0, y=0, width=0, height=0) {
        super(x, y, width, height)
        this.window = this
        this.backgroundColor = "#00a488"
        this.rootView = nil
    }

    render() {

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

    function resizeCanvas() {
		const w = document.body.offsetWidth,
		      h = document.body.offsetHeight;
        const canvas = document.getElementById("canvas");
        const ctx =  canvas.getContext("2d");
		ctx.canvas.width  = w;
		ctx.canvas.height = h;
        canvas.style.background = "#777099"
        rootWindow.size = new Size(w,h)
	}
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas, false);
    rooWindow.makeKeyAndVisible()
}
