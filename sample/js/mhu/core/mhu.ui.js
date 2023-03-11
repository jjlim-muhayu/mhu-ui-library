class MhuUI {
    #loadingHolderClassName = 'MhuLoading-root';

    constructor(){
        this.uiName = 'common UI';
        
    }

    init(){
        console.log('init mhuUI!')
    }

    createLoadingHtml(){
        const html = document.createElement('div');
        html.setAttribute('class', 'MhuLoading-root');
        html.innerHTML ='<div class="MhuLoading-box"><div class="MhuLoading-box__inner"></div></div>';

        return html;
    }

    getLoadingClassName(){
        return this.#loadingHolderClassName;
    }

}

export {
    MhuUI
}