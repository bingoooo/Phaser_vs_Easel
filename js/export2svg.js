console.log("exporting", datas);

// getting format
console.log("format", datas.format);
console.log("window Format", window);

// keybinding test
document.onkeydown = function(event){
    console.log(event);
    if (event.key == "z" && event.ctrlKey) console.log("back");
    if (event.key == "Z" && event.ctrlKey) console.log("forward");
};

//exporting to svg

// creating context
//var ctx = new C2S(280, 150);
var ratio = 0.9;
var ctx = new C2S(window.innerWidth * ratio, Math.floor(window.innerWidth * 15 / 28) * ratio);

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
    var toDraw = scene.faces;
    console.log("drawing scene", scene, toDraw);
    ctx.fillStyle = "#000000";
    ctx.strokeRect(5, 5, 10, 10);
    ctx.fillStyle = "#000000";
    ctx.strokeRect(270, 140, 10, 10);

    var face = ctx.getSvg();

    var face = document.createElement("div");
    face.innerHTML = ctx.getSerializedSvg();
    document.getElementById('svgExport').appendChild(face);
    console.log(face);
}

for (var ctxIndex in ctx) {
}


// decoding html : var text = block.contentData.htmlContent.replace(/\$quot;/g, "\"").replace(/\&lt;/g, "<").replace(/\&gt;/g, ">");
