console.log("exporting", datas);

// getting format
console.log("format", datas.format);
console.log("window Format", window);

var canvasWidth = 280;
var canvasHeight = 150;
var fontSize = 20;
var fontsTable = [
    "Arial", "NovecentowideBold", "Gothicb", "Montserrat", "CDuflos", "Lobster", "Jellyka Western Princess"
]
var fontIndex = 1;
var fontType = fontsTable[fontIndex];


document.addEventListener("keyup", function (event) {
    if (event.key == "ArrowRight") {
        if (fontIndex < fontsTable.length - 1) fontIndex++;
        fontType = fontsTable[fontIndex];
        font.style.fontFamily = fontType;
        console.log("font type", fontType);
        console.log("font", font.clientHeight, font.offsetHeight, font.offsetTop);
        updateDraw();
    }
    if (event.key == "ArrowLeft") {
        if (fontIndex > 0) fontIndex--;
        fontType = fontsTable[fontIndex];
        font.style.fontFamily = fontType;
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


var face = ctx.getSvg();

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
//exporting to svg

// creating context for each pages
/*var ctx = [];

// if cover exists
if (datas.cover != false) ctx.push(new C2S(2800, 1500));

// creating for each scenes
for (var scene in datas.scenes) {
    ctx.push(new C2S(280, 150));
}

for (var ctxIndex in ctx) {
    //drawing background
    console.log("Size :", ctx[ctxIndex].width, ctx[ctxIndex].height);
    ctx[ctxIndex].fillStyle = datas.backgroundColor;
    ctx[ctxIndex].fillRect(0, 0, ctx[ctxIndex].width, ctx[ctxIndex].height);
    ctx[ctxIndex].fillStyle = "#000000";
    ctx[ctxIndex].strokeRect(5, 5, 10, 10);
    ctx[ctxIndex].fillStyle = "#000000";
    ctx[ctxIndex].strokeRect(270, 140, 10, 10);

    var face = ctx[ctxIndex].getSvg();

    var face = document.createElement("div");
    face.innerHTML = ctx[ctxIndex].getSerializedSvg();
    document.getElementById('svgExport').appendChild(face);
    console.log(face);
}*/


// decoding html : var text = block.contentData.htmlContent.replace(/\$quot;/g, "\"").replace(/\&lt;/g, "<").replace(/\&gt;/g, ">");
