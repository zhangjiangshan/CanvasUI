"use strict"

export default class Window {
    constructor() {
        this.backgroundColor = "#00FF00"
    }

    willAppear() {

    }

    render() {
        console.log(self.constructor.name);
        var canvas = document.getElementById("Window");
        var ctx = canvas.getContext("2d");
        ctx.moveTo(postion.x, position.y);
        ctx.fillStyle = self.backgroundColor;
        ctx.fillRect(postion.x, postion.y, size.width, size.height);
    }

    renderHtml() {
        return '<!DOCTYPE html> \
        <head> \
            <title id="title"></title> \
        </head> \
        <body> \
            <canvas id="window" style="width:100%; height=100%;"></canvas> \
            <script src="./static/Window.js">Window.render()</script> \
        <body>'
    }
}
