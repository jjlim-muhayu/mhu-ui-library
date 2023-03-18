// 주기적 함수 발생: resize, scroll
const Throttle = (fn, limit = 100) => {
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

// 일정시간 지난후 함수 발생
const Debounce = (fn, wait) => {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, arguments), (wait || 1));
    }
};

// eventDeligation
const eventDeligation = (target, condition) => {
    let elem = target;
    while(elem.nodeName.toLowerCase() !== condition){
        console.log('condition', elem.nodeName)
        elem = elem.parentElement;
        if(elem.parentElement.nodeName === 'BODY') {
            elem = null;
            return false;
        }
    }

    return elem;
}

const checkBoundary = (sector, owner) => {
    console.log('boundaryCheck')
    let matrixValue = [0,0];
    const target = document.querySelector('.type-3')
    const targetDropdown = target.querySelector('.dropdown-box')
    const boundary = document.querySelector('.boundary');
    const showConsole = document.querySelector('.dom-info .info');

    const dragdrop = document.querySelector('.draggable-item');
    const targetBoxInfo = target.getBoundingClientRect();
    const targetDropdownInfo = targetDropdown.getBoundingClientRect();
    const boudaryBoxInfo = boundary.getBoundingClientRect();
    console.log(
        showConsole,
        'boxInfo', targetBoxInfo, boudaryBoxInfo,
    )

    function init(){
        const dragdropBox = getComputedStyle(dragdrop);
        matrixValue = [dragdropBox.getPropertyValue('left').replace('px',''),dragdropBox.getPropertyValue('top').replace('px','')]
    }

    init();

    function setPopPosition(){
        const scrolledTopLength = window.pageYOffset; // 스크롤된 길이//
        // const absoluteTop = scrolledTopLength + relativeTop; // 절대좌표
        console.log('setPopPosition 스크롤된 길이:', scrolledTopLength)
        
        document.querySelectorAll('.dropdown-box').forEach((item, index) => {
            const parent = item.parentElement;
            parent.id = 'dropdown-'+ index;
            const parentInfo = parent.getBoundingClientRect();
            const itemInfo = item.getBoundingClientRect();
            const cloneNode = item.cloneNode();
            cloneNode.id= parent.id + '-option';
            cloneNode.classList.add('cloned-node');
            cloneNode.style= `top:${scrolledTopLength + parentInfo.height + parentInfo.top}px; left:${parentInfo.left}px; width: ${parentInfo.width}px; height: ${itemInfo.height}px;`;
            item.style = 'display:none';
            document.body.appendChild(cloneNode);
            
            const itemBtmPos = document.querySelector('#'+cloneNode.id).getBoundingClientRect();
            console.log('pop', itemBtmPos)
            
            // if(itemBtmPos.bottom > window.innerHeight){
            //     console.log('방향전환되는 아이템 ID:' + cloneNode.id, )
            //     cloneNode.style.height = `${itemBtmPos.height - (itemBtmPos.bottom - window.innerHeight)}px`
            // }
        })

        
    }

    window.addEventListener('resize', function(){
        document.querySelectorAll('.cloned-node').forEach((item, index) => {
            const itemBoxInfo = item.getBoundingClientRect();
            if(itemBoxInfo.bottom > window.innerHeight){
                console.log('방향전환되는 아이템 ID:' + item.id, itemBoxInfo, window.innerHeight, itemBoxInfo.bottom - window.innerHeight)
                item.style.top = `${itemBoxInfo.top - (itemBoxInfo.bottom - window.innerHeight)}px`
            }
        })
    })

    console.log('bodyH', window.innerHeight)

    document.querySelector('#btnSetPop').addEventListener('click', setPopPosition );

    ////////////////////////////////////////////////////////
    const onMouseMoveHandler = (e)=>{
        console.log('mousemove!!!!!')
        if(boundary.querySelector('.is-drag')){
            dragdrop.style=`left:0; top:0; transform:translate3d(${e.layerX - 5 > 0 ? e.layerX - 5 : 0}px, ${e.layerY - 5 > 0 ? e.layerY - 5 : 0}px, 0)`;
        }
    }
    dragdrop.addEventListener('mousedown', ()=>{
        console.log('mousedown!')
        if(!dragdrop.classList.contains('is-drag')){
            dragdrop.classList.add('is-drag')
            dragdrop.style=`left:0; top:0; transform:translate3d(${matrixValue[0]}px, ${matrixValue[1]}px, 0)`;
            boundary.addEventListener('mousemove', onMouseMoveHandler)

            document.addEventListener('mouseup', onMouseUp)
        }
    })

    const onMouseUp = (e)=>{
        console.log('mouseup!')
        if(dragdrop.classList.contains('is-drag')){
            dragdrop.classList.remove('is-drag')
            matrixValue = dragdrop.style.transform.match(/(\d+)px/g).join().replace(/px/g,'').split(',');
            console.log('style', matrixValue)
            dragdrop.style=`left:${matrixValue[0] > 0 ? matrixValue[0] : 0}px; top:${matrixValue[1] > 0 ? matrixValue[1] : 0}px`;

            boundary.removeEventListener('mousemove',onMouseMoveHandler)

            document.removeEventListener('mouseup', onMouseUp)
        }
    }
    dragdrop.addEventListener('mouseup', onMouseUp);
    
    //boundary.addEventListener('mouseleave', onMouseUp)

    


    
    

    showConsole.innerHTML = `
        <b>TargetBoudingInfo <span>${target.querySelector('.btn').innerText}</span>:</b> ${JSON.stringify(targetBoxInfo)}
        <b>targetDropdownInfo:</b> ${JSON.stringify(targetDropdownInfo)}
        <b>BoundaryBoudingInfo:</b> ${JSON.stringify(boudaryBoxInfo)}
        <b>WindowInfo:</b> width: ${window.innerWidth} / 
        height: ${window.innerHeight}
    `
    if(targetDropdownInfo.bottom > boudaryBoxInfo.bottom * 0.9){
        console.log('위치 변경!') 
    }

}

export {
    Throttle,
    Debounce,
    eventDeligation,
    checkBoundary
}