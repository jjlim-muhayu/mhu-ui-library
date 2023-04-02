import { createElement, render } from '@module/vDOM'
import '@style/test1.css'
import '../../../scss/index.scss';

/* -------------------------------------------------------------------------- */

class Button {
    constructor(props, children) {
        this.props = { ...props }
        this.children = children
    }

    render(domNode = document.body) {
        const buttonNode = createElement('button', this.props, this.children)
        render(buttonNode, domNode)
    }
}

class Button1 {
    constructor(props, children) {
        this.props = { ...props }
        this.children = children
    }

    // ES 표준에 제안된 정적 클래스 속성 구문
    static defaultProps = {
        type: 'button',
    }

    render(domNode = document.body) {
        // 속성 병합(mixins)
        const buttonNode = createElement('button', {
            ...this.defaultProps,
            ...this.props,
        },this.children)
        render(buttonNode, domNode)
    }
}

export {
    Button, Button1,
}
