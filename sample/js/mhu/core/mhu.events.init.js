import { ResizeEvent, ScrollEvent } from './mhu.events.js';

(()=>{
    const initResize = new ResizeEvent();
    initResize.initEvent();
    const initScroll = new ScrollEvent();
    initScroll.initEvent();

    const triggerResize = new Event('resize')
    window.dispatchEvent(triggerResize);
    const triggerScroll = new Event('scroll')
    window.dispatchEvent(triggerScroll);
})();