var tasks = {
    [Symbol.iterator]() {
        var steps = this.actions.slice();
        return {
            [Symbol.iterator]() {
                return this;
            },
            next(...args) {
                if(steps.length > 0) {
                    let res = steps.shift()(...args);
                    return {
                        value: res,
                        done: false
                    }
                }
                else {
                    return {
                        done: true
                    }
                }
            },
            return(v) {
                steps.length = 0;
                return {
                    value: v,
                    done: true
                }
            }
        }
    },
    actions: []
};

tasks.actions.push(
    function step1(x) {
        console.log("step1:", x);
        return x * 2;
    },
    function step2(x, y) {
        console.log("step2:", x, y);
        return x + (y * 2);
    },
    function step3(x, y, z) {
        console.log("step3:", x, y, z);
        return x * y + z;
    },
);

var it = tasks[Symbol.iterator]();
it.next(10);

it.next(20, 50);

it.next(20, 50, 120);

it.next();