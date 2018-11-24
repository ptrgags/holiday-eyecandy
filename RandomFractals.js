const TILE_SIZE = 0.05;
const NUM_TILES = 100;

var XFORMS = [];

var COLORS = ['red', 'orange', 'green', 'blue'];

var LABELS = "abAB"

function make_tiles() {
    return [
        new Cline(createVector(-1, -1), 1, 'red'),
        new Cline(createVector(-1, 1), 1, 'orange'),
        new Cline(createVector(1, 1), 1, 'green'),
        new Cline(createVector(1, -1), 1, 'blue'),
    ];
}

function pair_circles(c1, c2, extra_xform) {
    // First, map c1 to a unit circle at the origin
    let P = Complex.from_vec(c1.center);
    let to_center = MobiusTransform.pure_translation(P.neg);
    let normalize_scale = MobiusTransform.pure_scale(1.0 / c1.radius);

    //map inside to outside using 1/z
    let inv = MobiusTransform.x180();

    // If desired, map the unit circle -> unit circle in between
    let extra = extra_xform || MobiusTransform.identity();

    // Scale up to and move to second circle
    let scale = MobiusTransform.pure_scale(c2.radius);
    let Q = Complex.from_vec(c2.center);
    let recenter = MobiusTransform.pure_translation(Q);


    // Combine the 5 steps into one matrix:
    return to_center
        .then(normalize_scale)
        .then(inv)
        .then(extra)
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

    // Rotate 180 degrees so the circles move towards each other
    let extra_xform = MobiusTransform.z180();

    for (let i = 0; i < N; i++) {
        let C = tiles[i];
        let c = tiles[i + N];

        // Pair C -> c
        let T = pair_circles(C, c, extra_xform);
        forward.push(T);

        // Also keep the inverse transformation
        //let T_inv = T.inverse;
        let T_inv = pair_circles(c, C, extra_xform);
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

/**
 * Because JavaScript doesn't implement modulo properly for negative
 * integers :P
 */
function mod(n, m) {
    return ((n % m) + m) % m;
}

function render_circles(gfx, circles, max_depth) {
    let N = circles.length / 2;
    for (let i = 0; i < circles.length; i++) {
        let index = mod(i + N, 2 * N);
        let xform = XFORMS[index];
        let circle = new Cline(createVector(0, 0), 1);//circles[i];

        gfx.fill(COLORS[index]);
        gfx.stroke(0);
        circle.draw(gfx);
        let label = LABELS.charAt(i);
        console.log("=====");
        console.log(`${label}: ${circle.toString()} ${COLORS[index]}`);
        render_circle_helper(gfx, xform, circle, index, max_depth, label);
    }
}

function render_circle_helper(gfx, xform, circle, index, depth, label) {
    if (depth == 0)
        return;

    // Draw circle
    //circle.draw(gfx);
    //console.log(circle.toString());

    let N = tiles.length / 2;
    for (let i = -(N - 1); i <= (N - 1); i++) {
        let new_index = mod(index + i, 2 * N);
        console.log(index);
        console.log(new_index);
        let new_xform = XFORMS[new_index];
        
        let xform_chain = new_xform.then(xform);
        gfx.fill(COLORS[new_index]);
        gfx.stroke(0);
        let new_circle = circle.apply_transform(xform_chain);
        new_circle.draw(gfx);

        let new_label = label + LABELS[new_index];

        console.log(`${new_label}: ${new_circle.toString()}`);

        render_circle_helper(
            gfx, 
            new_xform.then(xform),
            circle,
            new_index,
            depth - 1,
            new_label);
    }
}

/*
function render_circles(gfx, circle, index, depth) {
    // Stop when the depth is 0
    if (depth == 0)
        return;

    circle.draw(gfx);

    let N = tiles.length / 2;
    for (let i = -(N - 1); i <= (N - 1); i++) {
        let new_index = mod(index + i, 2 * N);
        let xform = XFORMS[new_index];
        let new_circle = circle.apply_transform(xform);
        render_circles(gfx, new_circle, new_index, depth - 1); 
    }
}
*/

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

    start_complex_plane(gfx);
    let depth = 5;
    render_circles(gfx, tiles, depth);
    /*
    render_circles(gfx, tiles[0], 2, depth);
    //render_circles(gfx, tiles[1], 3, depth);
    //render_circles(gfx, tiles[2], 0, depth);
    //render_circles(gfx, tiles[3], 1, depth);
    */
    end_complex_plane(gfx);
    end_complex_plane(gfx);
}

// Percent of the height that the unit circle's radius should be
let UNIT_CIRCLE_SIZE = 0.2;

function start_complex_plane(gfx) {
    // Set up our complex plane in the center of the screen
    gfx.push()
    gfx.translate(width / 2, height / 2);
    
    gfx.background(0);

    // Draw the unit circle and axes BEFORE any transformations
    gfx.noFill();
    gfx.stroke(255);
    gfx.scale(UNIT_CIRCLE_SIZE * height, -UNIT_CIRCLE_SIZE * height);
    gfx.strokeWeight(1.0 / (UNIT_CIRCLE_SIZE * height));
    gfx.ellipse(0, 0, 2, 2);
    gfx.line(-10, 0, 10, 0);
    gfx.line(0, -10, 0, 10);
}

function end_complex_plane(gfx) {
    gfx.pop();
}


function draw() {

    // Pick a new drawing color
    /*
    gfx.fill(0, 128, fill_color)
    gfx.noStroke();
    fill_color += 10;
    fill_color %= 256;
    */

    /*
    let new_tiles = [];
    for (let tile of tiles) {
        tile.draw(gfx);
        xform = pick_xform(XFORMS);
        let new_tile = tile.apply_transform(xform);
        new_tiles.push(new_tile);
    }
    tiles = new_tiles;
    */


    image(gfx, 0, 0);
}
