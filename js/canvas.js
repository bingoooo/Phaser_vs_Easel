var canvasWidth = 280;
var canvasHeight = 150;
var fontSize = 20;
var fontsTable = [
    "Arial", "NovecentowideBold", "Gothicb", "Montserrat", "CDuflos", "Lobster", "Jellyka Western Princess"
]
var fontIndex = 0;
var fontType = fontsTable[fontIndex];

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
    font.innerHTML = fontsTable[fontIndex];
    offset = font.offsetHeight;

    draw();
};


document.addEventListener("keyup", function (event) {
    console.log(event);
    if (event.key == "ArrowRight") {
        if (fontIndex < fontsTable.length - 1) fontIndex++;
        fontType = fontsTable[fontIndex];
        font.style.fontFamily = fontType;
        font.innerHTML = fontsTable[fontIndex];
        console.log("font type", fontType);
        console.log("font", font.clientHeight, font.offsetHeight, font.offsetTop);
        updateDraw();
    }
    if (event.key == "ArrowLeft") {
        if (fontIndex > 0) fontIndex--;
        fontType = fontsTable[fontIndex];
        font.style.fontFamily = fontType;
        font.innerHTML = fontsTable[fontIndex];

        console.log("font type", fontType);
        console.log("font", font.clientHeight, font.offsetHeight, font.offsetTop);
        updateDraw();
    }
    if (event.key == "ArrowUp") {
        fontSize++;
        font.style.fontSize = fontSize.toString() + "px";
        offset = font.offsetHeight;
        console.log("size", fontSize);
        console.log("font", font.clientHeight, font.offsetHeight, font.offsetTop);
        updateDraw();
    }
    if (event.key == "ArrowDown") {
        if (fontSize > 3) fontSize--;
        font.style.fontSize = fontSize.toString() + "px";
        offset = font.offsetHeight;
        console.log("size", fontSize);
        console.log("font", font.clientHeight, font.offsetHeight, font.offsetTop);
        updateDraw();
    }
});
// SVG / Canvas comparison
var ctx = new C2S(canvasWidth, canvasHeight);

function exportToSvg(texts, line) {

    // draw background color
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, ctx.width, ctx.height);

    // draw grid
    for (var i = offset; i < canvasHeight; i += offset) {
        ctx.fillStyle = "#000099";
        ctx.fillRect(0, i, canvasWidth, 1);
    }
    for (var i = offset; i < canvasWidth; i += offset) {
        ctx.fillStyle = "#000099";
        ctx.fillRect(i, 0, 1, canvasHeight);
    }

    // draw text
    ctx.font = fontSize.toString() + "px " + fontType;
    ctx.fillStyle = "#ffffff";
    for (var text in texts) {
        //console.log(texts[text], (parseInt(text) + 1) * offset);
        ctx.fillText(texts[text], 0, (parseInt(text) + 1) * offset);
    }

    var face = ctx.getSvg();
    document.getElementById('svgExport').appendChild(face);
}

function textToSvg(text) {

    // parsing text when enter pressed
    var texts = parseText(text, true);
    //console.log(texts);

    exportToSvg(texts);
    //exportToSvg(texts[0], 2);

}

/**
 * @param {string} text
 * @param {boolean} c2s
 * @return {object[string]}
 */
function parseText(text, c2s) {
    var result = [];
    var begin = 0;
    if (c2s) text = text.replace(/ /g, "\u00A0");
    for (var i = 0; i < text.length; i++) {
        if (text[i] == "\n") {
            result.push(text.slice(begin, i));
            begin = i;
        }
        if (i == (text.length - 1)) {
            result.push(text.slice(begin, text.length));
        }
    }
    return result;
}
function drawCanvas(texts) {

    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    

    //console.log(texts);
    // draw background color
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // draw grid
    for (var i = offset; i < canvasHeight; i += offset) {
        context.fillStyle = "#000099";
        context.fillRect(0, i, canvasWidth, 1);
    }
    for (var i = offset; i < canvasWidth; i += offset) {
        context.fillStyle = "#000099";
        context.fillRect(i, 0, 1, canvasHeight);
    }

    // draw text
    context.font = fontSize.toString() + "px " + fontType;
    //console.log(context.font);
    context.fillStyle = "#ffffff";
    for (var text in texts) {
        //console.log(texts[text], (parseInt(text) + 1) * offset);
        context.fillText(texts[text], 0, (parseInt(text) + 1) * offset);
    }
}

function textToCanvas(text) {
    var texts = parseText(text);
    //console.log("convert", texts);

    drawCanvas(texts);
}

function drawEasel(text) {
    stage.removeAllChildren();
    // draw background
    var background = new createjs.Shape();
    background.graphics.beginFill('#000000').drawRect(0, 0, 280, 150);
    stage.addChild(background);

    // draw grid
    var grid = { horizontal: [], vertical: [] };
    for (var i = offset; i < canvasHeight; i += offset) {
        grid["horizontal"][i] = new createjs.Shape();
        grid["horizontal"][i].graphics.beginFill('#000099').drawRect(0, i, 280, 1);
        stage.addChild(grid["horizontal"][i]);
    }
    for (var i = offset; i < canvasWidth; i += offset) {
        grid["vertical"][i] = new createjs.Shape();
        grid["vertical"][i].graphics.beginFill('#000099').drawRect(i, 0, 1, 150);
        stage.addChild(grid["vertical"][i]);
    }

    // draw text
    var textblock = new createjs.Text(text, fontSize.toString() + "px " + fontType, "#ffffff");
    console.log(textblock);
    textblock.textBaseline = "center";
    textblock.name = "text";
    textblock.x = 0;
    textblock.y = offset;
    textblock.lineHeight = offset;
    stage.addChild(textblock);

    stage.update();
}

function updateEasel(text){
    var textBlock = stage.getChildByName('text');
    console.log("update", textBlock);
    textBlock.text = text;
    textBlock.font = fontSize.toString() + "px " + fontType, "#ffffff";
    textBlock.lineHeight = offset;
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
