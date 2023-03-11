import {eventDeligation} from '../../core/mhu.ui.utils.js';

class mhuSlide{
    #prevIndex = 0;
    #currentIndex = 0;
    #slidePanelWrapperClassName = '.mhuSlide-panels'; 
    #slidePanelClassName = '.mhuSlide-panel'; 
    #slideControlClassName = '.mhuSlide-control';
    #slidePaginateClassName = '.mhuSlide-pagination';
    constructor(selector, options){
        this.selector = selector? selector : '.mhuSlide-root' ;
        this.options = this.options;
        this.init();
    }
    init(){
        console.log('slide init')
        this.setSlide();
        this.addEvent();
    }
    get data(){
         return this.selector;
    }
    set data(value){
        this.selector = value;
    }

    setSlide(){
        this.domSlide = document.querySelector(this.selector);
        this.slidePanelWrap = this.domSlide.querySelector(`${this.#slidePanelWrapperClassName}`);
        this.slidePanelItems = this.domSlide.querySelectorAll(`${this.#slidePanelClassName}`);
        this.controlDirection = this.domSlide.querySelector(this.#slideControlClassName)
        this.pagination = this.domSlide.querySelector(this.#slidePaginateClassName);

        this.createPagenate();
    }
    defineSelctor(){

    }
    defineOption(){

    }
    gotoAction(){

    }
    prevIndex(){

    }
    nextIndex(){

    }
    changePanel(){

    }

    createPagenate(){
        let pagenateHtml = '';
        this.slidePanelItems.forEach((element, index) => {
            pagenateHtml += `<button class="mhuSlide-pagination-bullet" 
            data-page-index="${index}"
            type="button"><span>${index + 1}</span></button>`
        });
        this.pagination.innerHTML = pagenateHtml;
    }
    /////////////////////////////////////////////////////////////
    // evemts

    addEvent(){
        this.controlDirection.addEventListener('click', this.onClickPrevNext);

        this.pagination.addEventListener('click', this.onClickSlidePaginate);
    }

    /////////////////////////////////////////////////////////////
    // methods

    onClickPrevNext(e){
        const clickedTarget = eventDeligation(e.target, 'button').classList[0].split('__')[1];
        console.log('onClickPrevNext', clickedTarget)
    }

    onClickSlidePaginate(e){
        const clickedTarget = eventDeligation(e.target, 'button').dataset.pageIndex;
        console.log('onClickslidePaginate', clickedTarget)
    }

    play(){
        console.log('slide play')
        console.log('this.domSlide', this.domSlide, this.controlDirection, this.paginate)
    }

    
}

export default mhuSlide;