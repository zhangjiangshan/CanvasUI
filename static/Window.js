"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Window = function () {
    function Window() {
        _classCallCheck(this, Window);

        this.backgroundColor = "#00FF00";
    }

    _createClass(Window, [{
        key: "willAppear",
        value: function willAppear() {}
    }, {
        key: "render",
        value: function render() {
            console.log(self.constructor.name);
            var canvas = document.getElementById("Window");
            var ctx = canvas.getContext("2d");
            ctx.moveTo(postion.x, position.y);
            ctx.fillStyle = self.backgroundColor;
            ctx.fillRect(postion.x, postion.y, size.width, size.height);
        }
    }, {
        key: "renderHtml",
        value: function renderHtml() {
            return '<!DOCTYPE html> \
        <head> \
            <title id="title"></title> \
        </head> \
        <body> \
            <canvas id="window" style="width:100%; height=100%;"></canvas> \
            <script src="./static/Window.js">Window.render()</script> \
        <body>';
        }
    }]);

    return Window;
}();

exports.default = Window;