const TILE_SIZE = 0.05;
const NUM_TILES = 100;

var XFORMS = [];

function make_tiles() {
    return [
        new Cline(createVector(-2, 0), 1, 'red'),
        new Cline(createVector(2, 0), 1, 'green'),
        //new Cline(createVector(-1, -1), 1, 'orange'),
        //new Cline(createVector(1, -1), 1, 'blue'),
    ];
}

function pair_circles(c1, c2) {
    // First, map c1 to a unit circle at the origin
    let P = Complex.from_vec(c1.center);
    let to_center = MobiusTransform.pure_translation(P.neg);
    let normalize_scale = MobiusTransform.pure_scale(1.0 / c1.radius);

    //map inside to outside using 1/z
    let inv = MobiusTransform.x180();


    // Scale up to and move to second circle
    let scale = MobiusTransform.pure_scale(c2.radius);
    let Q = Complex.from_vec(c2.center);
    let recenter = MobiusTransform.pure_translation(Q);


    // Combine the 5 steps into one matrix:
    return to_center
        .then(normalize_scale)
        .then(inv)
        .then(scale)
        .then(recenter);
}

function make_transforms(circles) {
    if (circles.length % 2 == 1)
        throw new TypeError("There must be an even number of circles");

    // number of pairs
    let N = circles.length / 2;

    // Lists of transformations
    let forward = [];
    let inverse = [];

    for (let i = 0; i < N; i++) {
        let C = tiles[i];
        let c = tiles[i + N];
        // Pair C -> c
        let T = pair_circles(C, c);
        forward.push(T);

        // Also keep the inverse transformation
        let T_inv = pair_circles(c, C);
        inverse.push(T_inv);
    }

    XFORMS = forward.concat(inverse);
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

var fill_color = 0;
var tiles = [];
var gfx;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    frameRate(10);

    tiles = make_tiles();
    make_transforms(tiles);

    gfx = createGraphics(width, height);
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
