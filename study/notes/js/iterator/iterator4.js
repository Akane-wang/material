function foo() {
    function nextState(v) {
        switch (state) {
            case 0:
                state ++;
                return 42;
            case 1:
                state++;
                x = v;
                console.log(x);

        }
    }
    var state = 0, x;
    return {
        next: function (v) {
            var ret = nextState(v);
            return {
                value: ret,
                done: (state == 2)
            };
        }
    }
}

var it = foo();
it.next();
// it.next(10);