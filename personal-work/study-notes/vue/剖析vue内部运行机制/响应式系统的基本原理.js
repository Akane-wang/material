function cb(val) {
    console.log("视图更新啦~");
}

function observer(value) {
    // 这里先判断它转义后不为false，是因为如果它为null的话，转义后还是object，这是历史遗留的bug，其他的我就不知道了
    if(!value || (typeof value !== 'object')) {
        return;
    } 

    Object.keys(value).forEach((key) => {
        defineReactive(value, key, value[key]);
    })
}
function defineReactive(obj, key, val) {
    Object.defineProperty(obj, key, {
        enumerable:true,
        configurable: true,
        set: function reactiveSetter(newVal) {
            if (newVal === val) return;
            cb(newVal);
        },
        get: function reactiveGetter() {
            return val;
        }
    })
}

class Vue {
    constructor(options) {
        this._data = options.data;
        observer(this._data);
    }
}

let o = new Vue({
    data: {
        test: "I am 李羽_ny"
    }
});

o._data.tesr = "hello 吴梓瑀."