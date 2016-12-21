(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _Array = require("./util/Array");

var _Array2 = _interopRequireDefault(_Array);

var _Window = require("./view/Window");

var _Window2 = _interopRequireDefault(_Window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./util/Array":3,"./view/Window":19}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _View2 = require('../view/View');

var _View3 = _interopRequireDefault(_View2);

var _Geometry = require('../view/Geometry');

var _Label = require('../view/Label');

var _Label2 = _interopRequireDefault(_Label);

var _ImageView = require('../view/ImageView');

var _ImageView2 = _interopRequireDefault(_ImageView);

var _Button = require('../view/Button');

var _Button2 = _interopRequireDefault(_Button);

var _ScrollView = require('../view/ScrollView');

var _ScrollView2 = _interopRequireDefault(_ScrollView);

var _Animator = require('../view/Animator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RootView = function (_View) {
    _inherits(RootView, _View);

    function RootView() {
        _classCallCheck(this, RootView);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RootView).call(this));

        _this.backgroundColor = "white";
        _this.autoresizingMask = _Geometry.ViewAutoresizing.FlexibleWidth | _Geometry.ViewAutoresizing.FlexibleHeight;

        var scrollView = new _ScrollView2.default(120, 150, 200, 200);
        scrollView.contentSize = new _Geometry.Size(400, 400);
        scrollView.backgroundColor = "red";
        _this.addSubview(scrollView);

        var label = new _Label2.default(0, 20, 400, 90);
        label.text = "Multimodal Learning用于面部表情识别，多模态分别表现为图像数据和标记点数据，使用Multimodal Learning对二者融合的意义在于更全面地表现表情信息以及区分不同模态的数据对表情识别的影响。";
        _this.addSubview(label);
        label.isMultiLine = true;

        var image = new Image();
        image.src = "./static/test.png";
        var imageView = new _ImageView2.default(image);
        imageView.position = new _Geometry.Point(60, 30);
        imageView.size = new _Geometry.Size(100, 100);
        imageView.equalRatio = _ImageView.EqualRatio.FlexibleHeight;
        imageView.backgroundColor = "#8800AA";
        scrollView.addSubview(imageView);

        var imageView2 = new _ImageView2.default(image);
        imageView2.position = new _Geometry.Point(0, 200);
        imageView2.size = new _Geometry.Size(100, 100);
        imageView2.equalRatio = _ImageView.EqualRatio.FlexibleWidth;
        imageView2.backgroundColor = "#8800AA";
        _this.addSubview(imageView2);

        var imageView3 = new _ImageView2.default(image);
        imageView3.position = new _Geometry.Point(0, 300);
        imageView3.size = new _Geometry.Size(100, 100);
        imageView3.equalRatio = _ImageView.EqualRatio.FlexibleWidth;
        imageView3.backgroundColor = "#8800AA";
        imageView3.boarderWidth = 1;
        imageView3.shadowBlur = 10;
        _this.addSubview(imageView3);

        var button = new _Button2.default();
        button.size = new _Geometry.Size(44, 44);
        button.position = new _Geometry.Point(200, 300);
        button.setBackgroundColor("blue", _Button.ControlState.Normal);
        button.setBackgroundColor("red", _Button.ControlState.Highlighted);
        button.setTitle("按钮", _Button.ControlState.Normal);
        _this.addSubview(button);
        button.target = self;
        button.func = function () {
            var animation = new _Animator.AnimatAction(imageView2, "position", new _Geometry.Point(imageView2.x + 330, 200), 3);
            var animation1 = new _Animator.AnimatAction(imageView3, "position", new _Geometry.Point(imageView3.x + 330, 300), 3);
            var queue = new _Animator.SerialAnimationQueue([animation, animation1]);
            queue.start();
            // const animation2 = new AnimatAction(imageView, "alpha", 0, 5)
            // animation2.start()

            //imageView2.position = new Point(imageView2.x - 4, 200)
        };
        return _this;
    }

    return RootView;
}(_View3.default);

exports.default = RootView;

},{"../view/Animator":6,"../view/Button":9,"../view/Geometry":13,"../view/ImageView":14,"../view/Label":15,"../view/ScrollView":16,"../view/View":18}],3:[function(require,module,exports){
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

Array.prototype.reverseArray = function () {
    var array = this.slice();
    return array.reverse();
};

Array.prototype.swap = function (index1, index2) {
    var array = this.slice();
    var obj = this[index1];
    this[index1] = this[index2];
    this[index2] = obj;
    return array;
};

Array.prototype.swap = function (index1, index2) {
    var array = this.slice();
    var obj = this[index1];
    this[index1] = this[index2];
    this[index2] = obj;
    return array;
};

},{}],4:[function(require,module,exports){
/*
 * Tween.js
 * t: current time（当前时间）；
 * b: beginning value（初始值）；
 * c: change in value（变化量）；
 * d: duration（持续时间）。
 * you can visit 'http://easings.net/zh-cn' to get effect
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Tween = exports.Tween = {
    Linear: function Linear(t, b, c, d) {
        return c * t / d + b;
    },
    Quad: {
        easeIn: function easeIn(t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeInOut: function easeInOut(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * (--t * (t - 2) - 1) + b;
        }
    },
    Cubic: {
        easeIn: function easeIn(t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOut: function easeInOut(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        }
    },
    Quart: {
        easeIn: function easeIn(t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        easeInOut: function easeInOut(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        }
    },
    Quint: {
        easeIn: function easeIn(t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        easeInOut: function easeInOut(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        }
    },
    Sine: {
        easeIn: function easeIn(t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        easeInOut: function easeInOut(t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        }
    },
    Expo: {
        easeIn: function easeIn(t, b, c, d) {
            return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        easeInOut: function easeInOut(t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {
        easeIn: function easeIn(t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOut: function easeInOut(t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    },
    Elastic: {
        easeIn: function easeIn(t, b, c, d, a, p) {
            var s;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (typeof p == "undefined") p = d * .3;
            if (!a || a < Math.abs(c)) {
                s = p / 4;
                a = c;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOut: function easeOut(t, b, c, d, a, p) {
            var s;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (typeof p == "undefined") p = d * .3;
            if (!a || a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        },
        easeInOut: function easeInOut(t, b, c, d, a, p) {
            var s;
            if (t == 0) return b;
            if ((t /= d / 2) == 2) return b + c;
            if (typeof p == "undefined") p = d * (.3 * 1.5);
            if (!a || a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        }
    },
    Back: {
        easeIn: function easeIn(t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOut: function easeOut(t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOut: function easeInOut(t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
        }
    },
    Bounce: {
        easeIn: function easeIn(t, b, c, d) {
            return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            if ((t /= d) < 1 / 2.75) {
                return c * (7.5625 * t * t) + b;
            } else if (t < 2 / 2.75) {
                return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
            } else if (t < 2.5 / 2.75) {
                return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
            }
        },
        easeInOut: function easeInOut(t, b, c, d) {
            if (t < d / 2) {
                return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
            } else {
                return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        }
    }
};
//Math.tween = Tween;

},{}],5:[function(require,module,exports){

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

},{}],6:[function(require,module,exports){
'use strict';
"use stirct";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AnimatAction = exports.AnimationCurve = exports.SerialAnimationQueue = exports.ConcurrentAnimationQueue = exports.AnimatElement = exports.AnimationModel = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Drawloop = require('./Drawloop');

var _Util = require('../util/Util');

var _Tween = require('../util/Tween');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AnimationModel = exports.AnimationModel = false;

var AnimatElement = exports.AnimatElement = function () {
    function AnimatElement(view, key, to) {
        var from = arguments.length <= 3 || arguments[3] === undefined ? view[key] : arguments[3];

        _classCallCheck(this, AnimatElement);

        this.view = view;
        this.key = key;
        this.to = to;
        this.from = from;
        this._progress = 0;
    }

    _createClass(AnimatElement, [{
        key: 'progress',
        get: function get() {
            return this._progress;
        },
        set: function set(newValue) {
            this._progress = newValue;
            if (this.view && this.key) {
                if (newValue == 1) {
                    this.view[this.key] = this.to;
                } else {
                    this.view[this.key] = this.from.add(this.to.minus(this.from).multiply(newValue));
                }
            }
        }
    }]);

    return AnimatElement;
}();

var AnimationBase = function () {
    function AnimationBase() {
        _classCallCheck(this, AnimationBase);

        this.willStartFunc = _Util.nil;
        this.didFinishFuncs = _Util.nil;
        this._willStartFunc = _Util.nil;
        this._didFinishFunc = _Util.nil;
        this.isPaused = true;
    }

    _createClass(AnimationBase, [{
        key: 'start',
        value: function start() {
            this.isPaused = false;
            if (this.willStartFunc) {
                this.willStartFunc(this);
            }
            if (this._willStartFunc) {
                this._willStartFunc(this);
            }
        }
    }, {
        key: 'didFinish',
        value: function didFinish(complete) {
            this.isPaused = true;
            if (this._didFinishFunc) {
                this._didFinishFunc(this, complete);
            }
            if (this.didFinishFunc) {
                this.didFinishFunc(this, complete);
            }
        }
    }, {
        key: 'toEnd',
        value: function toEnd() {
            this.didFinish(true);
        }
    }]);

    return AnimationBase;
}();

var ConcurrentAnimationQueue = exports.ConcurrentAnimationQueue = function (_AnimationBase) {
    _inherits(ConcurrentAnimationQueue, _AnimationBase);

    function ConcurrentAnimationQueue(animations) {
        _classCallCheck(this, ConcurrentAnimationQueue);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ConcurrentAnimationQueue).call(this));

        _this.animations = animations.slice();
        var runningNumber = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = _this.animations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var animation = _step.value;

                animation._willStartFunc = function () {
                    runningNumber += 1;
                };
                animation._didFinishFunc = function () {
                    runningNumber -= 1;
                    if (runningNumber == 0) {
                        _this.didFinish(true);
                    }
                };
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

        return _this;
    }

    _createClass(ConcurrentAnimationQueue, [{
        key: 'toEnd',
        value: function toEnd() {
            _get(Object.getPrototypeOf(ConcurrentAnimationQueue.prototype), 'toEnd', this).call(this);
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.animations[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var animation = _step2.value;

                    animation.toEnd();
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
        key: 'start',
        value: function start() {
            if (!this.isPaused) {
                return;
            }
            _get(Object.getPrototypeOf(ConcurrentAnimationQueue.prototype), 'start', this).call(this);
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.animations[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var animation = _step3.value;

                    animation.start();
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
        }
    }]);

    return ConcurrentAnimationQueue;
}(AnimationBase);

var SerialAnimationQueue = exports.SerialAnimationQueue = function (_AnimationBase2) {
    _inherits(SerialAnimationQueue, _AnimationBase2);

    function SerialAnimationQueue(animations) {
        _classCallCheck(this, SerialAnimationQueue);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(SerialAnimationQueue).call(this));

        _this2.animations = animations;
        _this2.runningNumber = 0;
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = _this2.animations[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var animation = _step4.value;

                animation._didFinishFunc = function () {
                    _this2.runningNumber += 1;
                    if (_this2.runningNumber == _this2.animations.count) {
                        _this2.didFinish(true);
                    } else {
                        _this2.nextAnimation();
                    }
                };
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

        _this2.nextAnimation();
        return _this2;
    }

    _createClass(SerialAnimationQueue, [{
        key: 'nextAnimation',
        value: function nextAnimation() {
            if (this.runningNumber >= this.animations.length) {
                return;
            }
            var animation = this.animations[this.runningNumber];
            animation.start();
        }
    }, {
        key: 'toEnd',
        value: function toEnd() {
            this.runningNumber = this.animations.length;
            _get(Object.getPrototypeOf(SerialAnimationQueue.prototype), 'toEnd', this).call(this);
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = this.animations[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var animation = _step5.value;

                    animation.toEnd();
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }
        }
    }]);

    return SerialAnimationQueue;
}(AnimationBase);

var AnimationCurve = exports.AnimationCurve = {
    Linear: 0,
    CurveEaseIn: 1,
    CurveEaseOut: 2,
    CurveEaseInOut: 3
};

var AnimatAction = exports.AnimatAction = function (_AnimationBase3) {
    _inherits(AnimatAction, _AnimationBase3);

    function AnimatAction(view, key, to, duration) {
        var curve = arguments.length <= 4 || arguments[4] === undefined ? AnimationCurve.Linear : arguments[4];

        _classCallCheck(this, AnimatAction);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(AnimatAction).call(this));

        var lastActor = view.animations[key];
        if (lastActor) {
            lastActor.pause();
        }
        view.animations[key] = _this3;
        _this3.element = new AnimatElement(view, key, to);
        _this3.duration = duration;
        _this3.frameNum = duration * 60;
        _this3.currentFrame = 0;
        var frames = _this3.frameNum;
        switch (curve) {
            case AnimationCurve.CurveEaseIn:
                _this3.timeFunc = function (x) {
                    return _Tween.Tween.Linear(x, 0, 1, frames);
                };
                break;
            case AnimationCurve.CurveEaseOut:
                _this3.timeFunc = function (x) {
                    return _Tween.Tween.Quad.easeIn(x, 0, 1, frames);
                };
                break;
            case AnimationCurve.CurveEaseInOut:
                _this3.timeFunc = function (x) {
                    return _Tween.Tween.Quad.easeOut(x, 0, 1, frames);
                };
                break;
            default:
                _this3.timeFunc = function (x) {
                    return _Tween.Tween.Quad.easeInOut(x, 0, 1, frames);
                };
                break;
        }
        return _this3;
    }

    _createClass(AnimatAction, [{
        key: 'start',
        value: function start() {
            if (!this.isPaused) {
                return;
            }
            this.currentFrame = 0;
            _get(Object.getPrototypeOf(AnimatAction.prototype), 'start', this).call(this);
            this.step();
        }
    }, {
        key: 'pause',
        value: function pause() {
            this.isPaused = true;
            this.didFinish(false);
        }
    }, {
        key: 'cancel',
        value: function cancel() {
            this.isPaused = true;
            _get(Object.getPrototypeOf(AnimatAction.prototype), 'didFinish', this).call(this, false);
        }
    }, {
        key: 'immediatelyToEnd',
        value: function immediatelyToEnd() {
            this.isPaused = true;
            var key = "_" + this.element.key;
            this.element.view[key] = this.element.to;
            _get(Object.getPrototypeOf(AnimatAction.prototype), 'didFinish', this).call(this, false);
        }
    }, {
        key: 'resume',
        value: function resume() {
            if (!this.isPaused) {
                return;
            }
            this.isPaused = false;
            this.step();
        }
    }, {
        key: 'toEnd',
        value: function toEnd() {
            this.isPaused = false;
            this.currentFrame = this.frameNum - 1;
            _get(Object.getPrototypeOf(AnimatAction.prototype), 'toEnd', this).call(this);
        }
    }, {
        key: 'didFinish',
        value: function didFinish(complete) {
            if (!complete) {
                this.element.view[this.element.key] = this.element.to.multiply(this.progress);
            } else {
                this.element.view[this.element.key] = this.element.to;
            }
            _get(Object.getPrototypeOf(AnimatAction.prototype), 'didFinish', this).call(this, complete);
        }
    }, {
        key: 'step',
        value: function step() {
            var _this4 = this;

            if (this.isPaused) {
                return;
            }
            this.currentFrame += 1;
            if (this.currentFrame < this.frameNum - 1) {
                requestAnimationFrame(function (timestamp) {
                    if (_this4.isPaused) {
                        return;
                    }
                    exports.AnimationModel = AnimationModel = true;
                    _this4.element.progress = _this4.progress;
                    _Drawloop.drawloop.forceRender();
                    exports.AnimationModel = AnimationModel = false;
                    _this4.step();
                });
            } else {
                requestAnimationFrame(function (timestamp) {
                    if (_this4.isPaused) {
                        return;
                    }
                    exports.AnimationModel = AnimationModel = true;
                    _this4.element.progress = 1;
                    _Drawloop.drawloop.forceRender();
                    exports.AnimationModel = AnimationModel = false;
                    _this4.didFinish(true);
                });
            }
        }
    }, {
        key: 'progress',
        get: function get() {
            return this.timeFunc(this.currentFrame);
        }
    }]);

    return AnimatAction;
}(AnimationBase);

},{"../util/Tween":4,"../util/Util":5,"./Drawloop":11}],7:[function(require,module,exports){
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
            return this.constructor.name;
        }
    }]);

    return BaseObject;
}();

exports.default = BaseObject;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseObject = require('./BaseObject');

var _BaseObject2 = _interopRequireDefault(_BaseObject);

var _Util = require('../util/Util.js');

var _Drawloop = require('./Drawloop');

var _Geometry = require('./Geometry');

var _CGContext = require('./CGContext');

var _CGContext2 = _interopRequireDefault(_CGContext);

var _Animator = require('./Animator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BezierPath = function () {
    function BezierPath(view) {
        _classCallCheck(this, BezierPath);

        this.path = new Path2D();
        this.view = view;
    }

    _createClass(BezierPath, [{
        key: 'convertPoint',
        value: function convertPoint(point) {
            var offset = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

            var position = this.view.convertPointToView(point, this.view.window, offset);
            return [position.x, position.y];
        }
    }, {
        key: 'addPath',
        value: function addPath(path2d) {
            this.path.addPath(path2d);
        }
    }, {
        key: 'closePath',
        value: function closePath() {
            this.path.closePath();
        }
    }, {
        key: 'moveTo',
        value: function moveTo(px, py) {
            var _convertPoint = this.convertPoint(new _Geometry.Point(px, py));

            var _convertPoint2 = _slicedToArray(_convertPoint, 2);

            var x = _convertPoint2[0];
            var y = _convertPoint2[1];

            this.path.moveTo(x, y);
        }
    }, {
        key: 'lineTo',
        value: function lineTo(px, py) {
            var _convertPoint3 = this.convertPoint(new _Geometry.Point(px, py));

            var _convertPoint4 = _slicedToArray(_convertPoint3, 2);

            var x = _convertPoint4[0];
            var y = _convertPoint4[1];

            this.path.lineTo(x, y);
        }
    }, {
        key: 'bezierCurveTo',
        value: function bezierCurveTo(cp1x, cp1y, cp2x, cp2y, px, py) {
            var _convertPoint5 = this.convertPoint(new _Geometry.Point(cp1x, cp1y));

            var _convertPoint6 = _slicedToArray(_convertPoint5, 2);

            var c1x = _convertPoint6[0];
            var c1y = _convertPoint6[1];

            var _convertPoint7 = this.convertPoint(new _Geometry.Point(cp2x, cp2y));

            var _convertPoint8 = _slicedToArray(_convertPoint7, 2);

            var c2x = _convertPoint8[0];
            var c2y = _convertPoint8[1];

            var _convertPoint9 = this.convertPoint(new _Geometry.Point(px, py));

            var _convertPoint10 = _slicedToArray(_convertPoint9, 2);

            var x = _convertPoint10[0];
            var y = _convertPoint10[1];

            this.path.bezierCurveTo(c1x, c1y, c2x, c2y, x, y);
        }
    }, {
        key: 'quadraticCurveTo',
        value: function quadraticCurveTo(cp1x, cp1y, px, py) {
            var _convertPoint11 = this.convertPoint(new _Geometry.Point(cp1x, cp1y));

            var _convertPoint12 = _slicedToArray(_convertPoint11, 2);

            var c1x = _convertPoint12[0];
            var c1y = _convertPoint12[1];

            var _convertPoint13 = this.convertPoint(new _Geometry.Point(px, py));

            var _convertPoint14 = _slicedToArray(_convertPoint13, 2);

            var x = _convertPoint14[0];
            var y = _convertPoint14[1];

            this.path.quadraticCurveTo(c1x, c1y, x, y);
        }
    }, {
        key: 'arc',
        value: function arc(px, py, radius, startAngle, endAngle, anticlockwise) {
            var _convertPoint15 = this.convertPoint(new _Geometry.Point(px, py));

            var _convertPoint16 = _slicedToArray(_convertPoint15, 2);

            var x = _convertPoint16[0];
            var y = _convertPoint16[1];

            this.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        }
    }, {
        key: 'arcTo',
        value: function arcTo(px1, py1, px2, py2, radius) {
            var _convertPoint17 = this.convertPoint(new _Geometry.Point(px1, py1));

            var _convertPoint18 = _slicedToArray(_convertPoint17, 2);

            var x1 = _convertPoint18[0];
            var y1 = _convertPoint18[1];

            var _convertPoint19 = this.convertPoint(new _Geometry.Point(px2, py2));

            var _convertPoint20 = _slicedToArray(_convertPoint19, 2);

            var x2 = _convertPoint20[0];
            var y2 = _convertPoint20[1];

            this.path.quadraticCurveTo(x1, y1, x2, y2, radius);
        }
    }, {
        key: 'ellipse',
        value: function ellipse(px, py, radiuspx, radiuspy, rotation, startAngle, endAngle, anticlockwise) {
            var _convertPoint21 = this.convertPoint(new _Geometry.Point(px1, py1));

            var _convertPoint22 = _slicedToArray(_convertPoint21, 2);

            var x1 = _convertPoint22[0];
            var y1 = _convertPoint22[1];

            var _convertPoint23 = this.convertPoint(new _Geometry.Point(radiuspx, radiuspy));

            var _convertPoint24 = _slicedToArray(_convertPoint23, 2);

            var x2 = _convertPoint24[0];
            var y2 = _convertPoint24[1];

            this.path.ellipse(x1, y1, x2, y2, rotation, startAngle, endAngle, anticlockwise);
        }
    }, {
        key: 'rect',
        value: function rect(px, py, width, height) {
            var _convertPoint25 = this.convertPoint(new _Geometry.Point(px, py));

            var _convertPoint26 = _slicedToArray(_convertPoint25, 2);

            var x = _convertPoint26[0];
            var y = _convertPoint26[1];

            this.path.rect(x, y, width, height);
        }
    }]);

    return BezierPath;
}();

exports.default = BezierPath;

},{"../util/Util.js":5,"./Animator":6,"./BaseObject":7,"./CGContext":10,"./Drawloop":11,"./Geometry":13}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ControlState = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Util = require('../util/Util');

var _Geometry = require('./Geometry');

var _Font = require('./Font');

var _Font2 = _interopRequireDefault(_Font);

var _Label = require('./Label');

var _Label2 = _interopRequireDefault(_Label);

var _ImageView = require('./ImageView');

var _ImageView2 = _interopRequireDefault(_ImageView);

var _View2 = require('./View');

var _View3 = _interopRequireDefault(_View2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ControlState = exports.ControlState = {
    Normal: 0,
    Highlighted: 1,
    Disabled: 1 << 1,
    Selected: 1 << 2
};

var Button = function (_View) {
    _inherits(Button, _View);

    function Button(target, func) {
        _classCallCheck(this, Button);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Button).call(this));

        _this._controlState = ControlState.Normal;
        _this.backgroundImageView = new _ImageView2.default();
        _this.addSubview(_this.backgroundImageView);
        _this.imageView = new _ImageView2.default();
        _this.addSubview(_this.imageView);
        _this.titleLabel = new _Label2.default();
        _this.titleLabel.clipToBounds = true;
        _this.titleLabel.textAlignment = _Label.TextAlignment.Center;
        _this.titleLabel.verticalAlignment = _Label.VerticalAlignment.Center;
        _this.titleLabel.size = _this.size.copy();
        _this.addSubview(_this.titleLabel);

        _this.func = func;
        _this.target = target;
        _this.images = {};
        _this.backgroundImages = {};
        _this.backgroundColors = {};
        _this.titleColors = {};
        _this.titleColors[ControlState.Normal] = "black";
        _this.titles = {};
        _this._enable = false;
        return _this;
    }

    _createClass(Button, [{
        key: 'setBackgroundColor',
        value: function setBackgroundColor(color, controlState) {
            this.backgroundColors[controlState] = color;
            if (controlState == this.controlState) {
                this.backgroundColor = color;
            }
        }
    }, {
        key: 'setBackgroundImage',
        value: function setBackgroundImage(image, controlState) {
            this.backgroundImages[controlState] = image;
            if (controlState == this.controlState) {
                this.backgroundImageView.image = image;
            }
        }
    }, {
        key: 'setImage',
        value: function setImage(image, controlState) {
            this.images[controlState] = image;
            if (controlState == this.controlState) {
                this.imageView.image = image;
            }
        }
    }, {
        key: 'setTitleColor',
        value: function setTitleColor(color, controlState) {
            this.titleColors[controlState] = color;
            if (controlState == this.controlState) {
                this.titleLabel.textColor = color;
            }
        }
    }, {
        key: 'setTitle',
        value: function setTitle(title, controlState) {
            this.titles[controlState] = title;
            if (controlState == this.controlState) {
                this.titleLabel.text = title;
            }
        }
    }, {
        key: 'layoutSubviews',
        value: function layoutSubviews() {
            _get(Object.getPrototypeOf(Button.prototype), 'layoutSubviews', this).call(this);
            this.titleLabel.size = this.size.copy();
        }
    }, {
        key: 'mouseDown',
        value: function mouseDown(event) {
            this.controlState = ControlState.Highlighted;
            //console.log(`I'm down ${this.toString()}`)
        }
    }, {
        key: 'mouseMove',
        value: function mouseMove(event) {
            //console.log(`I'm move ${this.toString()}`)
        }
    }, {
        key: 'mouseUp',
        value: function mouseUp(event) {
            this.controlState = ControlState.Normal;
            //console.log(`I'm up ${this.toString()}`)
            if (this.func && this.target) {
                this.func.apply(this.target, this);
            }
        }
    }, {
        key: 'mouseCancel',
        value: function mouseCancel(event) {
            this.controlState = ControlState.Normal;
            //console.log(`I'm cancel ${this.toString()}`)
        }
    }, {
        key: 'controlState',
        get: function get() {
            return this._controlState;
        },
        set: function set(newValue) {
            if (this._controlState != newValue) {
                this._controlState = newValue;
                this.backgroundImageView.image = this.backgroundImages[newValue] || this.backgroundImages[ControlState.Normal];
                this.titleLabel.text = this.titles[newValue] || this.titles[ControlState.Normal] || "";
                this.imageView.image = this.images[newValue] || this.images[ControlState.Normal];
                this.backgroundColor = this.backgroundColors[newValue] || this.backgroundColors[ControlState.Normal];

                this._checkAndSetNeedsRender();
            }
        }
    }, {
        key: 'enable',
        get: function get() {
            return this._controlState;
        },
        set: function set(newValue) {
            if (this._enable != newValue) {
                this._enable = newValue;
                if (!newValue) {
                    this.controlState = ControlState.Disabled;
                } else if (this.controlState === ControlState.Disabled) {
                    this.controlState = ControlState.Normal;
                }
            }
        }
    }]);

    return Button;
}(_View3.default);

exports.default = Button;

},{"../util/Util":5,"./Font":12,"./Geometry":13,"./ImageView":14,"./Label":15,"./View":18}],10:[function(require,module,exports){
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
        this.textBaseline = "top";
        this.textAlign = "left";
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
            var offset = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

            var position = this.view.convertPointToView(point, this.view.window, offset);
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
        key: 'strokeRect',
        value: function strokeRect(px, py, width, height) {
            var _convertPoint3 = this.convertPoint(new _Geometry.Point(px, py));

            var _convertPoint4 = _slicedToArray(_convertPoint3, 2);

            var x = _convertPoint4[0];
            var y = _convertPoint4[1];

            this.context.strokeRect(x, y, width, height);
        }
    }, {
        key: 'stroke',
        value: function stroke() {
            this.context.stroke();
        }
    }, {
        key: 'drawImage',
        value: function drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
            var context = this.context;
            if (image.complete) {
                var _convertPoint5 = this.convertPoint(new _Geometry.Point(dx, dy));

                var _convertPoint6 = _slicedToArray(_convertPoint5, 2);

                var x = _convertPoint6[0];
                var y = _convertPoint6[1];

                context.drawImage(image, sx, sy, sWidth, sHeight, x, y, dWidth, dHeight);
            } else {
                // image not load
            }
        }
    }, {
        key: 'clip',
        value: function clip(rect) {
            var offset = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

            var _convertPoint7 = this.convertPoint(rect.position, offset);

            var _convertPoint8 = _slicedToArray(_convertPoint7, 2);

            var x = _convertPoint8[0];
            var y = _convertPoint8[1];

            this.context.rect(x, y, rect.size.width, rect.size.height);
            this.context.clip("nonzero");
        }

        // draw text

    }, {
        key: 'wrapText',
        value: function wrapText(text, px, py, maxWidth) {
            var lineHeight = arguments.length <= 4 || arguments[4] === undefined ? 26 : arguments[4];

            this.context.textBaseline = "top";

            var _convertPoint9 = this.convertPoint(new _Geometry.Point(px, py));

            var _convertPoint10 = _slicedToArray(_convertPoint9, 2);

            var x = _convertPoint10[0];
            var y = _convertPoint10[1];


            var words = text.split('');
            var line = '';
            for (var n = 0; n < words.length; n++) {
                var testLine = line + words[n] + '';
                var testWidth = this.measureText(testLine);
                if (testWidth > maxWidth && n > 0) {
                    this.context.fillText(line, x, y);
                    line = words[n] + '';
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            }
            this.context.fillText(line, x, y);
            var width = y == 0 ? this.measureText(text) : maxWidth;
            return new _Geometry.Size(width, y);
        }
    }, {
        key: 'fillText',
        value: function fillText(text, px, py) {
            var maxWidth = arguments.length <= 3 || arguments[3] === undefined ? 9999 : arguments[3];

            var _convertPoint11 = this.convertPoint(new _Geometry.Point(px, py));

            var _convertPoint12 = _slicedToArray(_convertPoint11, 2);

            var x = _convertPoint12[0];
            var y = _convertPoint12[1];
            //this.context.textBaseline = this.textBaseline

            this.context.fillText(text, x, y, maxWidth);
        }
    }, {
        key: 'measureText',
        value: function measureText(text) {
            return this.context.measureText(text).width;
        }
    }, {
        key: 'measureMultiLineText',
        value: function measureMultiLineText(text, maxWidth, lineHeight) {
            var x = 0,
                y = 0;

            var words = text.split('');
            var line = '';
            for (var n = 0; n < words.length; n++) {
                var testLine = line + words[n] + '';
                var testWidth = this.measureText(testLine);
                if (testWidth > maxWidth && n > 0) {
                    line = words[n] + '';
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            }
            var width = y == 0 ? this.measureText(text) : maxWidth;
            return new _Geometry.Size(width, y + lineHeight);
        }

        // draw path

    }, {
        key: 'beginPath',
        value: function beginPath() {
            this.context.beginPath();
        }
    }, {
        key: 'closePath',
        value: function closePath() {
            this.context.closePath();
        }
    }, {
        key: 'moveTo',
        value: function moveTo(px, py) {
            var _convertPoint13 = this.convertPoint(new _Geometry.Point(px, py));

            var _convertPoint14 = _slicedToArray(_convertPoint13, 2);

            var x = _convertPoint14[0];
            var y = _convertPoint14[1];

            this.context.moveTo(x, y);
        }
    }, {
        key: 'lineTo',
        value: function lineTo(px, py) {
            var _convertPoint15 = this.convertPoint(new _Geometry.Point(px, py));

            var _convertPoint16 = _slicedToArray(_convertPoint15, 2);

            var x = _convertPoint16[0];
            var y = _convertPoint16[1];

            this.context.lineTo(x, y);
        }
    }, {
        key: 'bezierCurveTo',
        value: function bezierCurveTo(cp1x, cp1y, cp2x, cp2y, px, py) {
            var _convertPoint17 = this.convertPoint(new _Geometry.Point(cp1x, cp1y));

            var _convertPoint18 = _slicedToArray(_convertPoint17, 2);

            var c1x = _convertPoint18[0];
            var c1y = _convertPoint18[1];

            var _convertPoint19 = this.convertPoint(new _Geometry.Point(cp2x, cp2y));

            var _convertPoint20 = _slicedToArray(_convertPoint19, 2);

            var c2x = _convertPoint20[0];
            var c2y = _convertPoint20[1];

            var _convertPoint21 = this.convertPoint(new _Geometry.Point(px, py));

            var _convertPoint22 = _slicedToArray(_convertPoint21, 2);

            var x = _convertPoint22[0];
            var y = _convertPoint22[1];

            this.context.bezierCurveTo(c1x, c1y, c2x, c2y, x, y);
        }
    }, {
        key: 'quadraticCurveTo',
        value: function quadraticCurveTo(cp1x, cp1y, px, py) {
            var _convertPoint23 = this.convertPoint(new _Geometry.Point(cp1x, cp1y));

            var _convertPoint24 = _slicedToArray(_convertPoint23, 2);

            var c1x = _convertPoint24[0];
            var c1y = _convertPoint24[1];

            var _convertPoint25 = this.convertPoint(new _Geometry.Point(px, py));

            var _convertPoint26 = _slicedToArray(_convertPoint25, 2);

            var x = _convertPoint26[0];
            var y = _convertPoint26[1];

            this.context.quadraticCurveTo(c1x, c1y, x, y);
        }
    }, {
        key: 'arc',
        value: function arc(px, py, radius, startAngle, endAngle, anticlockwise) {
            var _convertPoint27 = this.convertPoint(new _Geometry.Point(px, py));

            var _convertPoint28 = _slicedToArray(_convertPoint27, 2);

            var x = _convertPoint28[0];
            var y = _convertPoint28[1];

            this.context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        }
    }, {
        key: 'arcTo',
        value: function arcTo(px1, py1, px2, py2, radius) {
            var _convertPoint29 = this.convertPoint(new _Geometry.Point(px1, py1));

            var _convertPoint30 = _slicedToArray(_convertPoint29, 2);

            var x1 = _convertPoint30[0];
            var y1 = _convertPoint30[1];

            var _convertPoint31 = this.convertPoint(new _Geometry.Point(px2, py2));

            var _convertPoint32 = _slicedToArray(_convertPoint31, 2);

            var x2 = _convertPoint32[0];
            var y2 = _convertPoint32[1];

            this.context.quadraticCurveTo(x1, y1, x2, y2, radius);
        }
    }, {
        key: 'radiusRect',
        value: function radiusRect(px, py, width, height, radius) {
            this.beginPath();
            this.moveTo(px, py);
            this.arc(px + radius, py + radius, radius, Math.PI, Math.PI * 1.5, false);
            this.lineTo(px + width - radius, py);
            this.arc(px + width - radius, py + radius, radius, Math.PI * 1.5, Math.PI * 2, false);
            this.lineTo(px + width, py + height - radius);
            this.arc(px + width - radius, py + height - radius, radius, 0, Math.PI * 0.5, false);
            this.lineTo(px + radius, py + height);
            this.arc(px + radius, py + height - radius, radius, Math.PI * 0.5, Math.PI, false);
            this.closePath();
        }

        // experiment

    }, {
        key: 'ellipse',
        value: function ellipse(px, py, radiuspx, radiuspy, rotation, startAngle, endAngle, anticlockwise) {
            var _convertPoint33 = this.convertPoint(new _Geometry.Point(px1, py1));

            var _convertPoint34 = _slicedToArray(_convertPoint33, 2);

            var x1 = _convertPoint34[0];
            var y1 = _convertPoint34[1];

            var _convertPoint35 = this.convertPoint(new _Geometry.Point(radiuspx, radiuspy));

            var _convertPoint36 = _slicedToArray(_convertPoint35, 2);

            var x2 = _convertPoint36[0];
            var y2 = _convertPoint36[1];

            this.context.ellipse(x1, y1, x2, y2, rotation, startAngle, endAngle, anticlockwise);
        }
    }, {
        key: 'rect',
        value: function rect(px, py, width, height) {
            var _convertPoint37 = this.convertPoint(new _Geometry.Point(px, py));

            var _convertPoint38 = _slicedToArray(_convertPoint37, 2);

            var x = _convertPoint38[0];
            var y = _convertPoint38[1];

            this.context.rect(x, y, width, height);
        }
    }, {
        key: 'fill',
        value: function fill() {
            this.context.fill();
        }
    }, {
        key: 'stroke',
        value: function stroke() {
            this.context.stroke();
        }

        // image context

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
        key: 'textAlign',
        get: function get() {
            return this.context.textAlign;
        },
        set: function set(newValue) {
            this.context.textAlign = newValue;
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
    }, {
        key: 'lineWidth',
        get: function get() {
            return this.context.lineWidth;
        },
        set: function set(newValue) {
            this.context.lineWidth = newValue;
        }
    }, {
        key: 'strokeStyle',
        get: function get() {
            return this.context.strokeStyle;
        },
        set: function set(newValue) {
            this.context.strokeStyle = newValue;
        }
    }, {
        key: 'shadowColor',
        get: function get() {
            return this.context.shadowColor;
        },
        set: function set(newValue) {
            this.context.shadowColor = newValue;
        }
    }, {
        key: 'shadowBlur',
        get: function get() {
            return this.context.shadowBlur;
        },
        set: function set(newValue) {
            this.context.shadowBlur = newValue;
        }
    }, {
        key: 'shadowOffset',
        get: function get() {
            return new _Geometry.Point(this.context.shadowOffsetX, this.context.shadowOffsetY);
        },
        set: function set(newValue) {
            this.context.shadowOffsetX = newValue.x;
            this.context.shadowOffsetY = newValue.y;
        }
    }], [{
        key: 'createImage',
        value: function createImage(width, height, drawFunc) {
            var canvas = document.createElement(uuid.v1());
            var canvasWidth = w * scale;
            var canvasHeight = h * scale;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            canvas.style.width = w + "px";
            canvas.style.height = h + "px";
            var ctx = canvas.getContext("2d");
            drawFunc(ctx, width, height);
            // ctx.fillStyle = "red";
            // ctx.fillRect(0, 0, 100, 100);

            var img = document.createElement("img");
            img.src = canvas.toDataURL("image/png");
            return img;
        }
    }]);

    return CGContext;
}();

exports.default = CGContext;

},{"../util/Util.js":5,"./Geometry":13}],11:[function(require,module,exports){
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
        this.trackRender = true;
    }

    _createClass(Drawloop, [{
        key: "render",
        value: function render() {
            if (this.keyWindow) {
                this.keyWindow._render();
            }
        }
    }, {
        key: "needsForRender",
        value: function needsForRender() {
            var _this = this;

            if (this.trackRender && this.needsRender === false) {
                this.needsRender = true;
                setTimeout(function () {
                    _this.render();
                    _this.needsRender = false;
                }, 1);
            }
        }
    }, {
        key: "performWithoutRender",
        value: function performWithoutRender(func) {
            this.trackRender = false;
            func();
            this.trackRender = true;
        }
    }, {
        key: "forceRender",
        value: function forceRender() {
            this.render();
            this.needsRender = false;
        }
    }]);

    return Drawloop;
}();

var drawloop = exports.drawloop = new Drawloop();

},{"../util/Util.js":5}],12:[function(require,module,exports){
"use strict";

/*
this.fontStyle = "italic";
this.fontWeight = "bold";
this.fontSize = "24px";
this.fontFamily = "Verdana";
*/

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Font = function () {
    function Font() {
        _classCallCheck(this, Font);

        this.fontStyle = "";
        this.fontWeight = "";
        this.fontSize = "18px";
        this.fontFamily = "Helvetica";
        var b = " ";
    }

    _createClass(Font, [{
        key: "getFontText",
        value: function getFontText() {
            return this.fontStyle + " " + this.fontWeight + " " + this.fontSize + " " + this.fontFamily;
        }
    }, {
        key: "copy",
        value: function copy() {
            var font = new Font();
            font.fontStyle = this.fontStyle;
            font.fontWeight = this.fontWeight;
            font.fontSize = this.fontSize;
            font.fontFamily = this.fontFamily;
            return font;
        }
    }]);

    return Font;
}();

exports.default = Font;

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.isPointIn = isPointIn;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Number.prototype.multiply = function (value) {
    return this * value;
};
Number.prototype.add = function (value) {
    return this + value;
};
Number.prototype.minus = function (value) {
    return this - value;
};
// if (typeof testObj.callableFunction == 'function') {
//     testObj.callableFunction();
// }

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
    }, {
        key: "multiply",
        value: function multiply(value) {
            return new Point(this.x.multiply(value), this.y.multiply(value));
        }
    }, {
        key: "add",
        value: function add(point) {
            return new Point(this.x.add(point.x), this.y.add(point.y));
        }
    }, {
        key: "minus",
        value: function minus(point) {
            return new Point(this.x.minus(point.x), this.y.minus(point.y));
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
    }, {
        key: "multiply",
        value: function multiply(value) {
            return new Point(this.width.multiply(value), this.height.multiply(value));
        }
    }, {
        key: "add",
        value: function add(value) {
            return new Point(this.width.add(value.width), this.height.add(value.height));
        }
    }, {
        key: "minus",
        value: function minus(value) {
            return new Point(this.width.minus(value.width), this.height.minus(value.height));
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

var Frame = exports.Frame = function () {
    function Frame() {
        var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var width = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
        var height = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

        _classCallCheck(this, Frame);

        this.origin = new Point(x, y);
        this.size = new Size(width, height);
    }

    _createClass(Frame, [{
        key: "valueOf",
        value: function valueOf() {
            return JSON.stringify(this);
        }
    }, {
        key: "round",
        value: function round() {
            return new Frame(Math.round(this.origin.x), Math.round(this.origin.y), Math.round(this.size.width), Math.round(this.size.height));
        }
    }, {
        key: "copy",
        value: function copy() {
            return new Frame(this.origin.x, this.origin.y, this.size.width, this.size.height);
        }
    }]);

    return Frame;
}();

function isPointIn(point, position, size) {
    var xIn = point.x >= position.x && point.x <= position.x + size.width;
    var yIn = point.y >= position.y && point.y <= position.y + size.height;
    return xIn && yIn;
}

var ViewAutoresizing = exports.ViewAutoresizing = {
    None: 0,
    FlexibleLeftMargin: 1 << 0,
    FlexibleWidth: 1 << 1,
    FlexibleRightMargin: 1 << 2,
    FlexibleTopMargin: 1 << 3,
    FlexibleHeight: 1 << 4,
    FlexibleBottomMargin: 1 << 5
};

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EqualRatio = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _View2 = require('./View');

var _View3 = _interopRequireDefault(_View2);

var _Geometry = require('./Geometry');

var _CGContext = require('./CGContext');

var _CGContext2 = _interopRequireDefault(_CGContext);

var _Util = require('../util/Util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EqualRatio = exports.EqualRatio = {
    None: 0,
    FlexibleHeight: 1,
    FlexibleWidth: 2
};

var ImageView = function (_View) {
    _inherits(ImageView, _View);

    function ImageView() {
        var image = arguments.length <= 0 || arguments[0] === undefined ? _Util.nil : arguments[0];

        _classCallCheck(this, ImageView);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ImageView).call(this));

        _this.userInteractionEnabled = false;
        _this.image = image;
        _this._autoSizing = false;
        _this._equalRatio = EqualRatio.None;
        return _this;
    }

    _createClass(ImageView, [{
        key: 'fitSize',
        value: function fitSize() {
            if (this.image.complete) {
                return new _Geometry.Size(this.image.width, this.image.height);
            } else {
                return this.size;
            }
        }
    }, {
        key: '_renderWithImage',
        value: function _renderWithImage(image) {
            if (!image) {
                return;
            }
            if (this.autoSizing) {
                this.size = new _Geometry.Size(image.width, image.height);
            } else if (this.equalRatio == EqualRatio.FlexibleHeight) {
                var imageRatio = image.height / image.width;
                this.size = new _Geometry.Size(this.size.width, imageRatio * this.size.width);
            } else if (this.equalRatio == EqualRatio.FlexibleWidth) {
                var _imageRatio = image.width / image.height;
                this.size = new _Geometry.Size(_imageRatio * this.size.height, this.size.height);
            }
            this._checkAndSetNeedsRender();
        }
    }, {
        key: 'render',
        value: function render(ctx) {
            _get(Object.getPrototypeOf(ImageView.prototype), 'render', this).call(this, ctx);
            if (!this.image) {
                return;
            }
            ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, this.size.width, this.size.height);
        }
    }, {
        key: 'autoSizing',
        get: function get() {
            return this._autoSizing;
        },
        set: function set(newValue) {
            if (this._autoSizing != newValue) {
                this._autoSizing = newValue;
                this._checkAndSetNeedsRender();
            }
        }
    }, {
        key: 'equalRatio',
        get: function get() {
            return this._equalRatio;
        },
        set: function set(newValue) {
            if (this._equalRatio != newValue) {
                this._equalRatio = newValue;
                this._checkAndSetNeedsRender();
            }
        }
    }, {
        key: 'image',
        get: function get() {
            return this._image;
        },
        set: function set(newValue) {
            var _this2 = this;

            if (this._image != newValue) {
                if (this._image) {
                    this._image.removeEventListener('load', this._imageOnload);
                }
                this._image = newValue;
                if (this._image) {
                    if (this._image.complete) {
                        this._renderWithImage(this._image);
                    } else {
                        if (!this._imageOnload) {
                            this._imageOnload = function () {
                                _this2._renderWithImage(_this2._image);
                            };
                        }
                        this._image.addEventListener('load', this._imageOnload);
                    }
                } else {
                    this._checkAndSetNeedsRender();
                }
            }
        }
    }]);

    return ImageView;
}(_View3.default);

exports.default = ImageView;

},{"../util/Util":5,"./CGContext":10,"./Geometry":13,"./View":18}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VerticalAlignment = exports.TextAlignment = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Util = require('../util/Util');

var _View2 = require('./View');

var _View3 = _interopRequireDefault(_View2);

var _Geometry = require('./Geometry');

var _Font = require('./Font');

var _Font2 = _interopRequireDefault(_Font);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextAlignment = exports.TextAlignment = {
    Left: 0,
    Center: 1,
    Right: 2
};

var VerticalAlignment = exports.VerticalAlignment = {
    Top: 0,
    Center: 1,
    Bottm: 2
};

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
        _this._font = new _Font2.default();
        _this._text = _Util.nil;
        _this._textColor = "black";
        _this._lineHeight = parseFloat(_this.font.fontSize);
        _this._autoSizing = false;
        _this._textAlignment = TextAlignment.Left; // only support single line label
        _this._verticalAlignment = TextAlignment.Top; // only support single line label
        _this.backgroundAlpha = 0;
        _this.userInteractionEnabled = false;
        return _this;
    }

    _createClass(Label, [{
        key: 'autoResize',
        value: function autoResize() {
            if (this.autoSizing) {
                this.sizeToFit();
            }
        }
    }, {
        key: 'fitSize',
        value: function fitSize() {
            if (!this.text) {
                return new _Geometry.Size();
            } else {
                if (this.isMultiLine) {
                    return;
                } else {
                    var context = new CGContext(this);
                    return new _Geometry.Size(context.measureText(this.text), this.lineHeight);
                }
            }
        }
    }, {
        key: 'render',
        value: function render(ctx) {
            _get(Object.getPrototypeOf(Label.prototype), 'render', this).call(this, ctx);
            var drawingText = this.text == _Util.nil ? "" : this.text;
            ctx.fillStyle = this.textColor;
            ctx.font = this.font;
            if (this.isMultiLine) {
                ctx.wrapText(drawingText, 0, 0, this.size.width, this.lineHeight);
            } else {
                var x = 0;
                var y = 0;
                if (this.verticalAlignment == VerticalAlignment.Center) {
                    ctx.textBaseline = "middle";
                    y = this.size.height / 2;
                } else if (this.verticalAlignment == VerticalAlignment.Bottom) {
                    ctx.textBaseline = "bottom";
                    y = this.size.height;
                }

                if (this.textAlignment == TextAlignment.Center) {
                    ctx.textAlign = "center";
                    x = this.size.width / 2;
                } else if (this.textAlignment == TextAlignment.Right) {
                    ctx.textAlign = "right";
                    x = this.size.width;
                }
                ctx.fillText(drawingText, x, y, this.size.width);
            }
        }
    }, {
        key: 'textAlignment',
        get: function get() {
            return this._textAlignment;
        },
        set: function set(newValue) {
            if (this._textAlignment != newValue) {
                this._textAlignment = newValue;
                this.autoResize();
                this._checkAndSetNeedsRender();
            }
        }
    }, {
        key: 'verticalAlignment',
        get: function get() {
            return this._verticalAlignment;
        },
        set: function set(newValue) {
            if (this._verticalAlignment != newValue) {
                this._verticalAlignment = newValue;
                this.autoResize();
                this._checkAndSetNeedsRender();
            }
        }
    }, {
        key: 'autoSizing',
        get: function get() {
            return this._autoSizing;
        },
        set: function set(newValue) {
            if (this._autoSizing != newValue) {
                this._autoSizing = newValue;
                this.autoResize();
                this._checkAndSetNeedsRender();
            }
        }
    }, {
        key: 'text',
        get: function get() {
            return this._text;
        },
        set: function set(newValue) {
            if (this._text != newValue) {
                this._text = newValue;
                this.autoResize();
                this._checkAndSetNeedsRender();
            }
        }
    }, {
        key: 'isMultiLine',
        get: function get() {
            return this._multiLine;
        },
        set: function set(newValue) {
            if (this._multiLine != newValue) {
                this._multiLine = newValue;
                this.autoResize();
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
    }, {
        key: 'font',
        get: function get() {
            return this._font;
        },
        set: function set(newValue) {
            if (this._font != newValue) {
                this._font = newValue;
                this.autoResize();
                this._checkAndSetNeedsRender();
            }
        }
    }, {
        key: 'lineHeight',
        get: function get() {
            return this._lineHeight;
        },
        set: function set(newValue) {
            if (this._lineHeight != newValue) {
                this._lineHeight = newValue;
                this.autoResize();
                this._checkAndSetNeedsRender();
            }
        }
    }]);

    return Label;
}(_View3.default);

exports.default = Label;

},{"../util/Util":5,"./Font":12,"./Geometry":13,"./View":18}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Util = require('../util/Util');

var _View3 = require('./View');

var _View4 = _interopRequireDefault(_View3);

var _Geometry = require('./Geometry');

var _TouchEvent = require('./TouchEvent');

var _TouchEvent2 = _interopRequireDefault(_TouchEvent);

var _BezierPath = require('./BezierPath');

var _BezierPath2 = _interopRequireDefault(_BezierPath);

var _Animator = require('../view/Animator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollViewIndicator = function (_View) {
    _inherits(ScrollViewIndicator, _View);

    function ScrollViewIndicator() {
        var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var width = arguments.length <= 2 || arguments[2] === undefined ? 5 : arguments[2];
        var height = arguments.length <= 3 || arguments[3] === undefined ? 64 : arguments[3];

        _classCallCheck(this, ScrollViewIndicator);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ScrollViewIndicator).call(this, x, y, width, height));

        _this.backgroundAlpha = 0.6;
        _this.backgroundColor = "black";
        _this.cornerRadius = 3;
        _this.timeoutID = _Util.nil;
        _this.alpha = 0;
        return _this;
    }

    _createClass(ScrollViewIndicator, [{
        key: 'flash',
        value: function flash() {
            var _this2 = this;

            if (this.timeoutID != _Util.nil) {
                window.clearTimeout(this.timeoutID);
                this.timeoutID = _Util.nil;
            }
            this.alpha = 1;
            this.timeoutID = setTimeout(function () {
                var animation = new _Animator.AnimatAction(_this2, "alpha", 0, 0.3);
                animation.start();
            }, 1000);
        }
    }, {
        key: 'draw',
        value: function draw(ctx) {}
    }]);

    return ScrollViewIndicator;
}(_View4.default);

var ScrollView = function (_View2) {
    _inherits(ScrollView, _View2);

    function ScrollView() {
        var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var width = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
        var height = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

        _classCallCheck(this, ScrollView);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(ScrollView).call(this, x, y, width, height));

        _this3.offset = new _Geometry.Point(0, 0);
        _this3.contentSize = _this3.size;
        _this3._firstResponser = _this3;
        _this3.clipToBounds = true;

        _this3.verticalIndicator = new ScrollViewIndicator(0, 0, 5, 64);
        _this3.addSubview(_this3.verticalIndicator);
        _this3.verticalIndicator.position = new _Geometry.Point(_this3.contentSize.width - _this3.verticalIndicator.width, 0);
        _this3.verticalIndicator.autoresizingMask = _Geometry.ViewAutoresizing.FlexibleLeftMargin;

        _this3.horizontalIndicator = new ScrollViewIndicator(0, 0, 64, 5);
        _this3.addSubview(_this3.horizontalIndicator);
        _this3.horizontalIndicator.position = new _Geometry.Point(0, _this3.contentSize.height - _this3.horizontalIndicator.height);
        _this3.horizontalIndicator.autoresizingMask = _Geometry.ViewAutoresizing.FlexibleTopMargin;
        return _this3;
    }

    _createClass(ScrollView, [{
        key: 'addSubview',
        value: function addSubview(view) {
            _get(Object.getPrototypeOf(ScrollView.prototype), 'addSubview', this).call(this, view);
            this.bringSubviewToFront(this.verticalIndicator);
            this.bringSubviewToFront(this.horizontalIndicator);
        }
    }, {
        key: 'refreshIndicator',
        value: function refreshIndicator() {
            this.verticalIndicator.position = new _Geometry.Point(this.contentOffset.x + this.width - this.verticalIndicator.width, this.contentOffset.y / (this.contentSize.height - this.height) * (this.contentSize.height - this.verticalIndicator.size.height));
            this.horizontalIndicator.position = new _Geometry.Point(this.contentOffset.x / (this.contentSize.width - this.width) * (this.contentSize.width - this.horizontalIndicator.size.width), this.contentOffset.y + this.height - this.horizontalIndicator.height);
        }
    }, {
        key: 'mouseDown',
        value: function mouseDown(event) {
            var responser = this.hitTest(event.point);
            if (responser === this) {
                return;
            }
            this._firstResponser = responser;
            var newEvent = new _TouchEvent2.default();
            newEvent.isDown = true;
            newEvent.firstResponser = responser;
            newEvent.point = this.convertPointToView(event.point, event.firstResponser);
            newEvent.windowPoint = event.windowPoint.copy();
            newEvent.event = "mouseDown";
            if (newEvent.firstResponser !== this) {
                newEvent.firstResponser.mouseDown(event);
            }
        }
    }, {
        key: 'mouseMove',
        value: function mouseMove(event) {
            if (!event.isDown) {
                return;
            }
            if (this._firstResponser) {
                var newEvent = new _TouchEvent2.default();
                newEvent.isDown = true;
                newEvent.firstResponser = this._firstResponser;
                newEvent.point = this.convertPointToView(event.point, event.firstResponser);
                newEvent.windowPoint = event.windowPoint.copy();
                newEvent.event = "mouseCancel";
                newEvent.offset = event.offset;
                if (newEvent.firstResponser !== this) {
                    newEvent.firstResponser.mouseCancel(event);
                }
                this._firstResponser = _Util.nil;
            }
            if (event.offset) {
                this.contentOffset = new _Geometry.Point(this.contentOffset.x + event.offset.x, this.contentOffset.y + event.offset.y);
            }
        }
    }, {
        key: 'mouseUp',
        value: function mouseUp(event) {
            if (this._firstResponser) {
                var newEvent = new _TouchEvent2.default();
                newEvent.isDown = false;
                newEvent.firstResponser = this._firstResponser;
                newEvent.point = this.convertPointToView(event.point, event.firstResponser);
                newEvent.windowPoint = event.windowPoint.copy();
                newEvent.event = "mouseUp";
                if (newEvent.firstResponser !== this) {
                    newEvent.firstResponser.mouseUp(event);
                }
                this._firstResponser = _Util.nil;
            }
        }
    }, {
        key: 'mouseCancel',
        value: function mouseCancel(event) {
            if (this._firstResponser) {
                var newEvent = new _TouchEvent2.default();
                newEvent.isDown = false;
                newEvent.firstResponser = this._firstResponser;
                newEvent.point = this.convertPointToView(event.point, event._firstResponser);
                newEvent.windowPoint = event.windowPoint.copy();
                newEvent.event = "mouseCancel";
                if (newEvent.firstResponser !== this) {
                    newEvent.firstResponser.mouseCancel(event);
                }
                this._firstResponser = _Util.nil;
            }
        }
    }, {
        key: 'render',
        value: function render(ctx) {
            ctx.save();
            ctx.alpha = ctx.alpha * this.backgroundAlpha;
            if (ctx.alpha != 0) {
                ctx.shadowColor = this.shadowColor;
                ctx.shadowBlur = this.shadowBlur;
                ctx.shadowOffset = this.shadowOffset;
                ctx.fillStyle = this.backgroundColor;
                if (this.cornerRadius != 0) {
                    ctx.radiusRect(0, 0, this.contentSize.width, this.contentSize.height, this.cornerRadius);
                    ctx.fill();
                    this.draw(ctx);
                    if (this.boarderWidth != 0) {
                        ctx.strokeStyle = this.boarderColor;
                        ctx.lineWidth = this.boarderWidth;
                        ctx.stroke();
                    }
                } else {
                    ctx.fillRect(0, 0, this.contentSize.width, this.contentSize.height);
                    this.draw(ctx);
                    if (this.boarderWidth != 0) {
                        ctx.strokeStyle = this.boarderColor;
                        ctx.lineWidth = this.boarderWidth;
                        ctx.strokeRect(0, 0, this.contentSize.width, this.contentSize.height);
                    }
                }
            }
            ctx.restore();
        }
    }, {
        key: 'hitTest',
        value: function hitTest(point) {
            return this;
        }
    }, {
        key: 'contentOffset',
        get: function get() {
            return this._offset;
        },
        set: function set(newValue) {
            if (this._offset != newValue) {
                var maxX = this.contentSize.width - this.size.width;
                var maxY = this.contentSize.height - this.size.height;
                var value = new _Geometry.Point(Math.min(Math.max(newValue.x, 0), maxX), Math.min(Math.max(newValue.y, 0), maxY));
                this._offset = value;
                this.refreshIndicator();
                this.verticalIndicator.flash();
                this.horizontalIndicator.flash();
                this._checkAndForceRender();
            }
        }
    }]);

    return ScrollView;
}(_View4.default);

exports.default = ScrollView;

},{"../util/Util":5,"../view/Animator":6,"./BezierPath":8,"./Geometry":13,"./TouchEvent":17,"./View":18}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Util = require('../util/Util');

var _Geometry = require('./Geometry');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TouchEvent = function TouchEvent() {
    _classCallCheck(this, TouchEvent);

    this.isDown = false;
    this.firstResponser = _Util.nil;
    this.point = _Util.nil;
    this.windowPoint = _Util.nil;
    this.event = _Util.nil;
    this.offset = new _Geometry.Point();
};

exports.default = TouchEvent;

},{"../util/Util":5,"./Geometry":13}],18:[function(require,module,exports){
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

var _Animator = require('./Animator');

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
        _this._offset = new _Geometry.Point();
        _this._position = new _Geometry.Point(x, y);
        _this._size = new _Geometry.Size(width, height);
        _this._alpha = 1;
        _this.backgroundAlpha = 1;
        _this.subviews = new Array();
        _this.autoresizingMask = _Geometry.ViewAutoresizing.None;
        _this.superview = _Util.nil;
        _this.window = _Util.nil;
        _this.userInteractionEnabled = true;
        _this._clipToBounds = false;
        _this.cornerRadius = 0;
        //boarder && shadow
        _this._boarderColor = _Util.nil;
        _this._boarderWidth = 0;

        _this._shadowBlur = 0;
        _this._shadowColor = "black";
        _this._shadowOffset = new _Geometry.Point();

        _this.animations = new Array();
        _this.an_position = _Util.nil;
        _this.an_size = _Util.nil;
        _this.an_alpha = _Util.nil;
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
            this.position = newPosition;
            this.size = newSize;
        }
    }, {
        key: 'layoutSubviews',
        value: function layoutSubviews() {}
    }, {
        key: 'sizeToFit',
        value: function sizeToFit() {
            var value = this.fitSize();
            if (_Geometry.Size.prototype.isPrototypeOf(value)) {
                this.size = value;
            }
        }
    }, {
        key: 'fitSize',
        value: function fitSize() {
            return this.size;
        }
    }, {
        key: 'getContext',
        value: function getContext() {
            var canvas = document.getElementById("canvas");
            return canvas.getContext("2d");
        }
    }, {
        key: 'bringSubviewToFront',
        value: function bringSubviewToFront(view) {
            var index = this.subviews.indexOf(view);
            if (index == this.subviews.count - 1) {
                return;
            }
            if (index != -1) {
                this.subviews.splice(index, 1);
                this.subviews.push(view);
            }
        }
    }, {
        key: 'sendSubviewToBack',
        value: function sendSubviewToBack(view) {
            var index = this.subviews.indexOf(view);
            if (index == 0) {
                return;
            }
            if (index != -1) {
                this.subviews.splice(index, 1);
                this.subviews.splice(0, 0, view);
            }
        }
    }, {
        key: 'addSubview',
        value: function addSubview(view) {
            if (view.superview === this) {
                return;
            }
            view.willMoveToSuperview(this);
            view.willMoveToWindow(this.window);
            view.removeFromSuperview();
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
            if (this.superview) {
                this.superview.removeSubview(this);
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
            var offset = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

            if (this === view) {
                return point;
            } else if (this.isDescendantOfView(view)) {
                var next = this;
                var convertPoint = point.copy();
                while (next !== view && next !== _Util.nil) {
                    convertPoint = new _Geometry.Point(convertPoint.x + next.position.x, convertPoint.y + next.position.y);
                    if (offset) {
                        convertPoint.x -= next._offset.x;
                        convertPoint.y -= next._offset.y;
                    }
                    next = next.superview;
                }
                return convertPoint;
            } else if (this.isAcendantOfView(view)) {
                var array = new Array();
                var _next = view;
                while (_next !== this && _next !== _Util.nil) {
                    array.push(_next);
                    _next = _next.superview;
                }
                var _convertPoint = point.copy();
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = array.reverseArray()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var value = _step3.value;

                        _convertPoint = new _Geometry.Point(_convertPoint.x - value.position.x, _convertPoint.y - value.position.y);
                        if (offset) {
                            _convertPoint.x += _next._offset.x;
                            _convertPoint.y += _next._offset.y;
                        }
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

                return _convertPoint;
            } else if (this.window !== view.window) {
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
        key: '_checkAndForceRender',
        value: function _checkAndForceRender() {
            if (this.window !== _Util.nil && this.window === _Drawloop.drawloop.keyWindow) {
                _Drawloop.drawloop.forceRender();
            }
        }
    }, {
        key: '_render',
        value: function _render() {
            //console.log(`render:${this.toString()}`)
            var ctx = new _CGContext2.default(this);
            ctx.save();
            if (this.clipToBounds) {
                ctx.clip({ position: new _Geometry.Point(), size: this.size.copy() }, false);
            }
            ctx.alpha = ctx.alpha * this.alpha;
            if (ctx.alpha != 0) {
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
            }
            ctx.restore();
        }
    }, {
        key: 'draw',
        value: function draw(ctx) {}
    }, {
        key: 'render',
        value: function render(ctx) {
            ctx.save();
            ctx.alpha = ctx.alpha * this.backgroundAlpha;
            if (ctx.alpha != 0) {
                ctx.shadowColor = this.shadowColor;
                ctx.shadowBlur = this.shadowBlur;
                ctx.shadowOffset = this.shadowOffset;
                ctx.fillStyle = this.backgroundColor;
                if (this.cornerRadius != 0) {
                    ctx.radiusRect(0, 0, this.width, this.height, this.cornerRadius);
                    ctx.fill();
                    this.draw(ctx);
                    if (this.boarderWidth != 0) {
                        ctx.strokeStyle = this.boarderColor;
                        ctx.lineWidth = this.boarderWidth;
                        ctx.stroke();
                    }
                } else {
                    ctx.fillRect(0, 0, this.width, this.height);
                    this.draw(ctx);
                    if (this.boarderWidth != 0) {
                        ctx.strokeStyle = this.boarderColor;
                        ctx.lineWidth = this.boarderWidth;
                        ctx.strokeRect(0, 0, this.width, this.height);
                    }
                }
            }
            ctx.restore();
        }
    }, {
        key: 'toString',
        value: function toString() {
            return this.className() + ':{position:(' + this.position.x + ',' + this.position.y + '), size:(' + this.size.width + ',' + this.size.height + ')}';
        }

        // touch

    }, {
        key: 'hitTest',
        value: function hitTest(point) {
            var finalView = _Util.nil;
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = this.subviews.reverseArray()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var subview = _step5.value;

                    if (subview.pointInside(point)) {
                        var view = subview.hitTest(this.convertPointToView(point, subview));
                        if (view.userInteractionEnabled == true) {
                            finalView = view;
                            break;
                        }
                    }
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            if (finalView) {
                return finalView;
            } else {
                return this;
            }
        }
    }, {
        key: 'pointInside',
        value: function pointInside(point) {
            return (0, _Geometry.isPointIn)(point, this.position, this.size);
        }
    }, {
        key: 'mouseDown',
        value: function mouseDown(event) {
            //console.log(`I'm down ${this.toString()}`)
        }
    }, {
        key: 'mouseMove',
        value: function mouseMove(event) {
            //console.log(`I'm move ${this.toString()}`)
        }
    }, {
        key: 'mouseUp',
        value: function mouseUp(event) {
            //console.log(`I'm up ${this.toString()}`)
        }
    }, {
        key: 'mouseCancel',
        value: function mouseCancel(event) {
            //console.log(`I'm cancel ${this.toString()}`)
        }
    }, {
        key: 'shadowColor',
        get: function get() {
            return this._shadowColor;
        },
        set: function set(newValue) {
            if (this._shadowColor != newValue) {
                this._shadowColor = newValue;
                this._checkAndSetNeedsRender();
            }
        }
    }, {
        key: 'shadowBlur',
        get: function get() {
            return this._shadowBlur;
        },
        set: function set(newValue) {
            if (this._shadowBlur != newValue) {
                this._shadowBlur = newValue;
                this._checkAndSetNeedsRender();
            }
        }
    }, {
        key: 'shadowOffset',
        get: function get() {
            return this._shadowOffset;
        },
        set: function set(newValue) {
            if (this._shadowOffset != newValue) {
                this._shadowOffset = newValue;
                this._checkAndSetNeedsRender();
            }
        }
    }, {
        key: 'boarderColor',
        get: function get() {
            return this._boarderColor;
        },
        set: function set(newValue) {
            if (this._boarderColor != newValue) {
                this._boarderColor = newValue;
                this._checkAndSetNeedsRender();
            }
        }
    }, {
        key: 'boarderWidth',
        get: function get() {
            return this._boarderWidth;
        },
        set: function set(newValue) {
            if (this._boarderWidth != newValue) {
                this._boarderWidth = newValue;
                this._checkAndSetNeedsRender();
            }
        }
    }, {
        key: 'clipToBounds',
        get: function get() {
            return this._clipToBounds;
        },
        set: function set(newValue) {
            if (this._clipToBounds != newValue) {
                this._clipToBounds = newValue;
                this._checkAndSetNeedsRender();
            }
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
            if (_Animator.AnimationModel) {
                return this.an_alpha || this._alpha;
            }
            return this._alpha;
        },
        set: function set(newValue) {
            if (_Animator.AnimationModel) {
                this.an_alpha = newValue;
                return;
            }
            if (this.animations["alpha"]) {
                this.animations["alpha"].immediatelyToEnd();
                delete this.animations["alpha"];
                this._checkAndSetNeedsRender();
            }
            if (this._alpha != newValue) {
                this._alpha = newValue;
                this._checkAndSetNeedsRender();
            }
        }
    }, {
        key: 'position',
        get: function get() {
            if (_Animator.AnimationModel) {
                return this.an_position || this._position;
            }
            return this._position;
        },
        set: function set(newValue) {
            if (_Animator.AnimationModel) {
                this.an_position = newValue;
                return;
            }
            if (this.animations["position"]) {
                this.animations["position"].immediatelyToEnd();
                delete this.animations["position"];
                this._checkAndSetNeedsRender();
            }
            if (this._position != newValue) {
                this._position = newValue;
                this._checkAndSetNeedsRender();
            }
        }
    }, {
        key: 'size',
        get: function get() {
            if (_Animator.AnimationModel) {
                return this.an_size || this._size;
            }
            return this._size;
        },
        set: function set(newValue) {
            if (_Animator.AnimationModel) {
                this.an_size = newValue;
                return;
            }
            if (this.animations["size"]) {
                this.animations["size"].immediatelyToEnd();
                delete this.animations["size"];
                this._checkAndSetNeedsRender();
            }
            var newSize = newValue.round();
            var oldSize = this._size;
            if (oldSize != newSize) {
                this._size = newSize;
                this._layoutSubviews(oldSize);
                this._checkAndSetNeedsRender();
            }
        }
    }, {
        key: 'x',
        get: function get() {
            return this.position.x;
        },
        set: function set(newValue) {
            var newPoint = new _Geometry.Point(newValue, this.position.y);
            this.position = newPoint;
        }
    }, {
        key: 'y',
        get: function get() {
            return this.position.y;
        },
        set: function set(newValue) {
            var newPoint = new _Geometry.Point(this.position.x, newValue);
            this.position = newPoint;
        }
    }, {
        key: 'width',
        get: function get() {
            return this.size.width;
        },
        set: function set(newValue) {
            var newSize = new _Geometry.Size(width, this.size.height);
            this.size = newSize;
        }
    }, {
        key: 'height',
        get: function get() {
            return this.size.height;
        },
        set: function set(newValue) {
            var newSize = new _Geometry.Size(height, this.size.width);
            this.size = newSize;
        }
    }]);

    return View;
}(_BaseObject3.default);

exports.default = View;

},{"../util/Util.js":5,"./Animator":6,"./BaseObject":7,"./CGContext":10,"./Drawloop":11,"./Geometry":13}],19:[function(require,module,exports){
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

var _TouchEvent = require('./TouchEvent');

var _TouchEvent2 = _interopRequireDefault(_TouchEvent);

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
        _this.firstResponser = _this;
        _this.isDown = false;
        _this._lastMoveEvent = _Util.nil;
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
    }, {
        key: 'receiveMouseDown',
        value: function receiveMouseDown(point) {
            this._lastMoveEvent = _Util.nil;
            this.isDown = true;
            var p = new _Geometry.Point(point[0], point[1]);
            var responser = this.hitTest(p);
            this.firstResponser = responser;

            var event = new _TouchEvent2.default();
            event.isDown = this.isDown;
            event.firstResponser = responser;
            event.point = this.convertPointToView(p, event.firstResponser);
            event.windowPoint = p;
            event.event = "mouseDown";

            this.firstResponser.mouseDown(event);
        }
    }, {
        key: 'receiveMouseMove',
        value: function receiveMouseMove(point) {
            var p = new _Geometry.Point(point[0], point[1]);

            var event = new _TouchEvent2.default();
            event.isDown = this.isDown;
            if (event.isDown) {
                event.firstResponser = this.firstResponser;
            } else {
                event.firstResponser = this.hitTest(p);
            }
            event.point = this.convertPointToView(p, event.firstResponser);
            event.windowPoint = p;
            event.event = "mouseMove";
            if (this._lastMoveEvent && this._lastMoveEvent.firstResponser === event.firstResponser) {
                event.offset = event.point.minus(this._lastMoveEvent.point);
                // console.log(event.offset.y + "")
            }
            event.firstResponser.mouseMove(event);
            this._lastMoveEvent = event;
        }
    }, {
        key: 'receiveMouseUp',
        value: function receiveMouseUp(point) {
            this.isDown = false;
            var p = new _Geometry.Point(point[0], point[1]);

            var event = new _TouchEvent2.default();
            event.isDown = this.isDown;
            event.firstResponser = this.firstResponser;
            event.point = this.convertPointToView(p, event.firstResponser);
            event.windowPoint = p;

            var responser = this.hitTest(p);
            if (this.firstResponser === responser) {
                event.event = "mouseUp";
                this.firstResponser.mouseUp(event);
            } else {
                event.event = "mouseCancel";
                this.firstResponser.mouseCancel(event);
            }
            this.firstResponser = this;
        }
    }, {
        key: 'forceRender',
        value: function forceRender() {
            _Drawloop.drawloop.forceRender();
        }
    }], [{
        key: 'renderHtml',
        value: function renderHtml() {
            return '<!DOCTYPE html>\n        <head>\n            <meta name="viewport" content="width=device-width, initial-scale=1"/>\n            <title id="title"></title>\n            <style type="text/css">\n\t           html,body { background:#fff; height:100%; margin:0; padding:0; overflow:hidden }\n\t              canvas { position:absolute; top:0; left:0 }\n            </style>\n        </head>\n        <body>\n            <canvas id="canvas"></canvas>\n            <script src="./dist/bundle.js"></script>\n\n        <body>';
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
            _Drawloop.drawloop.performWithoutRender(function () {
                rootWindow.size = new _Geometry.Size(w, h);
            });
            rootWindow.forceRender();
        };

        var addTouchListener = function addTouchListener() {
            var canvas = document.getElementById("canvas");
            canvas.addEventListener("mousedown", mouseDown, false);
            canvas.addEventListener("mousemove", mouseMove, false);
            canvas.addEventListener("mouseup", mouseUp, false);
            // canvas.addEventListener("touchstart", touchDown, false);
            // canvas.addEventListener("touchend", touchUp, false);
            // canvas.addEventListener("touchmove", touchMove, false);
            // canvas.addEventListener("touchcancel", touchcancel, false);
        };

        var convertTouchPoint = function convertTouchPoint(e) {
            if (!e) {
                var _e = event;
            }
            var canvas = document.getElementById("canvas");
            var canX = e.pageX - canvas.offsetLeft;
            var canY = e.pageY - canvas.offsetTop;
            return [canX, canY];
        };

        var mouseDown = function mouseDown(e) {
            var point = convertTouchPoint(e);
            rootWindow.receiveMouseDown(point);
        };

        var mouseMove = function mouseMove(e) {
            var point = convertTouchPoint(e);
            rootWindow.receiveMouseMove(point);
        };

        var mouseUp = function mouseUp(e) {
            var point = convertTouchPoint(e);
            rootWindow.receiveMouseUp(point);
        };

        var rooWindow = new Window();
        window.rootWindow = rooWindow;

        resizeCanvas();
        addTouchListener();
        window.addEventListener('resize', resizeCanvas, false);
        rooWindow.makeKeyAndVisible();
    })();
}

},{"../main/RootView":2,"../util/Util":5,"./Drawloop":11,"./Geometry":13,"./TouchEvent":17,"./View":18}]},{},[1]);
