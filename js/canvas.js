var canvas = document.getElementById('canvas');
canvas.width = 280;
canvas.height = 150;
var context = canvas.getContext("2d");

var stage = new createjs.Stage('easel-canvas');
stage.canvas.width = 280;
stage.canvas.height = 150;
console.log(stage);
var offset = 0;

window.onload = function () {
    var fontExample = document.getElementById('font');
    font.style.fontFamily = fontType;
    font.style.fontSize = fontSize.toString() + "px";
    font.style.whiteSpace = "nowrap";
    font.innerHTML = "A A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A";
    offset = font.offsetHeight;

    draw();
};

function drawCanvas(texts) {

    //console.log(texts);
    // draw background color
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // draw grid
    for (var i = fontSize; i < canvasHeight; i += fontSize) {
        context.fillStyle = "#000099";
        context.fillRect(0, i, canvasWidth, 1);
    }
    for (var i = fontSize; i < canvasWidth; i += fontSize) {
        context.fillStyle = "#000099";
        context.fillRect(i, 0, 1, canvasHeight);
    }

    // draw text
    context.font = fontSize.toString() + "px " + fontType;
    //console.log(context.font);
    context.fillStyle = "#ffffff";
    for (var text in texts) {
        //console.log(texts[text], (parseInt(text) + 1) * offset);
        context.fillText(texts[text], 0, (parseInt(text) + 1) * fontSize);
    }
}

function textToCanvas(text) {
    var texts = parseText(text);
    //console.log("convert", texts);

    drawCanvas(texts);
}

function drawEasel(text) {

    // draw background
    var background = new createjs.Shape();
    background.graphics.beginFill('#000000').drawRect(0, 0, 280, 150);
    stage.addChild(background);

    // draw grid
    var grid = { horizontal: [], vertical: [] };
    for (var i = fontSize; i < canvasHeight; i += fontSize + 0.5) {
        grid["horizontal"][i] = new createjs.Shape();
        grid["horizontal"][i].graphics.beginFill('#000099').drawRect(0, i, 280, 1);
        stage.addChild(grid["horizontal"][i]);
    }
    for (var i = fontSize; i < canvasWidth; i += fontSize) {
        grid["vertical"][i] = new createjs.Shape();
        grid["vertical"][i].graphics.beginFill('#000099').drawRect(i, 0, 1, 150);
        stage.addChild(grid["vertical"][i]);
    }

    // draw text
    var textblock = new createjs.Text(text, fontSize.toString() + "px " + fontType, "#ffffff");
    console.log(textblock);
    textblock.textBaseline = "center";
    textblock.x = 0;
    textblock.y = fontSize;
    stage.addChild(textblock);

    stage.update();
}


var text = "Test of the line but \nwill not get further...\n   or further\n   or further\n  or further";
//var text = "  bobo   bobo     bobo";

function draw() {
    setTimeout(function () {
        console.log("font", font.clientHeight, font.offsetHeight, font.offsetTop);
        // Using canvas2svg
        textToSvg(text);

        // Using plain canvas;
        textToCanvas(text);

        // Using Easel
        drawEasel(text);
    }, 100);
}

function updateDraw() {
    setTimeout(function () {
        //console.log("font", font.clientHeight, font.offsetHeight, font.offsetTop);
        textToSvg(text);
        textToCanvas(text);
        drawEasel(text);
    }, 100);
}
