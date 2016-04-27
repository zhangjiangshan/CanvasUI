"use strict"
import View from '../view/View'
import {Point, Size, Edge, ViewAutoresizing} from '../view/Geometry'

export default class RootView extends View {
    constructor() {
        super()
        this.backgroundColor  = "red"
        this.autoresizingMask = ViewAutoresizing.FlexibleWidth | ViewAutoresizing.FlexibleHeight | ViewAutoresizing.FlexibleLeftMargin
        this.position = new Point(200, 30)
        console.log("rootView")
    }
}
