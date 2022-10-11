window.onload(function(){
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    context.moveTo(100,100);
    context.lineTo(700,700);
    context.stroke();
})