console.log("exporting", datas);

// getting format
console.log("format", datas.format);
console.log("window Format", window);

//exporting to svg

// creating context for each pages
var ctx = [];

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
}


// decoding html : var text = block.contentData.htmlContent.replace(/\$quot;/g, "\"").replace(/\&lt;/g, "<").replace(/\&gt;/g, ">");
