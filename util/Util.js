
"use strict"

export function __Func__() {
    let ownName = arguments.callee.toString()
    ownName = ownName.substr('function '.length)
    return ownName.substr(0, ownName.indexOf('('))
}

export const nil = NaN

export function copy(object) {
    return Object.assign({}, object);
}
