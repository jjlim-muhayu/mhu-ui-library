import _ from 'lodash'

class MHU{
    constructor(){
        this.version = '0.1';
        this.author = 'jjlim@muhayu.com';
        this.name = '무하유 UI 코어';
    }
    init(){
        var a= _.flatten([1, [2, 3, [4]]]);
        var b= _.flatten([1, [2, 3, [4]]], true);
        var c = _.add([222,3333],100);
        console.log('init!!!',a,b,c )
    }
}

function component() {
    const element = document.createElement("div");

    element.innerHTML = "Hello World";

    return element;
}

document.body.appendChild(component());

