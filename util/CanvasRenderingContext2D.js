"use strict"
import uuid from 'node-uuid'

CanvasRenderingContext2D.createImageContext = (w, h, scale=backingScale()) => {
    var canvas = document.createElement(uuid.v1())
    const canvasWidth = w * scale
    const canvasHeight = h * scale
    canvas.width  = canvasWidth
    canvas.height = canvasHeight
    canvas.style.width = w + "px"
    canvas.style.height = h + "px"
    canvas.style.background = "#777099"
    const ctx =  canvas.getContext("2d");
    ctx.scale(scale, scale)
    return ctx
}

CanvasRenderingContext2D.prototype.getImageFromContext = (ctx) => {
    const img = document.createElement(uuid.v1())
    img.src = ctx.canvas.toDataURL("image/png")
    return img
}
