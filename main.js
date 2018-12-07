/*
let TILE_MAKERS = new CycleBuffer([ 
    new SquareMaker()
]);

let TILE_ARRANGERS = new CycleBuffer([
    new SquareArranger()
]);

let RENDERERS = new CycleBuffer([
    new ChaosGame(),
]);

let IFS = new CycleBuffer([
    // Frieze groups
    Frieze.make_ifs("p1"),
]);

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
