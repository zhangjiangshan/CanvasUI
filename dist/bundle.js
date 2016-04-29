(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

var _Label = require("./view/Label");

var _Label2 = _interopRequireDefault(_Label);

var _RootView = require("./main/RootView");

var _RootView2 = _interopRequireDefault(_RootView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./main/RootView":2,"./util/Array":3,"./util/Util":4,"./view/BaseObject":5,"./view/Geometry":8,"./view/Label":9,"./view/View":10,"./view/Window":11}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _View2 = require('../view/View');

var _View3 = _interopRequireDefault(_View2);

var _Geometry = require('../view/Geometry');

var _Label = require('../view/Label');

var _Label2 = _interopRequireDefault(_Label);

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

        var label = new _Label2.default(0, 20, 400, 30);
        _this.backgroundColor = "white";
        label.text = "canvalotion is here";
        _this.addSubview(label);

        return _this;
    }

    return RootView;
}(_View3.default);

exports.default = RootView;

},{"../view/Geometry":8,"../view/Label":9,"../view/View":10}],3:[function(require,module,exports){
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

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Util = require('../util/Util.js');

var _Geometry = require('./Geometry');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CGContext = function () {
    function CGContext(view) {
        _classCallCheck(this, CGContext);

        this.view = view;
        this._font = _Util.nil;
    }

    _createClass(CGContext, [{
        key: 'save',
        value: function save() {
            this.context.save();
        }
    }, {
        key: 'restore',
        value: function restore() {
            this.context.restore();
        }
    }, {
        key: 'convertPoint',
        value: function convertPoint(point) {
            var position = this.view.convertPointToView(point, this.view.window);
            return [position.x, position.y];
        }
    }, {
        key: 'fillRect',
        value: function fillRect(px, py, width, height) {
            var _convertPoint = this.convertPoint(new _Geometry.Point(px, py));

            var _convertPoint2 = _slicedToArray(_convertPoint, 2);

            var x = _convertPoint2[0];
            var y = _convertPoint2[1];

            this.context.fillRect(x, y, width, height);
        }
    }, {
        key: 'wrapText',
        value: function wrapText(text, px, py, maxWidth) {
            var lineHeight = arguments.length <= 4 || arguments[4] === undefined ? 26 : arguments[4];

            var _convertPoint3 = this.convertPoint(new _Geometry.Point(px, py));

            var _convertPoint4 = _slicedToArray(_convertPoint3, 2);

            var x = _convertPoint4[0];
            var y = _convertPoint4[1];


            var words = text.split(' ');
            var line = '';

            for (var n = 0; n < words.length; n++) {
                var testLine = line + words[n] + ' ';
                var metrics = context.measureText(testLine);
                var testWidth = metrics.width;
                if (testWidth > maxWidth && n > 0) {
                    this.context.fillText(line, x, y);
                    line = words[n] + ' ';
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            }
            this.context.fillText(line, x, y);
        }
    }, {
        key: 'fillText',
        value: function fillText(text, px, py) {
            var maxWidth = arguments.length <= 3 || arguments[3] === undefined ? 9999 : arguments[3];

            var _convertPoint5 = this.convertPoint(new _Geometry.Point(px, py));

            var _convertPoint6 = _slicedToArray(_convertPoint5, 2);

            var x = _convertPoint6[0];
            var y = _convertPoint6[1];

            this.context.fillText(text, x, y, maxWidth);
        }
    }, {
        key: 'context',
        get: function get() {
            return this.view.getContext();
        }
    }, {
        key: 'alpha',
        get: function get() {
            return this.context.globalAlpha;
        },
        set: function set(newValue) {
            this.context.globalAlpha = newValue;
        }
    }, {
        key: 'fillStyle',
        get: function get() {
            return this.context.fillStyle;
        },
        set: function set(newValue) {
            this.context.fillStyle = newValue;
        }
    }, {
        key: 'textBaseline',
        get: function get() {
            return this.context.textBaseline;
        },
        set: function set(newValue) {
            this.context.textBaseline = newValue;
        }
    }, {
        key: 'font',
        get: function get() {
            return this._font;
        },
        set: function set(newValue) {
            if (newValue == _Util.nil) {
                this._font = _Util.nil;
                this.context.font = "";
            } else {
                this._font = newValue.copy();
                this.context.font = this.font.getFontText();
            }
        }
    }]);

    return CGContext;
}();

exports.default = CGContext;

},{"../util/Util.js":4,"./Geometry":8}],7:[function(require,module,exports){
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

},{"../util/Util.js":4}],8:[function(require,module,exports){
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
    }], [{
        key: "PointZero",
        value: function PointZero() {
            return new Point();
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

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Util = require('../util/Util');

var _View2 = require('./View');

var _View3 = _interopRequireDefault(_View2);

var _Geometry = require('./Geometry');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Label = function (_View) {
    _inherits(Label, _View);

    function Label() {
        var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var width = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
        var height = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

        _classCallCheck(this, Label);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Label).call(this, x, y, width, height));

        _this._multiLine = false;
        _this.text = _Util.nil;
        _this._textColor = "black";

        return _this;
    }

    _createClass(Label, [{
        key: 'render',
        value: function render(ctx) {
            _get(Object.getPrototypeOf(Label.prototype), 'render', this).call(this, ctx);
            var drawingText = this.text == _Util.nil ? "" : this.text;
            ctx.fillStyle = this.textColor;
            ctx.textBaseline = "top";
            if (this.isMultiLine) {
                ctx.wrapText(drawingText, 0, 0, this.size.width);
            } else {
                ctx.fillText(drawingText, 0, 0, this.size.width);
            }
        }
    }, {
        key: 'isMultiLine',
        get: function get() {
            return this._multiLine;
        }
    }, {
        key: 'setMultiLine',
        set: function set(newValue) {
            if (this._multiLine != newValue) {
                this._multiLine = newValue;
                this._checkAndSetNeedsRender();
            }
        }
    }, {
        key: 'textColor',
        get: function get() {
            return this._textColor;
        }
    }, {
        key: 'setTextColor',
        set: function set(newValue) {
            if (this._textColor != newValue) {
                this._textColor = newValue;
                this._checkAndSetNeedsRender();
            }
        }
    }]);

    return Label;
}(_View3.default);

exports.default = Label;

},{"../util/Util":4,"./Geometry":8,"./View":10}],10:[function(require,module,exports){
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

var _CGContext = require('./CGContext');

var _CGContext2 = _interopRequireDefault(_CGContext);

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
        _this._alpha = 1;
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
            view.window = this.window;

            this.subviews.push(view);
            view.superview = this;

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
            setWindow(this);
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
                var _convertPoint = point.copy();
                while (next !== view && next !== _Util.nil) {
                    _convertPoint = new _Geometry.Point(_convertPoint.x + next.position.x, _convertPoint.y + next.position.y);
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

                        convertPoint = new _Geometry.Point(convertPoint.x - value.position.x, convertPoint.y - value.position.y);
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
            var ctx = new _CGContext2.default(this);
            ctx.save();
            this.render(ctx);
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

            ctx.restore();
        }
    }, {
        key: 'render',
        value: function render(ctx) {
            ctx.alpha = ctx.alpha * this.alpha;
            ctx.fillStyle = this.backgroundColor;
            ctx.fillRect(0, 0, this.size.width, this.size.height);
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
        key: 'alpha',
        get: function get() {
            return this._alpha;
        },
        set: function set(newValue) {
            if (this._alpha != newValue) {
                this._alpha = newValue;
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

},{"../util/Util.js":4,"./BaseObject":5,"./CGContext":6,"./Drawloop":7,"./Geometry":8}],11:[function(require,module,exports){
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

var _RootView = require('../main/RootView');

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
        value: function render(context) {}
    }, {
        key: '_render',
        value: function _render() {
            var ctx = this.getContext();
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            _get(Object.getPrototypeOf(Window.prototype), '_render', this).call(this);
        }
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
    (function () {

        // handle retina display

        var backingScale = function backingScale() {
            if ('devicePixelRatio' in window) {
                if (window.devicePixelRatio > 1) {
                    return window.devicePixelRatio;
                }
            }
            return 1;
        };

        var resizeCanvas = function resizeCanvas() {
            var w = document.body.offsetWidth,
                h = document.body.offsetHeight;
            var canvas = document.getElementById("canvas");
            var scale = backingScale();
            var canvasWidth = w * scale;
            var canvasHeight = h * scale;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            canvas.style.width = w + "px";
            canvas.style.height = h + "px";
            canvas.style.background = "#777099";

            var ctx = canvas.getContext("2d");
            ctx.scale(scale, scale);
            rootWindow.size = new _Geometry.Size(w, h);
        };

        console.log("Hell");
        var rooWindow = new Window();
        window.rootWindow = rooWindow;
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas, false);
        rooWindow.makeKeyAndVisible();
    })();
}

},{"../main/RootView":2,"../util/Util":4,"./Drawloop":7,"./Geometry":8,"./View":10}]},{},[1]);
