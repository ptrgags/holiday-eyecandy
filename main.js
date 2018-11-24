let SKETCHES = [
    new HexagonTiling(),
    new ParabolicTracks(),
    new EllipticTracks(),
    new HyperbolicTracks(),
    new LoxodromicTracks()
];

var sketch_index = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    frameRate(10);

    let sketch = SKETCHES[sketch_index];
    sketch.setup(width, height);
}

function draw() {
    let sketch = SKETCHES[sketch_index];
    sketch.draw();
    sketch.display();
}

function cycle_right() {
    sketch_index = mod(sketch_index + 1, SKETCHES.length);
    SKETCHES[sketch_index].setup(width, height);
}

function cycle_left() {
    sketch_index = mod(sketch_index - 1, SKETCHES.length);
    SKETCHES[sketch_index].setup(width, height);
}

function keyReleased() {
    if (keyCode === RIGHT_ARROW) {
        cycle_right();
    } else if (keyCode === LEFT_ARROW) {
        cycle_left();
    }
}
