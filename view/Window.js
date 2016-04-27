"use strict"
import {nil} from '../util/Util'
import View from './View'
import {drawloop} from './Drawloop'
import RootView from '../demo/RootView'

export default class Window extends View {
    constructor() {
        super()
        this.backgroundColor = "#00a488"
        this.size = this.getContext
    }

    render() {

    }

    makeKeyAndVisible() {
        drawloop.keyWindow = this
        const rootView = new RootView()
        //rootView.size = {width:140, height:140}
        this.addSubview(rootView)

        const view1 = new RootView()
        view1.position = {x:20, y:20}
        view1.size = {width:40, height:40}
        view1.backgroundColor = "#ff0099"
        this.addSubview(view1)
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
    rooWindow.makeKeyAndVisible()

    function resizeCanvas() {
		const w = document.body.offsetWidth,
		      h = document.body.offsetHeight;
        const canvas = document.getElementById("canvas");
        const ctx =  canvas.getContext("2d");
		ctx.canvas.width  = w;
		ctx.canvas.height = h;
        canvas.style.background = "#777099"
        drawloop.needsForRender()
	}
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas, false);
}
