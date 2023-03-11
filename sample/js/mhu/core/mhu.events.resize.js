import { MhuEvent, GlobalVars } from './mhu.js';

class ResizeEvent extends MhuEvent{
    #isInit = false;
    constructor(cb, target){
        super();
        this.target = typeof target === 'object' ? target : window;
        this.callback = cb;
        this.init();
    }

    init(){
        console.log('init resize!')
        this.addEvent();
    }

    initEvent(){
        this.#isInit = true;
    }

    wrapEvent = () => {
		this.onResize();
	}

    addEvent(){
        this.target.addEventListener('resize', this.wrapEvent);
    }
    removeEvent(){
        this.target.removeEventListener('resize', this.wrapEvent);
    }

    onResize(){
        if(this.#isInit){
            GlobalVars.WindowInfo = {
                width: window.innerWidth,
                height: window.innerHeight,
            }
        }

        if(typeof this.callback === 'function') this.callback();

        
    }

    destroy(){
        this.removeEvent();
    }
}

export {
    ResizeEvent
}