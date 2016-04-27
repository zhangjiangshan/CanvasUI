"use strict"

export default class BaseObject {
    constructor() {

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

    className() {
        return self.constructor.name
    }

}
