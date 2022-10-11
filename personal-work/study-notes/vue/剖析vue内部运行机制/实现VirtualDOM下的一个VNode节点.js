class VNode {
    constructor (tag, data, children, text, elm) {
        this.tag = tag;
        this.data = data;
        this.children = children;
        this.text = text;
        this.elm = elm;
    }
}

<template>
    <span class="demo" v-show="isShow">
        This is a span.
    </span>
</template>

function render() {
    return new VNode(
        'span',
        {
            directives: [
                {
                    rawName: 'v-show',
                    expression: 'isShow',
                    name: 'show',
                    value: true
                }
            ],
            staticClass: 'demo'
        },
        [new VNode(undefined, undefined, undefined, 'This is a span')]
    );
}

{
    tag: 'span',
    data: {
        directives: [
            {
                rawName: 'v-show',
                expression: 'isShow',
                name: 'show',
                value: true
            }
        ],
        staticClass:'demo'
    },
    text: undefined,
    children: [
        {
            tag: undefined,
            data: undefined,
            text: 'This is a span',
            children: undefined
        }
    ]
}