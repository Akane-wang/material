// let WIDTH = 1920;
let HEIGHT = 768;
// let RADIUS = 8;
// let MARGIN_LEFT = 60;
// let MARGIN_TOP = 30;
// const endTime = new Date(2020,7,18,09,26,59);
let curShowTimeSeconds = 0;
// var ball = {x: 512,y:100,r: 20, g:2,vx:-4,vy:-10,color: '#005588'} // x，y,radius,加速度，x,y的速度
var ball = [];
const colors = ['#FFC8B8','#C6EFCE','#FFD966','#E99899','#EE93F6','#FFD966','#D041E1','#0188FB','#DFF8FF','#3F49B9'];
window.onload = function() {
    var canvas = document.getElementById('canvas');
    WIDTH = document.body.clientWidth
    // HEIGHT = document.body.clientHeight

    MARGIN_LEFT = Math.round(WIDTH /10);
    RADIUS = Math.round(WIDTH * 4 / 5 / 108)-1

    MARGIN_TOP = Math.round(HEIGHT /5);
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    
    var ctx = canvas.getContext('2d');
    curShowTimeSeconds = getCurrentShowTimeSeconds()
    setInterval(
        function () {
            render(ctx);
            update();
        },
        50
    )
    // render(ctx);
}

function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    var ret = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();

    return ret;
}

curShowTimeSeconds = getCurrentTimeShowSeconds();

function getCurrentTimeShowSeconds() {
    var curTime = new Date();
    var ret = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();

    return ret;
}

function render (ctx) {
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height); // 清空矩形空间
    var hour = parseInt(curShowTimeSeconds/3600);
    var minutes = parseInt((curShowTimeSeconds - hour*3600)/60);
    var seconds = parseInt(curShowTimeSeconds%60);

    let arr = [parseInt(hour/10),parseInt(hour%10),parseInt(10),parseInt(minutes/10),parseInt(minutes%10),parseInt(10),parseInt(seconds/10),parseInt(seconds%10)];
    let left = 0;
    for(let i = 0; i < arr.length; i++) {
        if(arr[i-1] == 10) {
            left += 9*(RADIUS + 1);
        }else {
            left += 15*(RADIUS + 1);
        }
        renderDigit(MARGIN_LEFT + left, MARGIN_TOP, arr[i],ctx);

    }

    for(var i = 0; i < ball.length ; i++) {
        ctx.fillStyle = ball[i].color;
        ctx.beginPath();
        ctx.arc(ball[i].x,ball[i].y,RADIUS,0,2*Math.PI,true);
        ctx.closePath();
        ctx.fill();
    }
}


function update() {
    var nextShowTimeSeconds = getCurrentTimeShowSeconds();
    var nextHour = parseInt(nextShowTimeSeconds/3600);
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHour*3600)/60);
    var nextSeconds = parseInt(nextShowTimeSeconds%60);

    var curHour = parseInt(curShowTimeSeconds/3600);
    var curMinutes = parseInt((curShowTimeSeconds - nextHour*3600)/60);
    var curSeconds = parseInt(curShowTimeSeconds%60);

    if(nextSeconds != curSeconds) {
        if(parseInt(curHour/10) != parseInt(nextHour/10)) {
            addBalls(MARGIN_LEFT + 0, MARGIN_TOP,parseInt(curHour/10));
        }
        if(parseInt(curHour%10) != parseInt(nextHour%10)) {
            addBalls(MARGIN_LEFT + 15*(RADIUS+1), MARGIN_TOP,parseInt(curHour%10));
        }
        if(parseInt(curMinutes/10) != parseInt(nextMinutes/10)) {
            addBalls(MARGIN_LEFT + 39*(RADIUS+1), MARGIN_TOP,parseInt(curMinutes/10));
        }
        if(parseInt(curMinutes%10) != parseInt(nextMinutes%10)) {
            addBalls(MARGIN_LEFT + 54*(RADIUS+1), MARGIN_TOP,parseInt(curMinutes%10));
        }
        if(parseInt(curSeconds/10) != parseInt(nextSeconds/10)) {
            addBalls(MARGIN_LEFT + 78*(RADIUS+1), MARGIN_TOP,parseInt(curSeconds/10));
        }
        if(parseInt(curSeconds%10) != parseInt(nextSeconds%10)) {
            addBalls(MARGIN_LEFT + 93*(RADIUS+1), MARGIN_TOP,parseInt(curSeconds/10));
        }
        curShowTimeSeconds = nextShowTimeSeconds;
    }
    updateBalls();
}


function updateBalls() {
    for(var i = 0; i < ball.length;i++) {
        ball[i].x += ball[i].vx;
        var c = 1.0;
        
        if(ball[i].y + RADIUS + ball[i].vy >= (HEIGHT)) {
            c = (HEIGHT - (ball[i].y + RADIUS)) / ball[i].vy;
        }
        ball[i].y += ball[i].vy;
        ball[i].vy += c*ball[i].g;

        if(ball[i].y >= HEIGHT - RADIUS) {
            ball[i].y = HEIGHT - RADIUS;
            ball[i].vy = Math.abs(ball[i].vy) * 0.75;
        }
    }

    var cnt = 0
    for( var i = 0 ; i < ball.length ; i ++ )
        if( ball[i].x + RADIUS > 0 && ball[i].x -RADIUS < WIDTH )
            ball[cnt++] = ball[i]

    while( ball.length > Math.min(300,cnt) ){
        ball.pop();
    }
}


function addBalls(x,y,num) {
    for(var i = 0; i < digit[num].length; i++) {
        for (var j = 0;j<digit[num][i].length; j++) {
            if(digit[num][i][j] == 1) {
                var aBall = {
                    x: x+j*2*(RADIUS+1)+(RADIUS+1),
                    y: y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5+Math.random(),
                    vx: Math.pow(-1,Math.ceil(Math.random()*1000)) * 4,
                    vy: -5,
                    color: colors[Math.floor(Math.random() * colors.length)]
                }
                ball.push(aBall);
            }
        }
    }
}


function renderDigit( x , y , num , cxt ){

    cxt.fillStyle = "rgb(0,102,153)";

    for( var i = 0 ; i < digit[num].length ; i ++ )
        for(var j = 0 ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                cxt.beginPath();
                cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI )
                cxt.closePath()

                cxt.fill()
            }
}


