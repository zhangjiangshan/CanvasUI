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
