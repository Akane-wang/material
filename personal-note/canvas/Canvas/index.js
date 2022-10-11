function draw() {
    var canvas = document.getElementById('textCanvas');
    /* 检测支持性 */
    if(!canvas.getContext) return;

    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(50,50);
    ctx.arcTo(200,50,200,200,100);
    ctx.lineTo(200,200);
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(50,50,10,10);
    ctx.rect(200,50,10,10);
    ctx.rect(200,200,10,10);
    ctx.fill();

}
draw();

/* function drawLine(){
    var canvas = document.getElementById('textCanvas');
    if(!canvas.getContext) return;

    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(200,0);
    // ctx.lineTo(0,50);
    ctx.lineTo(200,50);
    // ctx.fill();
    ctx.closePath();
    ctx.stroke();
}

drawLine(); */

// function drawLine(){
//     var canvas = document.getElementById('textCanvas');
//     if(!canvas.getContext) return;

//     var ctx = canvas.getContext('2d');
//     ctx.beginPath();
//     ctx.arc(50,50,40,0,Math.PI/2,false);
//     ctx.stroke();

//     ctx.beginPath();
//     ctx.arc(150,50,40,0,-Math.PI/2,true);
//     ctx.closePath();
//     ctx.stroke();

//     ctx.beginPath();
//     ctx.arc(50,150,40,-Math.PI/2,Math.PI/2,false);
//     ctx.fill();

//     ctx.beginPath();
//     ctx.arc(150,150,40,0,Math.PI,false);
//     ctx.fill();
// }

// drawLine();
