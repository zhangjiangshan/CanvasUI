"use strict"
import View from '../view/View'
import {Point, Size, Edge, ViewAutoresizing} from '../view/Geometry'
import Label from '../view/Label'
import ImageView, {EqualRatio} from '../view/ImageView'
import Button, {ControlState} from '../view/Button'
import {AnimatAction, ConcurrentAnimationQueue, SerialAnimationQueue} from '../view/Animator'

export default class RootView extends View {
    constructor() {
        super()
        this.backgroundColor  = "white"
        this.autoresizingMask = ViewAutoresizing.FlexibleWidth | ViewAutoresizing.FlexibleHeight
        console.log("rootView")

        const label = new Label(0, 20, 400, 90)
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
        //view.addSubview(label)
        this.addSubview(view)

        const imageView2 = new ImageView(image)
        imageView2.position = new Point(60, 200)
        imageView2.size = new Size(100, 100)
        imageView2.equalRatio = EqualRatio.FlexibleWidth
        imageView2.backgroundColor = "#8800AA"
        this.addSubview(imageView2)

        const imageView3 = new ImageView(image)
        imageView3.position = new Point(60, 300)
        imageView3.size = new Size(100, 100)
        imageView3.equalRatio = EqualRatio.FlexibleWidth
        imageView3.backgroundColor = "#8800AA"
        imageView3.boarderWidth = 1
        imageView3.shadowBlur = 10
        this.addSubview(imageView3)

        const button = new Button()
        button.size = new Size(44,44)
        button.position = new Point(200, 300)
        button.setBackgroundColor("blue", ControlState.Normal)
        button.setBackgroundColor("red", ControlState.Highlighted)
        button.setTitle("按钮", ControlState.Normal)
        this.addSubview(button)
        button.target = self
        button.func = () => {
            const animation = new AnimatAction(imageView2, "position", (new Point(imageView2.x+330, 200)), 0.5, 3)
            const animation1 = new AnimatAction(imageView3, "position", (new Point(imageView3.x+330, 300)), 0.5, 3)
            const queue = new SerialAnimationQueue([animation, animation1])
            queue.start()
            // const animation2 = new AnimatAction(imageView, "alpha", 0, 5)
            // animation2.start()

            //imageView2.position = new Point(imageView2.x - 4, 200)
            console.log("button clicked!!!!!")
        }
    }
}
