(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _View2 = require('../view/View');

var _View3 = _interopRequireDefault(_View2);

var _Geometry = require('../view/Geometry');

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
        _this.autoresizingMask = _Geometry.ViewAutoresizing.FlexibleWidth | _Geometry.ViewAutoresizing.FlexibleHeight | _Geometry.ViewAutoresizing.FlexibleLeftMargin;
        _this.position = new _Geometry.Point(200, 30);
        console.log("rootView");
        return _this;
    }

    return RootView;
}(_View3.default);

exports.default = RootView;

},{"../view/Geometry":7,"../view/View":8}],2:[function(require,module,exports){
"use strict";

var _Array = require("./util/Array");

var _Array2 = _interopRequireDefault(_Array);

var _Util = require("./util/Util");

var _Geometry = require("./view/Geometry");

var _BaseObject = require("./view/BaseObject");

var _BaseObject2 = _interopRequireDefault(_BaseObject);

var _View = require("./view/View");

var _View2 = _interopRequireDefault(_View);

var _Window = require("./view/Window");

var _Window2 = _interopRequireDefault(_Window);

var _RootView = require("./demo/RootView");

var _RootView2 = _interopRequireDefault(_RootView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./demo/RootView":1,"./util/Array":3,"./util/Util":4,"./view/BaseObject":5,"./view/Geometry":7,"./view/View":8,"./view/Window":9}],3:[function(require,module,exports){
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
exports.copy = copy;
function __Func__() {
    var ownName = arguments.callee.toString();
    ownName = ownName.substr('function '.length);
    return ownName.substr(0, ownName.indexOf('('));
}

var nil = exports.nil = NaN;

function copy(object) {
    return Object.assign({}, object);
}

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
        }
    }, {
        key: "needsForRender",
        value: function needsForRender() {
            if (this.needsRender === false) {
                this.needsRender = true;
                this.render();
                this.needsRender = false;
                //setTimeout(() => {this.render()}, 1);
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = exports.Point = function () {
    function Point() {
        var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

        _classCallCheck(this, Point);

        this.x = x;
        this.y = y;
    }

    _createClass(Point, [{
        key: "valueOf",
        value: function valueOf() {
            return JSON.stringify(this);
        }
    }, {
        key: "round",
        value: function round() {
            return new Point(Math.round(this.x), Math.round(this.y));
        }
    }, {
        key: "copy",
        value: function copy() {
            return new Point(this.x, this.y);
        }
    }]);

    return Point;
}();

var Size = exports.Size = function () {
    function Size() {
        var width = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var height = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

        _classCallCheck(this, Size);

        this.width = width;
        this.height = height;
    }

    _createClass(Size, [{
        key: "valueOf",
        value: function valueOf() {
            return JSON.stringify(this);
        }
    }, {
        key: "round",
        value: function round() {
            return new Size(Math.round(this.width), Math.round(this.height));
        }
    }, {
        key: "copy",
        value: function copy() {
            return new Size(this.width, this.height);
        }
    }]);

    return Size;
}();

var Edge = exports.Edge = function () {
    function Edge() {
        var top = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var left = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var bottom = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
        var right = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

        _classCallCheck(this, Edge);

        this.top = top;
        this.left = left;
        this.bottom = bottom;
        this.right = right;
    }

    _createClass(Edge, [{
        key: "valueOf",
        value: function valueOf() {
            return JSON.stringify(this);
        }
    }, {
        key: "round",
        value: function round() {
            return new Edge(Math.round(this.top), Math.round(this.left), Math.round(this.bottom), Math.round(this.right));
        }
    }]);

    return Edge;
}();

var ViewAutoresizing = exports.ViewAutoresizing = {
    None: 0,
    FlexibleLeftMargin: 1 << 0,
    FlexibleWidth: 1 << 1,
    FlexibleRightMargin: 1 << 2,
    FlexibleTopMargin: 1 << 3,
    FlexibleHeight: 1 << 4,
    FlexibleBottomMargin: 1 << 5
};

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseObject2 = require('./BaseObject');

var _BaseObject3 = _interopRequireDefault(_BaseObject2);

var _Util = require('../util/Util.js');

var _Drawloop = require('./Drawloop');

var _Geometry = require('./Geometry');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var View = function (_BaseObject) {
    _inherits(View, _BaseObject);

    function View() {
        var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var width = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
        var height = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

        _classCallCheck(this, View);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(View).call(this));

        _this._backgroundColor = "#00a488";
        _this._position = new _Geometry.Point(x, y);
        _this._size = new _Geometry.Size(width, height);
        _this.subviews = new Array();
        _this.autoresizingMask = _Geometry.ViewAutoresizing.None;
        _this.superview = _Util.nil;
        _this.window = _Util.nil;
        return _this;
    }

    _createClass(View, [{
        key: '_layoutSubviews',
        value: function _layoutSubviews() {
            var oldSize = arguments.length <= 0 || arguments[0] === undefined ? this.size : arguments[0];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.subviews[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var view = _step.value;

                    view._configAutoResizing(oldSize);
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

            this.layoutSubviews();
        }
    }, {
        key: '_configAutoResizing',
        value: function _configAutoResizing(oldSize) {
            if (!this.superview) {
                return;
            }

            var isFlexLeft = (this.autoresizingMask & _Geometry.ViewAutoresizing.FlexibleLeftMargin) > 0;
            var isFlexRight = (this.autoresizingMask & _Geometry.ViewAutoresizing.FlexibleRightMargin) > 0;
            var isFlexWidth = (this.autoresizingMask & _Geometry.ViewAutoresizing.FlexibleWidth) > 0;

            var isFlexTop = (this.autoresizingMask & _Geometry.ViewAutoresizing.FlexibleTopMargin) > 0;
            var isFlexBottom = (this.autoresizingMask & _Geometry.ViewAutoresizing.FlexibleBottomMargin) > 0;
            var isFlexHeight = (this.autoresizingMask & _Geometry.ViewAutoresizing.FlexibleHeight) > 0;

            var newPosition = this.position.copy();
            var newSize = this.size.copy();

            //横向
            var diffWidth = this.superview.size.width - oldSize.width;
            var flexNumber = 0;
            if (isFlexLeft) {
                flexNumber += 1;
            }
            if (isFlexRight) {
                flexNumber += 1;
            }
            if (isFlexWidth) {
                flexNumber += 1;
            }
            if (flexNumber != 0) {
                var horizontalSpace = Math.round(diffWidth / flexNumber);
                if (isFlexLeft) {
                    newPosition.x += horizontalSpace;
                }
                if (isFlexWidth) {
                    newSize.width += horizontalSpace;
                }
            }
            //纵向
            var diffHeight = this.superview.size.height - oldSize.height;
            flexNumber = 0;
            if (isFlexTop) {
                flexNumber += 1;
            }
            if (isFlexBottom) {
                flexNumber += 1;
            }
            if (isFlexHeight) {
                flexNumber += 1;
            }
            if (flexNumber != 0) {
                var verticalSpace = Math.round(diffHeight / flexNumber);
                if (isFlexTop) {
                    newPosition.y += verticalSpace;
                }
                if (isFlexHeight) {
                    newSize.height += verticalSpace;
                }
            }
            this._position = newPosition;
            this._size = newSize;
        }
    }, {
        key: 'layoutSubviews',
        value: function layoutSubviews() {}
    }, {
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
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = view.subviews[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var subview = _step2.value;

                        subview.willMoveToWindow(newWindow);
                        subview.window = newWindow;
                        subview.didMoveToWindow();
                        setWindow(subview);
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
            };
            if (newWindow) {
                this._layoutSubviews(this.size);
            }
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
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = array.reverse()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var value = _step3.value;

                        convertPoint = { x: convertPoint.x - value.position.x, y: convertPoint.y - value.position.y };
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
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
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.subviews[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var view = _step4.value;

                    view._render();
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
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
            if (this._backgroundColor != newValue) {
                this._backgroundColor = newValue;
                this._checkAndSetNeedsRender();
            }
        }
    }, {
        key: 'position',
        get: function get() {
            return this._position;
        },
        set: function set(newValue) {
            var newPosition = newValue.round();
            if (this._position != newPosition) {
                this._position = newPosition;
                this._checkAndSetNeedsRender();
            }
        }
    }, {
        key: 'size',
        get: function get() {
            return this._size;
        },
        set: function set(newValue) {
            var newSize = newValue.round();
            var oldSize = this._size;
            if (oldSize != newSize) {
                this._size = newSize;
                this._layoutSubviews(oldSize);
                this._checkAndSetNeedsRender();
            }
        }
    }]);

    return View;
}(_BaseObject3.default);

exports.default = View;

},{"../util/Util.js":4,"./BaseObject":5,"./Drawloop":6,"./Geometry":7}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Util = require('../util/Util');

var _View2 = require('./View');

var _View3 = _interopRequireDefault(_View2);

var _Drawloop = require('./Drawloop');

var _RootView = require('../demo/RootView');

var _RootView2 = _interopRequireDefault(_RootView);

var _Geometry = require('./Geometry');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Window = function (_View) {
    _inherits(Window, _View);

    function Window() {
        var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var width = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
        var height = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

        _classCallCheck(this, Window);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Window).call(this, x, y, width, height));

        _this.window = _this;
        _this.backgroundColor = "#00a488";
        _this.rootView = _Util.nil;
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
            rootView.size = this.size.copy();
            this.rootView = rootView;
            this.addSubview(rootView);
        }
    }, {
        key: '_layoutSubviews',
        value: function _layoutSubviews(oldSize) {
            _get(Object.getPrototypeOf(Window.prototype), '_layoutSubviews', this).call(this, oldSize);
        }
    }], [{
        key: 'renderHtml',
        value: function renderHtml() {
            return '<!DOCTYPE html>\n        <head>\n            <title id="title"></title>\n            <style type="text/css">\n\t           html,body { background:#fff; height:100%; margin:0; padding:0; overflow:hidden }\n\t              canvas { position:absolute; top:0; left:0 }\n            </style>\n        </head>\n        <body>\n            <canvas id="canvas"></canvas>\n            <script src="./dist/bundle.js"></script>\n\n        <body>';
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
        rootWindow.size = new _Geometry.Size(w, h);
    };

    console.log("Hell");
    var rooWindow = new Window();
    window.rootWindow = rooWindow;

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, false);
    rooWindow.makeKeyAndVisible();
}

},{"../demo/RootView":1,"../util/Util":4,"./Drawloop":6,"./Geometry":7,"./View":8}]},{},[2]);
