import { MhuEvent, GlobalVars, GlobalEvent } from './mhu.js';

class LoadEvent extends MhuEvent{
    constructor(cb){
        super();
        this.callback = cb;
        this.init();
    }

    init(){
        this.addEvent();
    }

    addEvent(){
        window.addEventListener('load', ()=>{
            console.log('this load!!')

        })
    }
}

export { LoadEvent };