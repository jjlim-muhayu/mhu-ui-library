import { MhuEvent, GlobalVars, GlobalEvent } from './mhu.js';
import {Throttle, Debounce }  from './mhu.ui.utils.js';

class ScrollEvent extends MhuEvent{
    #isInit = false;
    #prevScrollTop = 0;
    #scrollTop = 0;
    #scrollBottom = 0;
    #scrollDirection='';

    constructor(cb, target ){
        super();
        this.target = typeof target === 'object' ? target : window;
        this.callback =  cb;
        this.init();
    }

    init(){
        console.log('init scroll!')
        this.addEvent();
    }

    initEvent(){
        this.#isInit = true;
    }

    wrapEvent = () => {
		this.onScroll();
	}

    addEvent(){
        this.target.addEventListener('scroll', this.wrapEvent);
    }
    removeEvent(){
        this.target.removeEventListener('scroll', this.wrapEvent);
    }

    onScroll(e){
        if(this.#isInit){
            this.setScrollInfo();
        } 
       if(typeof this.callback === 'function') this.callback();
    }

    setScrollInfo(){
        this.#prevScrollTop = this.#scrollTop;

        const doc = document.documentElement;
        const top =  (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
        const left = (window.pageXOffset || doc.scrollLeft)  - (doc.clientLeft || 0);
        const bottom = top + GlobalVars.WindowInfo.height;

        GlobalVars.ScrollInfo.top = this.#scrollTop = top;
        GlobalVars.ScrollInfo.bottom = this.#scrollBottom = bottom;

        this.scrollMoveDirection();
    }

    scrollMoveDirection(){
        //console.log('이전',  this.#prevScrollTop, this.#scrollTop, )
        // up & down
        if( this.#prevScrollTop -  this.#scrollTop > 0){
            this.#scrollDirection = 'up';
        } else if (this.#prevScrollTop - this.#scrollTop < 0){
            this.#scrollDirection = 'down';
        }

        GlobalVars.ScrollInfo.direction = this.#scrollDirection;
    }

    destroy(){
        this.removeEvent();
    }
}

export {
    ScrollEvent
}