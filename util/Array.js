"use strict"

Array.prototype.indexOfOld=Array.prototype.indexOf
Array.prototype.indexOf = function(e,fn) {
    if(!fn) {
        return this.indexOfOld(e)
    } else {
        if (typeof fn ==='string') {
            var att = fn
            fn = function(e) {
                return e[att]
            }
        }
       return this.map(fn).indexOfOld(e);
    }
}

Array.prototype.removeObject = function(object){
    const index = this.indexOf(object)
    if (index >= 0) {
        this.splice(index,1);
    }
}

Array.prototype.reverseArray = function() {
    const array = this.slice()
    return array.reverse()
}

Array.prototype.swap = function(index1, index2) {
    let array = this.slice()
    let obj = this[index1]
    this[index1] = this[index2]
    this[index2] = obj
    return array
}

Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};
