// getting formats
var drawingFormat = {
    width: datas.format.largeur * datas.format.dpi / 20,
    height: datas.format.hauteur * datas.format.dpi / 20
}
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
var ratio = 0.9;
var windowFormat = {
    width: window.innerWidth * ratio,
    height: Math.floor(window.innerWidth * 15 / 28) * ratio
}

function drawSVG(datas) {
    // setting formats
    faceWidth = Math.round(datas.format.formatSize.face_width * datas.format.formatSize.face_dpi / 10 / 2.54); // [smartMod]     
    faceHeight = Math.round(datas.format.formatSize.face_height * datas.format.formatSize.face_dpi / 10 / 2.54);

    windowFormat.height = Math.floor(window.innerWidth * faceHeight / faceWidth) * ratio;

    var ctx = new C2S(windowFormat.width, windowFormat.height);

    var transform = {
        faceWidth: faceWidth,
        faceHeight: faceHeight,
        width: faceWidth / ctx.width,
        height: faceHeight / ctx.height
    }
    console.log("details", datas, windowFormat, ctx, transform);

    // if cover exists
    if (datas.cover != false) {
        console.log("drawing cover");
    } else {
        console.log("no cover");
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
            drawBlocks(blocks, ctx, transform);

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
}

function drawBlocks(blocks, ctx, transform) {
    for (var block in blocks) {
        //console.log("drawing block", blocks[block]);
        // draw border of photos
        var width = blocks[block].width;
        var height = blocks[block].height;
        var position = {
            width: width / transform.width,
            height: height / transform.height,
            x: (blocks[block].xCenter - (width / 2)) / transform.width,
            y: (blocks[block].yCenter - (height / 2)) / transform.height
        }
        switch (blocks[block].blockType) {
            case "photo":
                ctx.strokeStyle = blocks[block].borderColor;
                ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // gris
                ctx.fillRect(position.x, position.y, position.width, position.height);

                // drawing the image
                //console.log("drawing photo", face, blocks[block]);
                ctx.drawImage(image, position.x, position.y, position.width, position.height);

                break;
            case "text":
                ctx.fillStyle = "rgba(0, 100, 0, 0.5)"; // vert
                console.log("drawing text", position);
                ctx.fillRect(position.x, position.y, position.width, position.height);
                break;
            case "object":
                ctx.fillStyle = "rgba(100, 0, 0, 0.5)"; // rouge
                console.log("drawing object", position);
                ctx.fillRect(position.x, position.y, position.width, position.height);

                // drawing the object
                console.log("object", object);
                ctx.drawImage(object, position.x, position.y, position.width, position.height);
                break;
            case "group":
                console.log("Groups TODO");
                /*ctx.fillStyle = "rgba(0, 0, 100, 0.5)"; // bleu
                console.log("drawing group", position);
                ctx.fillRect(position.x, position.y, position.width, position.height);*/
                break;
            default:
                break;
        }

    }

}
// decoding html : var text = block.contentData.htmlContent.replace(/\$quot;/g, "\"").replace(/\&lt;/g, "<").replace(/\&gt;/g, ">");
