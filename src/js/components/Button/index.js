import { createElement, render } from '@module/vDOM'
import '@style/test1.css'

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

export default Button