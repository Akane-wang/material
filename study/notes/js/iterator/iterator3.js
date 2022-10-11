if(!Number.prototype[Symbol.iterator]) {
    Object.defineProperty(
        Number.prototype,
        Symbol.iterator,
        {
            writable: true,
            configurable: true,
            enumerable: false,
            value: function iterator() {
                var i, inc, done = false, top = +this;
                console.log(this);
                inc = 1 * (top < 0 ? -1 : 1);
                return {
                    [Symbol.iterator]() {
                        return this;
                    },
                    next() {
                        if(!done) {
                            if(i == null) {
                                i = 0;
                            }
                            else if(top >= 0) { 
                                i = Math.min(top, i + inc);
                            }
                            else {
                                i = Math.max(top, i + inc);
                            }
                            if (i == top) done = true;
                            return {
                                value: i,
                                done: false
                            };
                        }
                        else {
                            return { done: true }
                        }
                    }
                }
            }
        }
    )
}

for(var i of 3) {
    console.log(i);
}

[...-3];