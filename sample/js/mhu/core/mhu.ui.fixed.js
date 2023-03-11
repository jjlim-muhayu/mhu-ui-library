import {MhuEvent, GlobalVars, GlobalEvent } from './mhu.js';
import {Throttle, Debounce }  from './mhu.ui.utils.js';
import { ResizeEvent, ScrollEvent } from './mhu.events.js';
import { MhuUI } from './mhu.ui.js';

class FixedUI extends MhuUI{
    #fixedClassName = 'fixed-top';

    constructor(selector){
        super();
        this.selector = selector;
        this.uiName = 'FixedUI';
        this.init();
    }

    init(){
        console.log('init FixedUI', this.selector)
        this.addEvent();
    }

    addEvent(){
        // const fixedScroll = new ScrollEvent(this.fixedHander);
        // fixedScroll.init();
        this.fixedHander();

        // window.addEventListener('scroll', this.fixedHander.bind(this));
        // wiwndow.addEventListener('scroll', Throttle(()=> console.log('fixedScrollTes => throttle')))
    }

    fixedHander(){
        console.log('fixedScrollTest')
    }
    

    /*
(function (ns, $, undefined) {
    const ScrollEvents = (function () {
        let gnbArea, tabWrapper, tabMenu, contactToggle;
        let winWidth = 0; let winHeight = 0;
        let scrollTop = 0;
        let scrollBottom = 0;
        let offsetTopTabSection = 0;
        let fixedClassName = 'fixed-top';
        let hasTabs = false;
        let callback;

        let gnbH = 88;
        let gnbTop = 0;
        let motionEndItem = 0;
        let fixedTab = false;
        let offsetTopGap;

        let scrollDirection = {};
        let prevScrollTop = 0;

        let _init = function (cb) {
            _getItemSelect();
            _setItemsOffsetValue();
            _addEvent();
            if (typeof cb === 'function') callback = cb;
        }

        const _getItemSelect = function () {
            gnbArea = $('#el-header .header__inner');
            hasTabs = $('.tabs-wrapper').length > 0;
            if(hasTabs){
                tabWrapper = $('.tabs-wrapper')
                tabMenu = tabWrapper.find('.nav-tabs-list');
                offsetTopTabSection = Number(tabWrapper.offset().top);
            }
            contactToggle = $('#float-quick-menu');
        }

        const _addEvent = function () {
            _onResize();

            window.addEventListener('resize', _onResize)
            window.addEventListener('scroll', _onScroll)
        }

        const _throttle = function(fn, limit = 100) {
            let waiting = false
            return function() {
                if(!waiting) {
                    fn.apply(this, arguments)
                    waiting = true
                    setTimeout(() => {
                        waiting = false
                    }, limit)
                }
            }
        }

        const _debounce = function (fn, wait) {
            let timeout;
            return function () {
                clearTimeout(timeout);
                timeout = setTimeout(() => fn.apply(this, arguments), (wait || 1));
            }
        };

        const _onResize = function () {
            window.GlobalVars.WindowInfo.width = winWidth = (window.innerWidth || document.documentElement.clientWidth);
            window.GlobalVars.WindowInfo.height =  winHeight = (window.innerHeight || document.documentElement.clientHeight);

            $(window.GlobalEvent).trigger(window.GlobalEvent.RESIZE,{width:winWidth, height:winHeight});

            _onScroll();
        }

        const _onScroll = function(){
            prevScrollTop = scrollTop;

            const doc = document.documentElement;
            const top = window.GlobalVars.WindowInfo.top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
            const left = (window.pageXOffset || doc.scrollLeft)  - (doc.clientLeft || 0);
            const bottom =  scrollBottom = top + winHeight;

            window.GlobalVars.getScrollTop = scrollTop = top

            $(window.GlobalEvent).trigger(window.GlobalEvent.SCROLL,{top:top, left:left, bottom: bottom});

            _scrollMoveDirection();

            _fixedTop();
            _fixedQuickMenu();
            _scrollAnimation();
        };

        const _scrollMoveDirection = function(){
            // console.log('이전',  prevScrollTop, scrollTop, )
            // up & down
            if(prevScrollTop - scrollTop > 0){
                scrollDirection.top = 'up';
            } else if (prevScrollTop - scrollTop < 0){
                scrollDirection.top = 'down';
            }

            window.GlobalVars.scrollDirection = scrollDirection;
        }

        const _setItemsOffsetValue = function(){
            gnbTop = gnbArea.offset().top;
        }

        const _toggleShowHideScrollItem = function(target){
            const className = 'scroll-top-hidden';
            let isHidden = target.hasClass(className)
            console.log('scroll dir:', scrollDirection.top, isHidden)
            if(scrollDirection.top === 'up'){
                console.log('nav hide')
                if(!isHidden) {
                    target.addClass(className);
                }
            }else{
                if(isHidden) target.removeClass(className);
                console.log('nav show')
            }
        }

        const _fixedTop = function(){
            if (scrollTop > gnbTop) {
                //_toggleShowHideScrollItem(gnbArea);
                if (!gnbArea.hasClass(fixedClassName)) gnbArea.addClass(fixedClassName);

                if(hasTabs){
                    let tabSectionBottom = offsetTopTabSection + tabWrapper.height();
                    //console.log('tabSection', scrollTop, offsetTopTabSection, tabSectionBottom)
                    if (scrollTop >= offsetTopTabSection - gnbH && scrollTop <= tabSectionBottom) {
                        offsetTopGap = offsetTopTabSection - scrollTop;
                        //console.log('into ==>', offsetTopGap, offsetTopTabSection, tabSectionBottom, scrollTop, scrollBottom)

                        if (offsetTopGap >= 0 && offsetTopGap <= gnbH) gnbArea.css('transform', `translateY(${offsetTopGap - gnbH}px)`)

                        if (scrollTop >= offsetTopTabSection && scrollTop <= tabSectionBottom -  tabMenu.height()) {
                            if(!fixedTab) {
                                tabMenu.addClass(fixedClassName);
                                fixedTab = true;
                                //console.log('tab fixed',)
                                gnbArea.css('transform', `translateY(${gnbH * -1}px)`)
                            }
                        } else {
                            //console.log('Tab none fixed ')
                            if(fixedTab){
                                tabMenu.removeClass(fixedClassName);
                                gnbArea.removeAttr('style');
                            }
                            tabMenu.removeAttr('style');
                            fixedTab = false;
                        }
                    } else {
                        if(fixedTab) tabMenu.removeClass(fixedClassName);
                        gnbArea.removeAttr('style');
                        offsetTopGap = (offsetTopTabSection - gnbTop) - scrollTop;
                        //console.log('offsetTopBap', scrollTop, scrollBottom, tabSectionBottom, offsetTopTabSection)
                        if (fixedTab && scrollTop >= tabSectionBottom - gnbTop) {
                            tabMenu.fadeOut(function(){
                                tabMenu.removeClass(fixedClassName);
                                tabMenu.removeAttr('style');
                            });
                            fixedTab = false;
                        }
                        // console.log('scroll info ==>', scrollTop, tabSectionBottom, offsetTopGap)
                    }
                }

            } else {
                gnbArea.removeClass(fixedClassName);
                gnbArea.removeAttr('style');
            }
        };


        return {
            init: _init,
        }
    })()

    ns.scrollEvent = ScrollEvents;

}(window.MHU.utils || {}, jQuery));


jQuery(function() {
//tab ui
});

jQuery(function () {
    let callback = function () {
        console.log('callback function')
    }
    window.MHU.utils.scrollEvent.init();
})
 */
}

export default FixedUI;