import * as MHU from './modules/core/index.js'
import { getNode, createElement, render } from './modules/DOM.js'

// MHU 멤버에서 하위 모듈 추출
const {
    logger: { success, error },
    tester: { test, expect },
    utils: { isFunction },
} = MHU

/* -------------------------------------------------------------------------- */

// 타이머 설정
window.setTimeout(() => {
    console.group('MODULE → 모듈 관리 상태')

    isFunction(getNode)
        ? success('의존성 모듈 관리에 문제가 없어 앱이 정상 작동합니다.')
        : error('의존성 모듈 관리에 문제가 있어 앱이 정상 작동하지 않습니다.')
})

/* -------------------------------------------------------------------------- */
// 테스트

test('createElement() 전달 속성', () => {
    const vNode = createElement('h3', { className: 'heading-3' }, 'TDD')

    expect(vNode.type).toBe('h3')
    expect(vNode.props.children).toBe('tdd')
})

/* -------------------------------------------------------------------------- */

// vNode 생성

const moduleLink = createElement(
    'a',
    {
        href: 'https://bit.ly/3brDMBS',
        rel: 'noopener noreferrer',
        target: '_blank',
        className: 'externalLink',
    },
    '모듈'
)

const cube = createElement('img', {
    className: 'cube',
    alt: '',
    src: './src/assets/cube.gif',
    height: 32,
})

const headline = createElement(
    'h1',
    { className: 'headline' },
    moduleLink,
    ' 관리',
    cube
)

const slogan = createElement(
    'p',
    { className: 'slogan' },
    '웹 브라우저 환경에서의 모듈 관리는 까다롭습니다.'
)

const container = createElement(
    'div',
    { className: 'container' },
    headline,
    slogan
)

/* -------------------------------------------------------------------------- */
// 렌더링

render(container, getNode('#root'))