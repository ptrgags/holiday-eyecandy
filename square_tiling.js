// TODO: I plan to clean up this code once I have a better
// idea of which types of fractals I want to implement

var TILE_SIZE = 50;
var RED_STEP = 10;
var RED_OFFSET = 50;
var RED_VALS = 256;
var RED_MODULO = RED_VALS - RED_OFFSET; 
var red_val = RED_OFFSET;

var TILE_VARIATION = 20;

function draw_tile(center) {
  ellipse(center.x - TILE_SIZE / 2.0, center.y - TILE_SIZE / 2.0, 0.8 * TILE_SIZE, 0.8 * TILE_SIZE);
}

// Move one tile to the right, but stay on screen
function xform_right(vec) {
  if (vec.x < width) 
    return vec.add(createVector(TILE_SIZE, 0));
  else
    return vec;
}

// Move one tile to the left, but stay on screen
function xform_left(vec) {
  if (vec.x > 0)
    return vec.add(createVector(-TILE_SIZE, 0));
  else
    return vec;
}

// Move one tile to the right, but stay on screen
function xform_down(vec) {
  if (vec.y < height) 
    return vec.add(createVector(0, TILE_SIZE));
  else
    return vec;
}

// Move one tile to the left, but stay on screen
function xform_up(vec) {
  if (vec.y > 0)
    return vec.add(createVector(0, -TILE_SIZE));
  else
    return vec;
}

var XFORMS = [
  xform_right,
  xform_left,
  xform_up,
  xform_down,
];



function pick_xform() {
  var index = Math.floor(Math.random() * XFORMS.length);
  return XFORMS[index];
}

function make_tiles(N, center) {
  var results = [];
  for (var i = 0; i < N; i++) {
    var x = Math.floor(Math.random() * TILE_VARIATION - TILE_VARIATION / 2);
    var y = Math.floor(Math.random() * TILE_VARIATION - TILE_VARIATION / 2);
    var vec = createVector(x * TILE_SIZE, y * TILE_SIZE);
    vec.add(center);
    console.log(vec);
    results.push(vec);
  }
  return results;
}

var current_tiles;

function square_tile_setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  frameRate(10);
  
  var center = createVector(width / 2, height / 2);
  current_tiles = make_tiles(10, center);
  console.log(current_tiles);
}

function square_tile_draw() {
  // Change the fill color to the next brightest
  // shade of red, but loop back to a darker shade
  // if we go above 255
  stroke(0);
  fill(red_val, 0, 0);
  red_val = (red_val - RED_OFFSET + RED_STEP) % RED_MODULO + RED_OFFSET;
  
  var next_tiles = [];
  
  // Draw tiles
  for (var tile of current_tiles) {
    console.log(tile);
    draw_tile(tile);
  
    // Apply one of the transformations randomly
    next_tiles.push(pick_xform()(tile));
  }
  current_tiles = next_tiles;
}
