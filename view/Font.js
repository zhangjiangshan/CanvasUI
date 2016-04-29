"use strict"

/*
this.fontStyle = "italic";
this.fontWeight = "bold";
this.fontSize = "24px";
this.fontFamily = "Verdana";
*/

class Font {
    constructor() {
        this.fontStyle = "";
        this.fontWeight = "";
        this.fontSize = "24px";
        this.fontFamily = "Helvetica";
        var b = " ";
    }

    getFontText() {
        return this.fontStyle + " " +
                this.fontWeight + " " +
                this.fontSize + " " +
                this.fontFamily;
    }

    copy() {
        const font = new Font()
        font.fontStyle = this.fontStyle
        font.fontWeight = this.fontWeight
        font.fontSize = this.fontSize
        font.fontFamily = this.fontFamily
        return font
    }
}
