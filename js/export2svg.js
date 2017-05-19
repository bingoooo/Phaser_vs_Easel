// getting formats
var faceWidth, faceHeight;

// loading image test
var image = new Image();
image.src = "/data/img11920x1080.png";
var object = new Image();
object.src = "/data/Objet.png";

// keybinding test
document.onkeydown = function (event) {
    console.log(event);
    if (event.keyCode == 90 && event.ctrlKey && event.shiftKey) console.log("forward");
    else if (event.keyCode == 90 && event.ctrlKey) console.log("back");
};

//exporting to svg

// creating context
var ratio = 1;
var windowFormat = {
    width: window.innerWidth * ratio,
    height: Math.floor(window.innerWidth * 15 / 28) * ratio
}
var ctx = [];
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');

function drawSVG(datas) {

    // setting formats
    faceWidth = Math.round(datas.format.formatSize.face_width * datas.format.formatSize.face_dpi / 10 / 2.54); // [smartMod]     
    faceHeight = Math.round(datas.format.formatSize.face_height * datas.format.formatSize.face_dpi / 10 / 2.54);

    windowFormat.height = Math.floor(window.innerWidth * faceHeight / faceWidth) * ratio;

    var transform = {
        faceWidth: faceWidth,
        faceHeight: faceHeight,
        width: faceWidth / windowFormat.width,
        height: faceHeight / windowFormat.height,
        windowFormat: windowFormat
    }
    console.log("details", datas, windowFormat);

    // if cover exists
    if (datas.cover != false) {
        console.log("drawing cover");
        ctx.push(new C2S(windowFormat.width, windowFormat.height));
        drawBlocks(datas.cover.front.blocks, ctx[ctx.length - 1], transform);
    } else {
        //console.log("no cover");
    }

    // drawing scenes
    for (var scene in datas.scenes) {
        //creating new svg
        ctx.push(new C2S(windowFormat.width, windowFormat.height));

        //drawing scene background
        //console.log("Size :", ctx[ctx.length - 1].width, ctx[ctx.length - 1].height);
        ctx[ctx.length - 1].fillStyle = datas.backgroundColor;
        ctx[ctx.length - 1].fillRect(0, 0, ctx[ctx.length - 1].width, ctx[ctx.length - 1].height);

        //drawing faces
        var toDraw = datas.scenes[scene].faces;
        //console.log("drawing scene", scene, toDraw);

        //drawing face
        for (var face in toDraw) {
            // draw face background
            if (!toDraw[face].backgroundImage) {
                //console.log("no bg image");
                ctx[ctx.length - 1].fillStyle = toDraw[face].backgroundColor;
                ctx[ctx.length - 1].fillRect(0, 0, ctx[ctx.length - 1].width, ctx[ctx.length - 1].height);
            } else {
                //console.log("bg image found");
                ctx.drawImage(image, 0, 0, ctx[ctx.length - 1].width, ctx[ctx.length - 1].height);
            }

            // draw face blocks
            var blocks = toDraw[face].blocks;
            drawBlocks(blocks, ctx[ctx.length - 1], transform);
        }
    }
}

function drawBlocks(blocks, ctx, transform) {
    //console.log("blocks", blocks);
    drawShape(blocks, ctx, transform);

    // draw face folding separator if exist
    if (!datas.cover) {
        ctx.fillStyle = "#AAAAAA";
        ctx.fillRect(ctx.width / 2, 0, 1, ctx.height);
    }
    //console.log(ctx.getSvg());

    var face = ctx.getSvg();

    var face = document.createElement("div");
    face.innerHTML = ctx.getSerializedSvg();
    document.getElementById('svgExport').appendChild(face);
    //console.log(face);
}

function drawShape(blocks, ctx, transform) {
    for (var block in blocks) {
        //console.log("drawing block", blocks[block]);
        // draw border of photos
        var width = blocks[block].width;
        var height = blocks[block].height;
        var position = {
            width: width / transform.width,
            height: height / transform.height,
            x: (blocks[block].xCenter - (width / 2)) / transform.width,
            y: (blocks[block].yCenter - (height / 2)) / transform.height,
            transform: transform.height
        }
        switch (blocks[block].blockType) {
            case "photo":
                ctx.strokeStyle = blocks[block].borderColor;
                ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // gris
                ctx.fillRect(position.x, position.y, position.width, position.height);

                // drawing the image
                //console.log("drawing photo", blocks[block], position);
                ctx.drawImage(image, position.x, position.y, position.width, position.height);

                break;
            case "text":
                //drawing background color
                ctx.fillStyle = "rgba(0, 100, 0, 0.5)"; // vert
                ctx.fillRect(position.x, position.y, position.width, position.height);

                // retrieving text paragraphs
                var text = blocks[block].contentData.htmlContent.replace(/\$quot;/g, '"').replace(/\&lt;/g, "<").replace(/\&gt;/g, ">");
                //console.log("drawing text", text, blocks[block]);
                var textDiv = document.createElement('div');
                textDiv.innerHTML = text;

                //drawing text
                var paragraphs = textDiv.getElementsByTagName('p');
                if (paragraphs.length) {
                    console.log('textDiv', textDiv);
                    console.log("Paragraphes", paragraphs);
                    for (var i = 0; i < paragraphs.length; i++) {
                        console.log("paragraphe", i, paragraphs[i]);
                        var paragraphAlign = paragraphs[i].getAttribute('align').toLocaleLowerCase();
                        if (paragraphAlign == "center") {
                            position.x = blocks[block].xCenter / transform.width;
                            //position.y = blocks[block].yCenter / transform.height;
                        }
                        drawText(ctx, paragraphs[i], position, i);
                    }
                }
                break;
            case "object":
                ctx.fillStyle = "rgba(100, 0, 0, 0.5)"; // rouge
                //console.log("drawing object", position);
                ctx.fillRect(position.x, position.y, position.width, position.height);

                // drawing the object
                //console.log("drawing object", object);
                ctx.drawImage(object, position.x, position.y, position.width, position.height);
                break;
            case "group": // TODO : Prendre en charge la notion de groupe
                if (blocks[block].blocks.length > 0) {
                    //console.log("Groups TODO", blocks[block].blocks);
                    //drawShape(blocks[block].blocks, ctx);
                } else {
                    //console.log("empty group !!!");
                }
                break;
            default:
                break;
        }

    }
}

function drawText(ctx, text, position, line) {
    //drawing texts
    var textSettings = {
        textAlign: text.getAttribute('align').toLowerCase(),
        fontStyle: text.querySelector('font').getAttribute('face'),
        color: text.querySelector('font').getAttribute('color'),
        size: parseInt(text.querySelector('font').getAttribute('size')) / position.transform,
        letterSpacing: parseInt(text.querySelector('font').getAttribute('letterspacing')),
        kerning: parseInt(text.querySelector('font').getAttribute('kerning')),
        content: text.querySelector('font').innerHTML
    }
    //console.log("Font Settings", textSettings);
    document.getElementById('text-container').appendChild(text);
    text = textSettings.content;
    ctx.textAlign = textSettings.textAlign;
    ctx.fillStyle = textSettings.color;
    context.font = ctx.font = textSettings.size + "px " + textSettings.fontStyle;
    ctx.textBaseline = "top";
    var textWidth = context.measureText(text);
    //console.log("text width", textWidth);
    //console.log("text content", text);
    ctx.fillText(text, position.x, position.y + (line * textSettings.size), position.width)
}

// decoding html : var text = block.contentData.htmlContent.replace(/\$quot;/g, "\"").replace(/\&lt;/g, "<").replace(/\&gt;/g, ">");
