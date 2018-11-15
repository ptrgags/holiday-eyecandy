const TILE_SIZE = 0.05;
const NUM_TILES = 100;

var XFORMS = [];

function make_transforms() {
    let R = MobiusTransform.y90();
    let R_inv = R.inverse;
    let T = MobiusTransform.similitude(
        Complex.from_polar(1.1, 0.1), Complex.zero());
    let SPIRAL = R.then(T).then(R_inv);
    XFORMS = [
        SPIRAL, SPIRAL.inverse
        //T, T.inverse
    ];
}


function pick_xform(xform_list) {
    var index = Math.floor(Math.random() * xform_list.length);
    return xform_list[index];
}

function rand_value(scale) {
    // Number between -1 and 1
    let unit_rand = 2.0 * Math.random() - 1;
    return scale * unit_rand;
}

function make_tiles() {
    let results = [];
    for (let i = 0; i < NUM_TILES; i++) {
        let x = rand_value(2);
        let y = rand_value(2);
        let pos = createVector(x, y);
        results.push(new Circle(pos, TILE_SIZE));
    }
    return results;
}

var fill_color = 0;
var tiles = [];
var gfx;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    frameRate(10);

    make_transforms();

    gfx = createGraphics(width, height);;
    tiles = make_tiles();
}

function outside(coords) {
    return coords.x < 0  
        || coords.x > width 
        || coords.y < 0 
        || coords.y > height;
}

// Percent of the height that the unit circle's radius should be
let UNIT_CIRCLE_SIZE = 0.2;


function draw() {
    // Set up our complex plane in the center of the screen
    gfx.push()
    gfx.translate(width / 2, height / 2);

    // Draw the unit circle and axes BEFORE any transformations
    gfx.noFill();
    gfx.stroke(0);
    gfx.scale(UNIT_CIRCLE_SIZE * height, -UNIT_CIRCLE_SIZE * height);
    gfx.strokeWeight(1.0 / (UNIT_CIRCLE_SIZE * height));
    gfx.ellipse(0, 0, 2, 2);
    gfx.line(-10, 0, 10, 0);
    gfx.line(0, -10, 0, 10);

    // Pick a new drawing color
    gfx.fill(0, 128, fill_color)
    gfx.noStroke();
    fill_color += 10;
    fill_color %= 256;

    let new_tiles = [];
    for (let tile of tiles) {
        tile.draw(gfx);
        xform = pick_xform(XFORMS);
        let new_tile = tile.apply_transform(xform);
        new_tiles.push(new_tile);
    }
    tiles = new_tiles;

    gfx.pop();

    image(gfx, 0, 0);
}
