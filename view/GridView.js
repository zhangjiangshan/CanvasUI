/**
 * Created by zjs on 2016/12/23.
 */

"use strict"
import {nil} from '../util/Util'
import BaseObject from './BaseObject'
import View from './View'
import ScrollView from './ScrollView'
import {Point, Size, Frame, Edge, ViewAutoresizing, Direction, IndexPath} from './Geometry'
import TouchEvent from './TouchEvent'
import BezierPath from './BezierPath'
import {AnimatAction} from '../view/Animator'


export class ReuseCell extends View {

    constructor(reuseID=ReuseCell.defaultReuseID) {
        super(0, 0, 44, 44)
        this.reuseID = reuseID
    }
}
ReuseCell.defaultReuseID = 'Cell'

export class GridViewDelegate extends BaseObject {

    constructor() {
        if (new.target === GridViewDelegate) {
            throw new TypeError("Cannot construct GridViewDelegate instances directly");
        }
        if (this.cellForIndexPath === undefined) {
            throw new TypeError("Must override method cellForIndex");
        }
        if (this.sizeForIndexPath === undefined) {
            throw new TypeError("Must override method sizeForIndex");
        }
    }

    // return ReuseCell
    cellForIndexPath(indexPath) {

    }

    numberOfSections() {
        return 0
    }

    numberOfRowsInSection(section) {
        return 0
    }

    // return Size
    sizeForIndexPath(indexPath) {

    }


}

class GridViewCacheItem {
    constructor(indexPath, frame, cell) {
        this.indexPath = indexPath
        this.frame = frame
        this.cell = cell
    }
}

export class GridView extends ScrollView {
    constructor(x=0, y=0, width=5, height=64, direction=Direction.Vertical) {
        super(x, y, width, height)
        this._rowSpace = 10
        this._lineSpace = 10
        this._sectionInset = Edge(0, 0, 0, 0)
        this._scrollDirection = direction

        this._visibleCache = nil
        this._isForward = true

        this._reusableCells = new Set()
        this._usingCells = new Set()
        this._frameCache = {}

    }

    set delegate(newValue) {
        if (newValue instanceof GridViewDelegate) {
            this._delegate = newValue
        } else {
            throw new TypeError("GridView delegate should be GridViewDelegate subclass")
        }
    }

    get delegate() {
        return this._delegate
    }

    get scrollDirection() {
        return this._scrollDirection
    }

    layoutSubviews() {
        super.layoutSubviews()
        this.layoutCells()
    }

    set contentOffset(newValue) {
        if (newValue.y >= this.contentOffset.y) {
            this._isForward = ture
        } else {
            this._isForward = false
        }
        super.contentOffset(newValue)
        this.layoutCells()
    }

    dequeueReusableCellWithIdentifier(id) {
        let result = this._reusableCells.
    }

    _getPreIndexPath(indexPath) {
        if (!this.delegate) {
            return nil
        }
        const sectionNum = this.delegate.numberOfSections()
        if (indexPath.row != 0) {
            return new IndexPath(indexPath.row - 1, indexPath.section)
        } else {
            let nextSection = this.indexPath.section - 1
            while(nextSection >= 0) {
                const rowNumber = this.delegate.numberOfRowsInSection(nextSection)
                if (rowNumber > 0) {
                    return new IndexPath(rowNumber - 1, nextSection)
                }
                nextSection--
            }
            return nil
        }
    }

    _getNextIndexPath(indexPath) {
        if (!this.delegate) {
            return nil
        }
        if (indexPath.row != this.delegate.numberOfRowsInSection(indexPath.section) - 1) {
            return new IndexPath(indexPath.row + 1, indexPath.section)
        } else {
            const sectionNum = this.delegate.numberOfSections()
            let nextSection = this.indexPath.section + 1
            while(nextSection <= sectionNum - 1) {
                if (this.delegate.numberOfRowsInSection(nextSection) > 0) {
                    return new IndexPath(0, nextSection)
                }
                nextSection++
            }
            return nil
        }
    }

    _enumIndexPath(from=(new IndexPath(0, 0)), backword=false, callback) {
        var section = from.section
        var row = from.row
        const sectionNum = this.delegate.numberOfSections()
        if (!backword) {
            while (section < sectionNum) {
                const rowNum = this.delegate.numberOfRowsInSection(section)
                while (row < rowNum) {
                    const stop = callback((new IndexPath(row, section)), backword)
                    if (stop === true) {
                        return
                    }
                    row++
                }
                section++
                row = 0
            }
        } else {
            while (section >= 0) {
                while (row >= 0) {
                    const stop = callback((new IndexPath(row, section)), backword)
                    if (stop === true) {
                        return
                    }
                    row--
                }
                section--
                if (section >= 0) {
                    row = this.delegate.numberOfRowsInSection(section) - 1
                }
            }
        }
    }

    _frameForIndexPath(indexPath) {
        if (!this.delegate) {
            return
        }
        const key = indexPath.valueOf()
        let result = this._frameCache[key]
        if (result) {
            return result
        }
        if (indexPath.section == 0 && indexPath.row == 0) {
            result = new Frame(0, 0, this.delegate.sizeForIndexPath(indexPath))
        } else {
            const preIndex = this._getPreIndexPath(indexPath)
            const preFrame = this._frameForIndexPath(preIndex)
            const size = this.delegate.sizeForIndexPath(indexPath)
            if (preFrame.maxX + size.width <= this.size.width) {
                result = new Frame(preFrame.maxX + size.width, preFrame.y, size.width, size.height)
            } else {
                result = new Frame(0, preFrame.maxY, size.width, size.height)
            }
        }
        this._frameCache[key] = result
        return result
    }

    createCache(noCache=false) {
        if (!this.delegate) {
            return
        }
        let newCache = new Array()
        const func = (indexPath, backward) => {
            const frame = this._frameForIndexPath(indexPath)
            if (frame.maxY <= this.contentOffset.y || frame.maxY > this.contentOffset.y + this.size.height) {
                return
            }
            const cell = this.delegate.cellForIndexPath(indexPath)
            cell.origin = frame.origin
            cell.size = frame.size
            const item = {indexPath:indexPath, cell:cell}
            if (backward) {
                newCache.insert(0, item)
            } else {
                newCache.push(item)
            }
        }

        this._enumIndexPath(this._visibleCache. , !this._isForward ,func)
        if (noCache) {
            this._enumIndexPath((new IndexPath(0, 0), false ,func)
        } else {
            if (this._isForward) {
                let startIndex = this._visibleCache.length > 0 ? this._visibleCache[0] : (new IndexPath(0, 0))
                this._enumIndexPath(startIndex, true, func)
            } else {
                let startIndex = this._visibleCache.length > 0 ? this._visibleCache[this._visibleCache.length - 1] : (new IndexPath(0, 0))
                this._enumIndexPath(startIndex, false, func)
            }
        }
        return array
    }

    layoutCells(noCache=false) {
        const newCache = this.createCache(noCache)
        let removeCells = this._usingCells.slice(0)
        array.forEach((value) => {
            const cell = value.cell
            if (this._usingCells.include(cell)) {
                return
            } else {
                this.addSubview(cell)
                this._reusableCells.delete(cell)
                this._usingCells.add(value)
                removeCells.removeObject(cell)
            }
        })
        removeCells.forEach((value) => {
            value.removeFromSuperview()
            this._usingCells.delete(value)
            this._reusableCells.add(value)
        })
    }
}
