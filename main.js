let TILE_MAKERS = new CycleBuffer([ 
    new RegularPolygonMaker(4),
]);

let TILE_ARRANGERS = new CycleBuffer([
    new CenterArranger(10),
]);

let RENDERERS = new CycleBuffer([
    new ChaosGame(),
])

let IFS_LIST = new CycleBuffer([
    // Frieze groups
    new Frieze("p1"),
]);

/*
let VAR_NORMS = new CycleBuffer([
    new FrameCountNormalizer(),
]);

let COLOR_MAPPERS = new CycleBuffer([
    new LinearColorMapper(),
]);

let PALETTES = new CycleBuffer([
    new Gradient(Color.BLACK, Color.RED),
]);
*/


var SKETCH = new Sketch();

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    frameRate(10);

    SKETCH.setup(width, height);
}

function draw() {
    SKETCH.draw();
    SKETCH.display();
}

function keyReleased() {

}
