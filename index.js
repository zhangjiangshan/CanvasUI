"use strict"
import express from 'express'

var server = express()

server.get('/', function (req, res) {
  res.send('Hello World!')
})

server.listen(8080, function () {
  console.log('Limbo app listening on port 8080!')
})