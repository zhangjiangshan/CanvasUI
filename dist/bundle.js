(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _View2 = require("../view/View");

var _View3 = _interopRequireDefault(_View2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RootView = function (_View) {
    _inherits(RootView, _View);

    function RootView() {
        _classCallCheck(this, RootView);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RootView).call(this));

        _this.backgroundColor = "red";
        _this.size = { width: 100, height: 100 };
        console.log("rootView");
        return _this;
    }

    return RootView;
}(_View3.default);

exports.default = RootView;

},{"../view/View":7}],2:[function(require,module,exports){
"use strict";

var _Array = require("./util/Array");

var _Array2 = _interopRequireDefault(_Array);

var _Util = require("./util/Util");

var _BaseObject = require("./view/BaseObject");

var _BaseObject2 = _interopRequireDefault(_BaseObject);

var _View = require("./view/View");

var _View2 = _interopRequireDefault(_View);

var _Window = require("./view/Window");

var _Window2 = _interopRequireDefault(_Window);

var _RootView = require("./demo/RootView");

var _RootView2 = _interopRequireDefault(_RootView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./demo/RootView":1,"./util/Array":3,"./util/Util":4,"./view/BaseObject":5,"./view/View":7,"./view/Window":8}],3:[function(require,module,exports){
"use strict";

Array.prototype.indexOfOld = Array.prototype.indexOf;
Array.prototype.indexOf = function (e, fn) {
    if (!fn) {
        return this.indexOfOld(e);
    } else {
        if (typeof fn === 'string') {
            var att = fn;
            fn = function fn(e) {
                return e[att];
            };
        }
        return this.map(fn).indexOfOld(e);
    }
};

Array.prototype.removeObject = function (object) {
    var index = this.indexOf(object);
    if (index >= 0) {
        this.splice(index, 1);
    }
};

},{}],4:[function(require,module,exports){

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.__Func__ = __Func__;
function __Func__() {
    var ownName = arguments.callee.toString();
    ownName = ownName.substr('function '.length);
    return ownName.substr(0, ownName.indexOf('('));
}

var nil = exports.nil = {};

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseObject = function () {
    function BaseObject() {
        _classCallCheck(this, BaseObject);
    }

    // static init() {
    //     const result = new this()
    //     const handler = {}
    //     result.configProxyHandler(handler)
    //     const proxy = new Proxy(result, handler)
    //     proxy.prototype = result.prototype
    //     return proxy
    // }
    //
    // configProxyHandler(handler) {
    //     handler.get = (obj, prop) => {
    //         if(!obj.hasOwnProperty(prop)) {
    //             return null
    //         } else {
    //             return obj[prop]
    //         }
    //     }
    // }

    _createClass(BaseObject, [{
        key: "className",
        value: function className() {
            return self.constructor.name;
        }
    }]);

    return BaseObject;
}();

exports.default = BaseObject;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.drawloop = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Util = require("../util/Util.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Drawloop = function () {
    function Drawloop() {
        _classCallCheck(this, Drawloop);

        this.needsRender = false;
        this.keyWindow = _Util.nil;
    }

    _createClass(Drawloop, [{
        key: "render",
        value: function render() {
            console.log("begin render");
            this.keyWindow._render();
            console.log("end render");
            this.needsRender = false;
        }
    }, {
        key: "needsForRender",
        value: function needsForRender() {
            var _this = this;

            if (this.needsRender === false) {
                this.needsRender = true;
                setTimeout(function () {
                    _this.render();
                }, 1);
            }
        }
    }]);

    return Drawloop;
}();

var drawloop = exports.drawloop = new Drawloop();

},{"../util/Util.js":4}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseObject2 = require('./BaseObject');

var _BaseObject3 = _interopRequireDefault(_BaseObject2);

var _Util = require('../util/Util.js');

var _Drawloop = require('./Drawloop');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var View = function (_BaseObject) {
    _inherits(View, _BaseObject);

    function View() {
        _classCallCheck(this, View);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(View).call(this));

        _this._backgroundColor = "#00a488";
        _this._position = { x: 0, y: 0 };
        _this._size = { width: 0, height: 0 };
        _this.subviews = new Array();
        _this.superview = _Util.nil;
        _this.window = _Util.nil;
        return _this;
    }

    _createClass(View, [{
        key: 'getContext',
        value: function getContext() {
            var canvas = document.getElementById("canvas");
            return canvas.getContext("2d");
        }
    }, {
        key: 'addSubview',
        value: function addSubview(view) {
            view.willMoveToSuperview(this);
            view.willMoveToWindow(this.window);

            this.subviews.push(view);
            view.superview = this;
            view.window = this.window;

            view.didMoveToSuperview();
            view.didMoveToWindow();
        }
    }, {
        key: 'removeSubview',
        value: function removeSubview(view) {
            view.willMoveToSuperview(_Util.nil);
            view.willMoveToWindow(_Util.nil);

            this.subviews.removeObject(view);
            view.superview = _Util.nil;
            view.window = _Util.nil;

            view.didMoveToSuperview();
            view.didMoveToWindow();
        }
    }, {
        key: 'removeFromSuperview',
        value: function removeFromSuperview() {
            if (this.superView) {
                this.superView.removeSubview(this);
            }
        }
    }, {
        key: 'willMoveToWindow',
        value: function willMoveToWindow(window) {}
    }, {
        key: 'didMoveToWindow',
        value: function didMoveToWindow() {
            var newWindow = this.window;
            var setWindow = function setWindow(view) {
                for (var subview in view.subviews) {
                    subview.willMoveToWindow(newWindow);
                    subview.window = newWindow;
                    subview.didMoveToWindow();
                    setWindow(subview);
                }
            };
            this._setNeedsRender();
        }
    }, {
        key: 'willMoveToSuperview',
        value: function willMoveToSuperview(view) {}
    }, {
        key: 'didMoveToSuperview',
        value: function didMoveToSuperview() {
            this._setNeedsRender();
        }
    }, {
        key: 'isDescendantOfView',
        value: function isDescendantOfView(view) {
            var next = this;
            while (next !== view && next) {
                next = next.superview;
            }
            return !!next;
        }
    }, {
        key: 'isAcendantOfView',
        value: function isAcendantOfView(view) {
            var next = view;
            while (next !== this && next) {
                next = next.superview;
            }
            return !!next;
        }
    }, {
        key: 'convertPointToView',
        value: function convertPointToView(point, view) {
            if (this === view) {
                return point;
            } else if (this.isDescendantOfView(view)) {
                var next = this;
                var _convertPoint = point;
                while (next !== view && next !== _Util.nil) {
                    _convertPoint = { x: _convertPoint.x + next.position.x, y: _convertPoint.y + next.position.y };
                    next = next.superview;
                }
                return _convertPoint;
            } else if (this.isAcendantOfView(view)) {
                var array = new Array();
                var _next = view;
                while (_next !== this && _next !== _Util.nil) {
                    array.push(_next);
                    _next = _next.superview;
                }
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = array.reverse()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var value = _step.value;

                        convertPoint = { x: convertPoint.x - value.position.x, y: convertPoint.y - value.position.y };
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return convertPoint;
            } else if (this.window !== view.window) {
                console.log(this.toString() + ' and ' + this.toString() + ' are not on same window');
                return _Util.nil;
            }
        }
    }, {
        key: '_setNeedsRender',
        value: function _setNeedsRender() {
            _Drawloop.drawloop.needsForRender();
        }
    }, {
        key: '_checkAndSetNeedsRender',
        value: function _checkAndSetNeedsRender() {
            if (this.window !== _Util.nil && this.window === _Drawloop.drawloop.keyWindow) {
                _Drawloop.drawloop.needsForRender();
            }
        }
    }, {
        key: '_render',
        value: function _render() {
            console.log('render:' + this.toString());
            this.render();
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.subviews[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var view = _step2.value;

                    view._render();
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var ctx = this.getContext();
            ctx.fillStyle = this.backgroundColor;
            var position = this.convertPointToView({ x: 0, y: 0 }, this.window);
            ctx.fillRect(position.x, position.y, this.size.width, this.size.height);
        }
    }, {
        key: 'toString',
        value: function toString() {
            return this.className() + ':{position:(' + this.position.x + ',' + this.position.y + '), size:(' + this.size.width + ',' + this.size.height + ')}';
        }
    }, {
        key: 'backgroundColor',
        get: function get() {
            return this._backgroundColor;
        },
        set: function set(newValue) {
            this._backgroundColor = newValue;
            this._checkAndSetNeedsRender();
        }
    }, {
        key: 'position',
        get: function get() {
            return this._position;
        },
        set: function set(newValue) {
            this._position = newValue;
            this._checkAndSetNeedsRender();
        }
    }, {
        key: 'size',
        get: function get() {
            return this._size;
        },
        set: function set(newValue) {
            this._size = newValue;
            this._checkAndSetNeedsRender();
        }
    }]);

    return View;
}(_BaseObject3.default);

exports.default = View;

},{"../util/Util.js":4,"./BaseObject":5,"./Drawloop":6}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Util = require('../util/Util');

var _View2 = require('./View');

var _View3 = _interopRequireDefault(_View2);

var _Drawloop = require('./Drawloop');

var _RootView = require('../demo/RootView');

var _RootView2 = _interopRequireDefault(_RootView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Window = function (_View) {
    _inherits(Window, _View);

    function Window() {
        _classCallCheck(this, Window);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Window).call(this));

        _this.backgroundColor = "#00a488";
        _this.size = _this.getContext;
        return _this;
    }

    _createClass(Window, [{
        key: 'render',
        value: function render() {}
    }, {
        key: 'makeKeyAndVisible',
        value: function makeKeyAndVisible() {
            _Drawloop.drawloop.keyWindow = this;
            var rootView = new _RootView2.default();
            //rootView.size = {width:140, height:140}
            this.addSubview(rootView);

            var view1 = new _RootView2.default();
            view1.position = { x: 20, y: 20 };
            view1.size = { width: 40, height: 40 };
            view1.backgroundColor = "#ff0099";
            this.addSubview(view1);
        }
    }], [{
        key: 'renderHtml',
        value: function renderHtml() {
            return '<!DOCTYPE html>\n        <head>\n            <title id="title"></title>\n        </head>\n        <body>\n            <canvas id="canvas" position:absolute; top:0; left:0; width:100%; height:100%; background:black;"></canvas>\n            <script src="./dist/bundle.js"></script>\n\n        <body>';
        }
    }]);

    return Window;
}(_View3.default);

exports.default = Window;


if (typeof window != 'undefined') {
    var resizeCanvas = function resizeCanvas() {
        var w = document.body.offsetWidth,
            h = document.body.offsetHeight;
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.canvas.width = w;
        ctx.canvas.height = h;
        canvas.style.background = "#777099";
        _Drawloop.drawloop.needsForRender();
    };

    console.log("Hell");
    var rooWindow = new Window();
    window.rootWindow = rooWindow;
    rooWindow.makeKeyAndVisible();

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, false);
}

},{"../demo/RootView":1,"../util/Util":4,"./Drawloop":6,"./View":7}]},{},[2]);
