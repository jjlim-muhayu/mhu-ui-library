class realDom{
    constructor(props){
        this.props = { ...props }
        this.selector = null;
    }
    getSelector(selector){
        this.selector = document.querySelector(selector);
    }
    addClass(classList){
        console.log('공백체크', )
        if(/\s/.test(classList)){
            classList.split(' ').forEach(classname => this.selector.classList.add(classname))
        } else{
            this.selector.classList.add(classList)
        }
    }
    removeClass(classList){
        if(/\s/.test(classList)){
            classList.split(' ').forEach(classname => this.selector.classList.remove(classname))
        } else{
            this.selector.classList.remove(classList)
        }
    }
    toggleClass(classList){
        if(/\s/.test(classList)){
            classList.split(' ').forEach(classname => this.selector.classList.toggle(classname))
        } else{
            this.selector.classList.toggle(classList)
        }
    }
    addEvent(type, handler){
        this.selector.addEventListener(type, handler)
    }
    append(source, target){
        const tagReg = /<[^>]*>/gi;
        const isTagSource = tagReg.test(source)
        console.log('child=>', isTagSource, source)
        let sourceTag;
        if(isTagSource){
            console.log(':: 태그형식')

            const domParser = new DOMParser();
            sourceTag = domParser.parseFromString(source, 'text/xml').children[0];
        }else{
            const fragment = new DocumentFragment();
            // sourceTag = fragment.appendChild(source);
            const nodeArr = source.split('>')
            const tagArr = nodeArr.splice(0, nodeArr.length-1);
            tagArr.reduce((pre, acc, index) => {
                const tagIdClass = [];
                const isIdClass = (/\.|#/).test(acc);
                //if(/(\.)|(#)/.test(acc)){
                    let str = 'div#firstLevelId.firstClass0.firstClass1>div.myClass.secondClass#idName>p#myId>h1.hClass>h2.sub.second > 얼렁뚱땅 넣기'
                    str = str.replace(/\s/g,'').split('>')



                    function sliceClassId(str){
                        const temp = {};
                        if(/#/.test(str)){
                            if(str.match(/#/).index === 0){
                                temp.id= str.slice(1, /\./.test(str) ? str.indexOf('.') : str.length)
                                temp.class = (/\./.test(str)) ? str.slice(str.indexOf('.')).split('.').slice(1).join(' ') : '';
                                console.log('id가 0번째 위치',str, temp)
                            }else{
                                temp.id= str.slice(str.indexOf('#')+1)
                                temp.class = str.slice(str.indexOf('.')).split('.').slice(1).join(' ');
                                console.log('id가 나머지 위치', str, temp)
                            }
                        }else{
                            temp.class = str.split(/\./).slice(1);

                            console.log('클래스만 존재!!', str, temp)
                        }

                        return temp;
                    }
                    // str.forEach((s, index) => {
                    //     if(index < str.length -1){
                    //         const strMatchIndex = s.match(/\.|#/).index
                    //         tagIdClass[index]={
                    //             tag: s.slice(0, strMatchIndex),
                    //             class: sliceClassId(s.slice(strMatchIndex))
                    //         }
                    //     }
                    // })

                let tempClass;

                    const strMatchIndex = isIdClass ? acc.match(/\.|#/).index : 100
                    tempClass={
                        tag: acc.slice(0, strMatchIndex),
                        class: isIdClass ? sliceClassId(acc.slice(strMatchIndex)): ''
                    }

                //}
                const createEl = document.createElement(tempClass.tag);
                if(typeof tempClass.class === 'object'){
                console.log('@@class&id', tempClass.class.class)

                    if(tempClass.class.id) createEl.setAttribute('id', tempClass.class.id)
                    if(tempClass.class.class.length) createEl.setAttribute('class', tempClass.class.class)
                }
                const temp = pre.appendChild(createEl);
                if(index === tagArr.length - 1) temp.textContent = nodeArr[0];
                return  temp
            }, fragment)
                console.log('::젠코딩형식 HTML =>', nodeArr, fragment)

            sourceTag = fragment;
        }

        if(typeof target == 'string') target = document.querySelector(target);
        target.appendChild(sourceTag);
    }

    showName(){
        console.log('realDom =>', this.selector, this.props.name)
    }
}

export default realDom;