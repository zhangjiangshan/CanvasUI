"use strict"
import View from '../view/View'

export default class RootView extends View {
    constructor() {
        super()
        this.backgroundColor  = "red"
        this.size = {width:100, height:100}
        console.log("rootView")
    }
}
