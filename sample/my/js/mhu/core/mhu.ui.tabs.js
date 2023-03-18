import { MhuUI } from './mhu.ui.js';

class TabUI extends MhuUI{
    // 내부변수
    #tabPanelIdArr = [];
    #activateTabIndex = '';
    #isUseSinglePanel = false;
    #loadingHolder= '';
    #hasLoadingHtml = false;

    #privateVar = '은닉변수'

    constructor(selector, options){
        super();
        this.uiName = 'TabUI';
        this.selector = selector;
        this.options = {
            selected : !options.selected ? 0 : options.selected,
            useSinglePanel: !options.useSinglePanel ? false : options.useSinglePanel,
            callback: options.callback
        }

        // 기본 설정
        this.tabUI = '';
        this.tabMenu = '';
        this.tabNavClassName = 'mhuTabNav-root';
        this.tabNavLinkClassName = 'mhuTabNav-list__link';
        this.tabPanelClassName = 'mhuTabContent-panel';
        this.activePanelClassName = 'mhuState-active';
        this.freezingClassName = 'mhuState-loading';

        this.#isUseSinglePanel = this.options.useSinglePanel;
        
        // 실행
        this.init();
    }

    getName(){
        return this.#privateVar;
    }

    init(){
        console.log('init TabUI!')
        this.assignDomItems(this.selector);
        this.defineTabMenuInfo();
        
        if(!this.#isUseSinglePanel) this.defineTabContentPanelInfo();
        this.addEvent();
    }

    defineTabMenuInfo(){
        this.tabMenu.querySelectorAll('.' + this.tabNavLinkClassName).forEach((item, index) => {
            item.dataset.itemIndex = index;
            const itemHashValue = `tab-item-${index}`; 
            item.href= `#${itemHashValue}`;
            this.#tabPanelIdArr.push(itemHashValue)
        });
    }

    defineTabContentPanelInfo(){
        this.tabUI.querySelectorAll('.' + this.tabPanelClassName).forEach((item, index) => {
            item.id=this.#tabPanelIdArr[index];
        });
    }

    assignDomItems(selector){
        this.tabUI = selector;
        this.tabMenu = this.tabUI.querySelector('.' + this.tabNavClassName);
    }

    addEvent(){
        // this.tabMenu.addEventListener('click', this.onClickDeligation);
        this.tabMenu.onclick = this.onClickDeligation.bind(this);
        this.tabMenu.querySelector(`[data-item-index="${ this.options.selected }"]`).dispatchEvent(new Event('click', { 'bubbles': true })); // 활성화고자하는 버튼 트리거
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Event handler
    onClickDeligation(e){
        e.preventDefault();
        let elem = e.target;
        while(!elem.classList.contains(this.tabNavLinkClassName)){
            elem = elem.parentElement;
            if(elem.parentElement.nodeName === 'BODY') {
                elem = null;
                return false;
            }
        }
        
        // 버튼 클릭 핸들러
        if(elem.classList.contains(this.tabNavLinkClassName)){
            this.#activateTabIndex = elem.dataset.itemIndex;
            this.changeTabMenu(elem);
        }
    }

    changeTabMenu(elem) {
        const activeItem = this.tabUI.querySelectorAll('.' + this.activePanelClassName);
        if(activeItem.length){
            activeItem.forEach(item => {
                item.classList.remove(this.activePanelClassName);
            })
        }

        elem.classList.add(this.activePanelClassName);
        // 싱글 홀더 사용은 옵션에 따라 작동
        if(!this.#isUseSinglePanel) document.querySelector(elem.hash).classList.add(this.activePanelClassName);
        else this.callbackFn(this.tabUI.querySelector('.' + this.tabPanelClassName));
    }   
    
    // callback
    callbackFn(panel){
        this.options.callback({index: this.#activateTabIndex, panel: panel, self: this});
    }

    // 로딩하는 동안 UI Freezing
    freeze(){
       if(!this.tabUI.classList.contains(this.freezingClassName)) this.tabUI.classList.add(this.freezingClassName)
    }

    unfreeze(){
        if(this.tabUI.classList.contains(this.freezingClassName)) this.tabUI.classList.remove(this.freezingClassName)
    }

    // 로딩 표시
    showLoading(){
        if(!this.#hasLoadingHtml){
            this.tabUI.appendChild(this.createLoadingHtml());
            this.#loadingHolder = this.tabUI.querySelector('.' + this.getLoadingClassName());
            this.#hasLoadingHtml = true;
        }
        this.#loadingHolder.style = 'display:block;';
    }

    hideLoading(){
        this.#loadingHolder.style = 'display:none;';
    }
}

export default TabUI;