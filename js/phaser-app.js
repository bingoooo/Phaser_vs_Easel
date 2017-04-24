/**
 * Loading Pass
 */

// get datas bulk...
var faces = [];
var elements = [];
var stages = [];
var images = [];

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
faces.forEach(function () {
    stages.push(new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-container', { preload: preload, create: create, render: render }));
});



/**
 * Phaser rendering loop
*/
function preload() {
    //assets preloading
    images.forEach(function (image) {
        stages[0].load.image('testLd', "data/pathLd.png");
    });
}

function create() {

    createFromJson(faces);

}

function update() {

}

function render() {
    stages.forEach(function (stage) {
        stage.debug.inputInfo(32, 32);
    });
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
    element.input.enableDrag(true);
}
function addPhoto() {
    var element = stages[0].add.sprite(0, 0, 'testLd');
    element.inputEnabled = true;
    element.input.enableDrag(false, true);
}
function addPhotoDynamic() {
    stages[0].load.image('test', "data/Test.png");
    stages[0].load.start();
    stages[0].load.onLoadComplete.add(function () {
        console.log('Load complete');
        var element = stages[0].add.sprite(0, 0, 'test');
        element.inputEnabled = true;
        element.input.enableDrag(false, true);
    });
}
var onLoaded = function () {
    var loader = new Phaser.Loader(stages[0]);
    loader.image('test', 'data/Test.png');
    //loader.atlasJSONHash('anotherAtlas', '//url/to/texture' , '//url/to/atlas' );
    loader.onLoadComplete.addOnce(onLoaded);
    //loader.start();
    stages[0].load.image('test', 'data/Test.png');
    console.log('everything is loaded and ready to be used');
    var element = stages[0].add.sprite(80, 0, 'test');
};
function createFromJson(faces) {
    // Loop the faces
    for (var index in faces) {
        // Creating background for each stage
        var color = parseInt(faces[index].backgroundColor.slice(1, faces[index].backgroundColor.length), 16);
        fillBackground(stages[index], color);
        // Creating each block depending on their types
        faces[index].blocks.forEach(function(block){
            //console.log(block); 
            if(block.blockType == "text"){
                var text = block.contentData.htmlContent.replace(/\$quot;/g, "\"").replace(/\&lt;/g, "<").replace(/\&gt;/g, ">");
                //console.log(text);
                var paragraph = document.createElement('p');
                paragraph.innerHTML = text;
                var textContainer = document.getElementById('text-container');
                textContainer.appendChild(paragraph);
            }
        });
    }
}