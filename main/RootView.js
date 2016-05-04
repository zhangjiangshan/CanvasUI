"use strict"
import View from '../view/View'
import {Point, Size, Edge, ViewAutoresizing} from '../view/Geometry'
import Label from '../view/Label'
import ImageView, {EqualRatio} from '../view/ImageView'

export default class RootView extends View {
    constructor() {
        super()
        this.backgroundColor  = "red"
        this.autoresizingMask = ViewAutoresizing.FlexibleWidth | ViewAutoresizing.FlexibleHeight | ViewAutoresizing.FlexibleLeftMargin
        this.position = new Point(200, 30)
        console.log("rootView")

        const label = new Label(0, 20, 400, 30)
        this.backgroundColor  = "white"
        label.text = "Multimodal Learning用于面部表情识别，多模态分别表现为图像数据和标记点数据，使用Multimodal Learning对二者融合的意义在于更全面地表现表情信息以及区分不同模态的数据对表情识别的影响。"
        this.addSubview(label)
        label.isMultiLine = true

        const image = new Image()
        image.src = "./static/test.png"
        const imageView = new ImageView(image)
        imageView.position = new Point(60, 30)
        imageView.size = new Size(100, 100)
        imageView.equalRatio = EqualRatio.FlexibleHeight
        imageView.backgroundColor = "#8800AA"
        this.addSubview(imageView)

        // imageView.addSubview(label)
        // imageView.clipToBounds = true

        const view = new View(0, 100, 40, 200)
        view.backgroundColor = "blue"
        view.clipToBounds = true
        view.addSubview(label)
        this.addSubview(view)


        const imageView2 = new ImageView(image)
        imageView2.position = new Point(60, 200)
        imageView2.size = new Size(100, 100)
        imageView2.equalRatio = EqualRatio.FlexibleWidth
        imageView2.backgroundColor = "#8800AA"
        this.addSubview(imageView2)
    }
}
