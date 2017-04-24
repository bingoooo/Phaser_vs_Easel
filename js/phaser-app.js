/**
 * Loading Pass
 */

// get datas bulk...
var faces = [];
var elements = [];
var stages = [];

// get datas infos
datas.scenes.forEach(function (scenes) {
    scenes.faces.forEach(function (face) {
        faces.push(face);
    })
});
// Build a canvas stage per face
faces.forEach(function () {
    stages.push(new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, render: render }));
});

for (var index in faces) {
    console.log("face", index);
}


/**
 * Phaser rendering loop
*/
function preload(images) {
    //assets preloading
    //stages[0].load.image('test', "data/Test.png");
}

function create() {
    // Creating background for each stage

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
    elements[0] = fillBackground(0x00FFFF);
    console.log(elements);
}
function fillBackground(color) {
    var element = stages[1].add.graphics(0, 0);
    element.name = 'background';
    element.beginFill(color);
    element.drawRect(0, 0, stages[1].width, stages[1].height);
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
function addText() {
    var style = { font: "14px Arial", fill: "#FFFF00", align: "center" };
    var element = stages[0].add.text(stages[0].world.centerX, stages[0].world.centerY, "test", style);
    //element.anchor.set(0.5);
    element.inputEnabled = true;
    element.input.enableDrag(true);
}
function addPhoto() {
    var element = stages[0].add.sprite(0,0,'test');
}
function addPhotoDynamic(){
        stages[0].load.image('test', "data/Test.png");
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
