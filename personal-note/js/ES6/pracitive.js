const foo = 'bar';
const baz = {foo};
const baz = {foo: foo}

function f(x,y) {
    return {x,y};
}

function f(x,y) {
    return {x:x,y:y}
}
f(1,2)

const o = {
    method() {
        return "hello";
    }
};

const o = {
    method: function() {
        return "hello";
    }
};

let birth = '2000/01/01';
const Person = {
    name: '张三',
    birth,

    hello() {
        console.log('我的名字是', this.name);
    }
};

function getPoint() {
    const x =1;
    const y = 10;
    return {x,y};
}

getPoint();

let ms = {};
function getItem(key) {
    return key in ms? ms[key]: null;
}

function setItem(key,value) {
    ms[key] =value;
}

function clear() {
    ms = {};
}

module.exports = {getItem,setItem,clear};

module.exports = {
    getItem: getItemm,
    setItem: setItem,
    clear: clear
};