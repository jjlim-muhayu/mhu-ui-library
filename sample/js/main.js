import { GlobalVars, GlobalEvent, MHU } from './mhu/core/mhu.js';
import { ResizeEvent, ScrollEvent } from './mhu/core/mhu.events.js';
import { checkBoundary }  from './mhu/core/mhu.ui.utils.js';
import FixedUI  from './mhu/core/mhu.ui.fixed.js';

//plugin
import mhuSlide from './mhu/plugins/slide/mhu.cp.slide.js';

const targetTabEl = document.querySelector('#mhu-tab-ui');


const scrollHandler_1 = ()=>{
    console.log('첫번째 스크롤 핸들러입니다.')
}

const scrollHandler_2 = ()=>{
    setTimeout(()=>{
        scroll_1.destroy();
        console.log('두번째 스크롤 핸들러입니다.')
    },10)
}

window.motionEndItem = 0;
const scrollAnimation = function(){
    const motionItems = document.querySelectorAll('.motion');
    console.log('scrollAnimation')
    
    if ( window.motionEndItem <= motionItems.length - 1) {
        motionItems.forEach((item,index) => {
            //console.log('scrollAnimation', window.motionEndItem, motionItems.length)
            //let itemOffsetTop = $(this).offset().top;
            //$(this).removeClass('animate');
            // if (!$(this).hasClass('animate') && scrollTop + winHeight / 2 * 1.4 >= itemOffsetTop && scrollTop < itemOffsetTop + 200) {
            //     $(this).addClass('animate');
                window.motionEndItem++;
            // }
        })

    }
}

const contactToggle = document.querySelector('#contact-area');
const fixedQuickMenu = function(){
    console.log('fixedQuickMenu')
    const scrollTop = GlobalVars.ScrollInfo.top;
    const winHeight = GlobalVars.WindowInfo.height;
    if (scrollTop > winHeight / 3) {
        if (contactToggle.classList.contains('hidden')) contactToggle.classList.remove('hidden');
    } else {
        if (!contactToggle.classList.contains('hidden')) contactToggle.classList.add('hidden');
    }
}


// const scroll_1 = new ScrollEvent(scrollHandler_1);
// const scroll_2 = new ScrollEvent(scrollHandler_2);
// const scroll_3 = new ScrollEvent(scrollAnimation);
// const scroll_4 = new ScrollEvent(fixedQuickMenu);

//const triggerScroll = new Event('scroll')

const ResizeHander1 = ()=>{
    console.log('main ResizeEvent ==> first ResizeEvent!')
    window.dispatchEvent(triggerScroll);
}
//const resize_1 = new ResizeEvent(ResizeHander1);

const ResizeHander2 = ()=>{
    console.log('main ResizeEvent ==> second ResizeEvent!')
}
//const resize_2 = new ResizeEvent(ResizeHander2);

const ResizeHander3 = ()=>{
    console.log('main ResizeEvent ==> third ResizeEvent!')
}
//const resize_3 = new ResizeEvent(ResizeHander3);


// 고정형 UI
const targetGnbEl = document.querySelector('#gnb');
//const gnbFixed = new FixedUI(targetGnbEl);
//const tabFixed = new FixedUI(targetTabEl);

window.addEventListener('resize',()=>{
    //console.log('main Resize1!', GlobalVars.WindowInfo)
})
window.addEventListener('resize',()=>{
    //console.log('main Resize2!', GlobalVars.WindowInfo)
})

window.addEventListener('scroll',()=>{
   // console.log('main Scroll!', GlobalVars.ScrollInfo)
})

//console.log('Main init', GlobalVars.WindowInfo, GlobalVars.ScrollInfo)


document.querySelector('.test').onclick = function(){
    window.open('http://127.0.0.1:5500/', 400, 400, true)
}
// setTimeout(()=>{
//     console.log('resize Test')
//     window.resizeTo(
//         window.screen.availWidth / 2,
//         window.screen.availHeight / 2
//     );
// },1000)

checkBoundary();

//slide
const mySlide = new mhuSlide();
mySlide.play();




