"use strict"
import express from 'express'
import Window from './view/Window.js';

var server = express()

server.use('/dist', express.static('dist'));

server.get('/', function(req, res) {
  res.send(Window.renderHtml())
})

server.listen(8080, function() {
    console.log("start listen 8080")
})
