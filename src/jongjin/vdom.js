let vdom = {
    tag: "div",
    props: { class: 'contents' },
    children: [
        {
            tag: "p",
            children: "Text here"
        },
        {
            tag: "p",
            children: ["Some other ", { tag: "b", children: "Bold" }, " content"]
        }

    ]
}


// mount
function mount(vnode, container) {
    const element = (vnode.element = document.createElement(vnode.tag))
    console.log('element', vnode, vnode.children, container)

    Object.entries(vnode.props || {}).forEach(([key, value]) => {
        element.setAttribute(key, value)
    })

    /*
    children 마운트
    2가지의 경우의 수가 있습니다.
    - children이 단순 text인 겨우
    - children이 vnode 배열인 경우
    */

    if (typeof vnode.children === 'string') {
        element.textContent = vnode.children
    } else {
        vnode.children.forEach(child => {
            mount(child, element) // 재귀적으로 children을 마운트합니다
        })
    }

    container.appendChild(element)
}

// unmount
function unmount(vnode) {
    vnode.element.parentNode.removeChild(vnode.element)
}

function patch(VNode1, VNode2) {
    // 부모 DOM 엘리먼트를 할당합니다.
    const element = (VNode2.element = VNode1.element)

    // 이제 두 vnode의 차이점을 체크합니다.

    // 만약 노드들의 태그가 다르다면, 전체 내용이 변경되었다고 가정합니다.

    if (VNode1.tag !== VNode2.tag) {
        //console.log('태그가 다를때')
        // 기존 노드를 언마운트하고 새로운 노드를 마운트 합니다.
        mount(VNode2.element.parentNode)
        unmount(VNode1)
    } else {
        //console.log('자식 노드들이 다를때')
        // 노드가 같은 태그일 때, 두 가지 비교가 남아있습니다.
        // - Props
        // - Children
        // props 체크는 현재 하지않겠습니다. 핵심에서 벗어난 내용이라 다음에 글을 쓴다면 해당 내용을 포함시키도록 하겠습니다.

        // Checking the children
        // 새로운 노드의 children이 string인 경우
        if (typeof VNode2.children == "string") {
            console.log('child가 문자열', element, element.textContent, VNode2.children)
            // children이 **엄격히** 다른 경우
            if (VNode2.children !== VNode1.children) {
                element.textContent = VNode2.children;
            }
        } else {
            console.log('child가 배열')
            // 만일 새로운 노드가 children 배열인 경우
            // - children 배열의 크기가 같은 경우
            // - 기존의 노드가 새로운 노드보다 children 배열의 크기가 더 큰 경우
            // - 새로운 노드가 기존의 노드보다 children 배열의 크기가 더 큰 경우

            // 배열의 크기 찾기
            const children1 = VNode1.children;
            const children2 = VNode2.children;
            const commonLen = Math.min(children1.length, children2.length);
console.log('노드간 child 비교하여 최소 ', commonLen)
            // 재귀적으로 공통 children 패칭하기
            for (let i = 0; i < commonLen; i++) {
                patch(children1[i], children2[i])
            }
console.log('1111')
            // 새로운 노드가 더 적은 children을 가질 때,
            if (children1.length > children2.length) {
                children1.slice(children2.length).forEach(child => {
                    console.log('새로운노드가 적을때', child, element)
                    unmount(child)
                })
            }

            // 새로운 노드가 더 많은 children을 가질 때,
            if (children2.length > children1.length) {
                console.log('aaaa',children2.slice(children1.length))
                children2.slice(children1.length).forEach(child => {
                    console.log('새로운노드가 많을때', child, element)
                    mount(child, element)
                })
            }
        }
    }
}

// Vue 혹은 다른곳에서는 이 함수를 h 라고 부릅니다. (hyperscript)
// hypertext를 javascript 객체로 바꾸어줍니다.
function createVNode(tag, props = {}, children = []) {
    return { tag, props, children}
}

function generateList(list) {
    let children = list.map(child => createVNode("li", null, child));
    return createVNode("ul", { class: 'fruits-ul' }, children)
}

let list = generateList(["apple", "banana", "orange"]);
mount(list, document.querySelector("#app"))

// Later
//****************
setTimeout(() => patch(list, generateList(["apple", "banana",'김복동', "pineapple changed"])), 1000)