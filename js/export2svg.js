console.log("exporting", datas);

// getting formats
console.log("format", datas.format);
var drawingFormat = {
    width: datas.format.largeur * datas.format.dpi / 20,
    height: datas.format.hauteur * datas.format.dpi / 20
}

console.log("window Format", window);

// loading image test
var image = new Image();
image.src = "/data/Test.png";
var object = new Image();
object.src = "/data/pathLd.png";

// keybinding test
document.onkeydown = function (event) {
    console.log(event);
    if (event.keyCode == 90 && event.ctrlKey && event.shiftKey) console.log("forward");
    else if (event.keyCode == 90 && event.ctrlKey) console.log("back");
};

//exporting to svg

// creating context
var ratio = 0.9;
var windowFormat = {
    width: window.innerWidth * ratio,
    height: Math.floor(window.innerWidth * 15 / 28) * ratio
}
var ctx = new C2S(windowFormat.width, windowFormat.height);

// if cover exists
if (datas.cover != false) {
    console.log("drawing cover");
}



// drawing scenes
for (var scene in datas.scenes) {
    //drawing background
    console.log("Size :", ctx.width, ctx.height);
    ctx.fillStyle = datas.backgroundColor;
    ctx.fillRect(0, 0, ctx.width, ctx.height);

    //drawing faces
    var toDraw = datas.scenes[scene].faces;
    console.log("drawing scene", scene, toDraw);
    for (var face in toDraw) {
        // draw face background
        if (!toDraw[face].backgroundImage) {
            console.log("no bg image");
            ctx.fillStyle = toDraw[face].backgroundColor;
            ctx.fillRect(0, 0, ctx.width, ctx.height);
        } else {
            console.log("bg image found");
        }

        // draw face blocks
        var blocks = toDraw[face].blocks;
        for (var block in blocks) {
            //console.log("drawing block", blocks[block]);
            // draw border of photos
            var scale = 1;
            switch (blocks[block].blockType) {
                case "photo":
                    ctx.strokeStyle = blocks[block].borderColor;
                    ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // gris
                    var position = {
                        x: blocks[block].xCenter * windowFormat.width * scale / drawingFormat.width,
                        y: blocks[block].yCenter * windowFormat.height * scale / drawingFormat.height,
                        height: blocks[block].height * windowFormat.height * scale / drawingFormat.height,
                        width: blocks[block].width * windowFormat.width * scale / drawingFormat.width
                    }
                    ctx.fillRect(position.x, position.y, position.width, position.height);

                    // drawing the image
                    console.log("image", image);
                    ctx.drawImage(image, position.x, position.y, position.width, position.height);

                    break;
                case "text":
                    ctx.fillStyle = "rgba(0, 100, 0, 0.5)"; // vert
                    var position = {
                        x: blocks[block].xCenter * windowFormat.width * scale / drawingFormat.width,
                        y: blocks[block].yCenter * windowFormat.height * scale / drawingFormat.height,
                        height: blocks[block].height * windowFormat.height * scale / drawingFormat.height,
                        width: blocks[block].width * windowFormat.width * scale / drawingFormat.width
                    }
                    console.log("drawing text", position);
                    ctx.fillRect(position.x, position.y, position.width, position.height);
                    break;
                case "object":
                    ctx.fillStyle = "rgba(100, 0, 0, 0.5)"; // rouge
                    var position = {
                        x: blocks[block].xCenter * windowFormat.width * scale / drawingFormat.width,
                        y: blocks[block].yCenter * windowFormat.height * scale / drawingFormat.height,
                        height: blocks[block].height * windowFormat.height * scale / drawingFormat.height,
                        width: blocks[block].width * windowFormat.width * scale / drawingFormat.width
                    }
                    console.log("drawing object", position);
                    ctx.fillRect(position.x, position.y, position.width, position.height);

                    // drawing the image
                    console.log("object", object);
                    ctx.drawImage(object, position.x, position.y, position.width, position.height);
                    break;
                case "group":
                    ctx.fillStyle = "rgba(0, 0, 100, 0.5)"; // bleu
                    var position = {
                        x: blocks[block].xCenter * windowFormat.width * scale / drawingFormat.width,
                        y: blocks[block].yCenter * windowFormat.height * scale / drawingFormat.height,
                        height: blocks[block].height * windowFormat.height * scale / drawingFormat.height,
                        width: blocks[block].width * windowFormat.width * scale / drawingFormat.width
                    }
                    console.log("drawing group", position);
                    ctx.fillRect(position.x, position.y, position.width, position.height);
                    break;
                default:
                    break;
            }

        }

        // draw face separators
        ctx.fillStyle = "#AAAAAA";
        ctx.fillRect(ctx.width / 2, 0, 1, ctx.height);
    }

    var face = ctx.getSvg();

    var face = document.createElement("div");
    face.innerHTML = ctx.getSerializedSvg();
    document.getElementById('svgExport').appendChild(face);
    //console.log(face);
}

// decoding html : var text = block.contentData.htmlContent.replace(/\$quot;/g, "\"").replace(/\&lt;/g, "<").replace(/\&gt;/g, ">");
