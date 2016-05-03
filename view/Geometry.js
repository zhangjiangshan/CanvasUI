"use strict"


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
