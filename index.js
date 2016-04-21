"use strict"
import express from 'express'
import Window from './view/Window'

var server = express()

server.use('/static', express.static('static'));

server.get('/', function (req, res) {
  const window = new Window()
  console.log(window.renderHtml())

  res.send(window.renderHtml())
})

server.listen(8080, function () {
    console.log("start listen 8080")
})
