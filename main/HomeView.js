"use strict"
import View from '../view/View'
import {Point, Size, Edge, ViewAutoresizing} from '../view/Geometry'


export default class HomeView extends View {
    constructor() {
        super()
        this.backgroundColor = "red"
        this.autoresizingMask = ViewAutoresizing.FlexibleWidth | ViewAutoresizing.FlexibleHeight
    }
}