class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(
            `TypeScript:: Hi, my name is ${this.name} and I'm ${this.age} years old.`,
        );
    }
}

interface Bird {
    fly(): void;
    layEggs(): void;
}

interface Fish {
    swim(): void;
    layEggs(): void;
}

enum Color {
    Red,
    Green,
    Blue,
}

let color1 = Color.Red; // 0
let color2 = Color.Green; // 1

const mySet = new Set();

mySet.add(1); // Set { 1 }
mySet.add(5); // Set { 1, 5 }
mySet.add(5); // Set { 1, 5 }
mySet.add('some text'); // Set { 1, 5, 'some text' }
const o = { a: 1, b: 2 };
mySet.add(o);

const map1 = new Map();
map1.set('a', 1);
map1.set('b', 2);
map1.set('c', 3);
console.log(map1.get('a'));
map1.set('a', 97);
map1.delete('b');

function hangulKong(arr: any) {
    const imjongjin = (아이템: string) => {
        return (doc.innerHTML += 아이템);
    };
    const 배열 =
        arr === undefined
            ? [
                  '콩가루',
                  '검버섯',
                  '딸기콩',
                  '호밀가루',
                  '떡상',
                  '어쩌고',
                  '멀구리',
                  '떡고물',
              ]
            : arr;

    const 새배열 = 배열.map((가루: string, 인덱스: number) => {
        let temp = `<p>이것은 <i>${인덱스}</i>번째 <strong>${가루}</strong>입니다.</p>`;
        return temp;
    });
    const doc = document.createElement('div');
    doc.id = 'myDoc';
    새배열.forEach(imjongjin);

    document.body.appendChild(doc);
}

// 해당 객체가 Bird인지 Fish인지 검사하는 타입 가드 함수
function isBird(obj: Bird | Fish): obj is Bird {
    return (obj as Bird).fly !== undefined;
}

function getAnimalType(animal: Bird | Fish) {
    if (isBird(animal)) {
        console.log('TS:This animal is a bird.');
    } else {
        console.log('TS:This animal is a fish.');
    }
}
export { Person, hangulKong };
