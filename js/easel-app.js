console.log("easel app");

var canvas = document.getElementById('easel-canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 

function fullScreen(canvas){
    if(canvas.webkitRequestFullScreen) canvas.webkitRequestFullScreen();
    else canvas.mozRequestFullScreen();
}
canvas.addEventListener("click", fullScreen(canvas));