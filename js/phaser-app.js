/**
 * Loading Pass
 */

// get datas bulk...
var faces = [];
var elements = [];
var stages = [];
var images = [];
var canvasWidth = 280;
var canvasHeight = 150;

// get faces infos from datas
datas.scenes.forEach(function (scenes) {
    scenes.faces.forEach(function (face) {
        faces.push(face);
    })
});
// Get Image links from faces
faces.forEach(function (face) {
    face.blocks.forEach(function (block) {
        if (block.blockType == "photo") images.push(block.contentData);
    });
});

// Build a canvas stage per face
/*faces.forEach(function () {
    stages.push(new Phaser.Game(canvasWidth, canvasHeight, Phaser.AUTO, 'phaser-container', { preload: preload, create: create, update: update, render: render }));
});*/

// SVG / Canvas comparison
stage = new Phaser.Game(canvasWidth, canvasHeight, Phaser.AUTO, 'phaser-container', { preload: preload, create: create, update: update, render: render });


/**
 * Phaser rendering loop
*/
function preload() {
    //assets preloading
    /*
    images.forEach(function (image) {
        stages[0].load.image('testLd', "data/pathLd.png");
    });*/
}

function create() {

    /*createFromJson(faces);
    var style = { font: "65px Arial", fill: "#000000", align: "center" };
    var text = stages[0].add.text(stages[0].world.centerX, stages[0].world.centerY, "- phaser -\nwith a sprinkle of\npixi dust", style);
    text.anchor.set(0.5);

    text.addColor("#ffff00", 16);*/

    // SVG drawing comparison
    var style = {font : "14px Arial", fill: "#FFFFFF", align: "center"};
    var text = stage.add.text(20, 20, "Test", style);

}

function update() {

}

function render() {
    /*stages.forEach(function (stage) {
        stage.debug.inputInfo(32, 32);
    });*/
}




/**
 * Additionnal functions
 */
function clickButton() {
    console.log('click', faces);
    elements[0] = fillBackground(stages[0], parseInt("00FFFF", 16));
    console.log(elements);
}
function fillBackground(stage, color) {
    var element = stage.add.graphics(0, 0);
    element.name = 'background';
    element.beginFill(color);
    element.drawRect(0, 0, stage.width, stage.height);
    element.endFill();
    return element;
}
function addRectangle(color) {
    var element = stages[0].add.graphics(0, 0);
    element.name = "cube";
    element.beginFill(color ? color : 0xFDFDFD);
    element.drawRect(50, 50, 100, 100);
    element.endFill();
    element.inputEnabled = true;
    element.input.enableDrag();
    element.events.onInputDown.add(function (cube) {
        console.log(cube);
    });
    element.events.onDragStop.add(function (cube) {
        console.log(cube.x, cube.y);
    });
    console.log(element);
}
function addText(x, y, text, style) {
    style = style ? style : { font: "14px Arial", fill: "#FFFF00", align: "center" };
    var element = stages[0].add.text(x ? x : stages[0].world.centerX, y ? y : stages[0].world.centerY, text ? text : "test", style);
    //element.anchor.set(0.5);
    element.inputEnabled = true;
    element.input.enableDrag(true, true);
}
function addPhoto() {
    var element = stages[0].add.image(0, 0, 'testLd');
    element.inputEnabled = true;
    element.input.enableDrag(false, true);
}
function addPhotoDynamic() {
    stages[0].load.image('test', "data/Test.png");
    stages[0].load.start();
    stages[0].load.onLoadComplete.add(function () {
        console.log('Load complete');
        var element = stages[0].add.image(0, 0, 'test');
        element.inputEnabled = true;
        element.input.enableDrag(false, true);
    });
}
function showText() {
    var target = document.getElementById('text-container');
    target.classList.toggle('hidden');
}
function createFromJson(faces) {
    // Loop the faces
    for (var index in faces) {
        // Creating background for each stage
        var color = parseInt(faces[index].backgroundColor.slice(1, faces[index].backgroundColor.length), 16);
        fillBackground(stages[index], color);
        // Creating each block depending on their types
        faces[index].blocks.forEach(function (block) {
            //console.log(block); 
            if (block.blockType == "text") {
                var text = block.contentData.htmlContent.replace(/\$quot;/g, "\"").replace(/\&lt;/g, "<").replace(/\&gt;/g, ">");
                console.log(text);
                var paragraph = document.createElement('p');
                paragraph.innerHTML = text;
                var textContainer = document.getElementById('text-container');
                textContainer.appendChild(paragraph);
            }
        });
    }
}