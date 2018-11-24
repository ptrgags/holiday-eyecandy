let SKETCHES = [
   new DoubleSpiral() 
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
