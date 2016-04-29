"use strict"
import View from '../view/View'
import {Point, Size, Edge, ViewAutoresizing} from '../view/Geometry'
import Label from '../view/Label'

export default class RootView extends View {
    constructor() {
        super()
        this.backgroundColor  = "red"
        this.autoresizingMask = ViewAutoresizing.FlexibleWidth | ViewAutoresizing.FlexibleHeight | ViewAutoresizing.FlexibleLeftMargin
        this.position = new Point(200, 30)
        console.log("rootView")

        const label = new Label(0, 20, 400, 30)
        this.backgroundColor  = "white"
        label.text = "canvalotion is here"
        this.addSubview(label)

    }
}
