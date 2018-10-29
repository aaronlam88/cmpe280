"use strict"; // to avoid bad JavaScript code https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode

class Template {
    /**
     * Note on class variable:
     * var temp = 5; // cannot do that
     * You should init your class variable in the constructor with this.temp = 5
     */ 

    /**
     * contructor: same as Java/C++ constructor
     * You should setup your class variables here and init them with value you want
     */
    constructor(value1, value2) {
        this.value1 = 'default'; // set default
        this.value1 = value1 || this.value1; // if value1 is passed in, use it, else use default

        this.value2 = value2; // if value2 is not supplied, this.value2 = undefined
    }

    /**
     * function: you don't need to use the key word function in front of your function
     * this function is public, and work like a public function in Java
     * @param {Number} param1 
     * @param {Number} param2
     * @returns {*} this.value1 + this.value2 + param1 + param2
     */
    myFunction(param1, param2) {
        return this.value1 + this.value2 + param1 + param2;
    }
}

module.exports = Template;
