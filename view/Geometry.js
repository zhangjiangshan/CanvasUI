"use strict"

Number.prototype.multiply = function(value) {
    return this * value
}
Number.prototype.add = function(value) {
    return this + value
}
Number.prototype.minus = function(value) {
    return this - value
}
 // if (typeof testObj.callableFunction == 'function') {
 //     testObj.callableFunction();
 // }

export class Point {
    constructor(x=0, y=0) {
        this.x = x
        this.y = y
    }
    valueOf() {
        return JSON.stringify(this)
    }
    round() {
        return new Point(Math.round(this.x), Math.round(this.y))
    }
    copy() {
        return new Point(this.x, this.y)
    }
    multiply(value) {
        return new Point(this.x.multiply(value), this.y.multiply(value))
    }
    add (point) {
        return new Point(this.x.add(point.x), this.y.add(point.y))
    }
    minus(point) {
        return new Point(this.x.minus(point.x), this.y.minus(point.y))
    }
    static PointZero() {
        return new Point()
    }
}

export class Size {
    constructor(width=0, height=0) {
        this.width = width
        this.height = height
    }
    valueOf() {
        return JSON.stringify(this)
    }
    round() {
        return new Size(Math.round(this.width), Math.round(this.height))
    }
    copy() {
        return new Size(this.width, this.height)
    }
    multiply(value) {
        return new Point(this.width.multiply(value), this.height.multiply(value))
    }
    add (value) {
        return new Point(this.width.add(value.width), this.height.add(value.height))
    }
    minus(value) {
        return new Point(this.width.minus(value.width), this.height.minus(value.height))
    }
}

export class Edge {
    constructor(top=0, left=0, bottom=0, right=0) {
        this.top = top
        this.left = left
        this.bottom = bottom
        this.right = right
    }
    valueOf() {
        return JSON.stringify(this)
    }
    round() {
        return new Edge(Math.round(this.top),
                        Math.round(this.left),
                        Math.round(this.bottom),
                        Math.round(this.right))
    }

}

export class Frame {
    constructor(x=0, y=0, width=0, height=0) {
        this.origin = new Point(x, y)
        this.size = new Size(width, height)
    }
    get x() {
        return this.origin.x
    }
    get y() {
        return this.origin.y
    }
    get width() {
        return this.size.width
    }
    get height() {
        return this.size.height
    }
    get maxX() {
        return this.origin.x + this.size.width
    }
    get maxY() {
        return this.origin.y + this.size.height
    }
    valueOf() {
        return JSON.stringify(this)
    }
    round() {
        return new Frame(Math.round(this.origin.x),
                        Math.round(this.origin.y),
                        Math.round(this.size.width),
                        Math.round(this.size.height))
    }
    copy() {
        return new Frame(this.origin.x, this.origin.y, this.size.width, this.size.height)
    }

}

export class IndexPath {
    constructor(row = 0, section = 0) {
        if (arguments.length == 1) { // 传参为JSON.stringify(this)
            JSON.parse(row, function (k, v) {
                this[k] = v
            })
        } else {
            this.row = row
            this.section = section
        }
    }

    valueOf() {
        return JSON.stringify(this)
    }

    copy() {
        return new IndexPath(this.row, this.section)
    }
}

export function isPointIn(point, position, size) {
    const xIn = ((point.x >= position.x) && (point.x <= position.x + size.width))
    const yIn = ((point.y >= position.y) && (point.y <= position.y + size.height))
    return (xIn && yIn)
}

export const ViewAutoresizing = {
    None:                  0,
    FlexibleLeftMargin:    1 << 0,
    FlexibleWidth:         1 << 1,
    FlexibleRightMargin:   1 << 2,
    FlexibleTopMargin:     1 << 3,
    FlexibleHeight:        1 << 4,
    FlexibleBottomMargin:  1 << 5
};

export const Direction = {
    Horizontal:  0,
    Vertical:    1
};
