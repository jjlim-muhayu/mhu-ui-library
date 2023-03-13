import _ from 'lodash'
const dessert = {
    dessertName: 'chocolate cake',
    sweetness: 6,
    ingredient: ['flour', 'eggs', 'chocolate', 'sugar', 'butter']
};
function init(){
    console.log(222);

    const html = `
    <h1 id="heading"></h1>
    <hr>
    <div class="box-in">
        <span>
            <label for="inp-text">입력필드:</label>
            <input type="text" id="inp-text">
        </span>
        <span>
            <label for="show">결과필드:</label>
            <textarea id="show"></textarea>
        </span>
    </div>
    `
    const div = document.createElement('div')
    div.classList.add('box');
    div.innerHTML = html;
    document.body.appendChild(div)

    const headingField = document.querySelector('#heading');
    const inputField = document.querySelector('#inp-text');
    const showFiled = document.querySelector('#show');

    const viewModel = {}
    Object.defineProperty(viewModel, 'str', {
        get: ()=>{
            console.log('GET:', viewModel.str)
        },
        set: (newValue)=> {
            console.log('할당', newValue)
            headingField.innerHTML = newValue;
        }
    });

    inputField.onkeyup = function(e){
        const currentValue = e.target.value;
        showFiled.value = currentValue;
        viewModel.str = currentValue;
    }



    const dessert = {
        dessertName: 'chocolate cake',
        sweetness: 6,
        ingredient: ['flour', 'eggs', 'chocolate', 'sugar', 'butter']
    };

    Object.defineProperty(dessert, 'price', {
        value: '20$',
        enumerable: true,
        configurable: true,
        writable: true
    });


}
window.addEventListener('DOMContentLoaded', init)





