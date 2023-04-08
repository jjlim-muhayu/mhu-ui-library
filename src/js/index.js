import * as MHU from './modules/core/index.js';
import { getNode, createElement, render } from './modules/vDOM.js';
import realDom from './modules/DOM';
import renderIsland from '@jongjin/image';
import '@jongjin/es6plus';
import { Button, Button1 } from '@component/Button';
import { Person, hangulKong } from './ts/typescript';

// 타입스크립트 출력
let person = new Person('John', 30);
person.greet();
hangulKong(['땅콩', '아몬드', '피카추']);

// ES6
const myFunc1 = name => {
    return `TokTokHan ${name}`;
};
console.log(myFunc1('.dev'));

const myFunc2 = name => `TokTokHan ${name}`;
console.log(myFunc2('.dev')); // 출력 => 안녕 영희

const obj = {
    a: 10,
    b: 20,
};
const newObj = { ...obj };
console.log(newObj); // { a: 10, b: 20 }

const arr = [1, 2, 3];
const newArr = [...arr]; // [1, 2, 3]
console.log(newArr);

const foo = (a, b = 'b', c = 'c') => {
    console.log(a, b, c);
};

foo('a');

// nullish
let firstName = null;
let lastName = null;
let nickName = '바이올렛';

// null이나 undefined가 아닌 첫 번째 피연산자
console.log('nullish==>', firstName ?? lastName ?? nickName ?? '익명의 사용자'); // 바이올렛

const myDom = new realDom({ name: 'jongjin' });
myDom.getSelector('.select-test');
myDom.addClass('myAClass12345 jongjin');
setTimeout(() => myDom.removeClass('myAClass12345 jongjin'), 3000);
myDom.showName();
myDom.append(
    '<div>어쩌고 <span>소규모 사업장</span>저쩌고</div>',
    '.test-append',
);

const secondDom = new realDom({ name: 'mothers' });
secondDom.getSelector('a');
secondDom.showName();
secondDom.append(
    'div#firstLevelId.firstClass0.firstClass1>small>div.myClass.secondClass#idName>p#myId>정말 쉽게 넣기',
    'a',
);
// secondDom.addEvent('click', function(e){
//     e.preventDefault();
//     console.log('a태그 클릭하다....')
//     secondDom.toggleClass('myClassToggle')
// })
import '../css/test2.css';

// MHU 멤버에서 하위 모듈 추출
const {
    logger: { success, error },
    tester: { test, expect },
    utils: { isFunction },
} = MHU;

/* -------------------------------------------------------------------------- */

// 타이머 설정
window.setTimeout(() => {
    console.group('MODULE → 모듈 관리 상태');

    isFunction(getNode)
        ? success('의존성 모듈 관리에 문제가 없어 앱이 정상 작동합니다.')
        : error('의존성 모듈 관리에 문제가 있어 앱이 정상 작동하지 않습니다.');
});

/* -------------------------------------------------------------------------- */
// 테스트

test('createElement() 전달 속성', () => {
    const vNode = createElement('h3', { className: 'heading-3' }, 'TDD');

    expect(vNode.type).toBe('h3');
    expect(vNode.props.children).toBe('tdd');
});

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
    '모듈',
);

const cube = createElement('img', {
    className: 'cube',
    alt: '',
    src: './src/assets/cube.gif',
    height: 32,
});

const headline = createElement(
    'h1',
    { className: 'headline' },
    moduleLink,
    ' 관리',
    cube,
);

const slogan = createElement(
    'p',
    { className: 'slogan' },
    '웹 브라우저 환경에서의 모듈 관리는 까다롭습니다.',
);

const container = createElement(
    'div',
    { className: 'container' },
    headline,
    slogan,
);

// Button 컴포넌트 인스턴스 생성
const button = new Button(
    {
        className: 'button',
        onClick(e) {
            success('Button 컴포넌트의 인스턴스를 클릭했습니다.');
        },
    },
    'Button 컴포넌트',
);
const btnRootNode = getNode('.atag');
button.render(btnRootNode);

const button1 = new Button1(
    {
        className: 'othersButton',
    },
    'Button 컴포넌트의 다른 타입',
);
const btnRootNode1 = getNode('.atag');
button1.render(btnRootNode1);

/* -------------------------------------------------------------------------- */
// 렌더링

//render(container, getNode('#root'))
render(renderIsland(), getNode('#image-holder'));
