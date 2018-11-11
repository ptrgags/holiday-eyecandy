var POINT_SIZE = 1;
var SPACING = 200;
var N = 10;
var ITERS_PER_FRAME = 50;
var COUNTDOWN = 1;
var MAGIC_START = 100;

function draw_point(center) {
  ellipse(center.x - POINT_SIZE, center.y - POINT_SIZE, POINT_SIZE, POINT_SIZE); 
}

function init_points(origin) {
  var result = [];
  for (var i = 0; i < N; i++) {
    for (var j = 0; j < N; j++) {
       var x = i * SPACING + origin.x;
       var y = j * SPACING + origin.y;
       result.push(createVector(x, y));
    }
  }
  return result;
}

function magic() {
  if (frameCount < MAGIC_START)
    return 0;
  else
    return 0.1 * (frameCount - MAGIC_START);
}

function shrink(vec) {
  return vec.mult(0.5);
}

function shrink_down(vec) {
  var next = shrink(vec);
  next.add(createVector(0, 400 + magic()));
  return next;
}

function shrink_right(vec) {
  var next = shrink(vec);
  next.add(createVector(400 + 19.0 * magic(), 400 + magic()));
  return next;
}

var XFORMS = [
  shrink,
  shrink_down,
  shrink_right
];


function pick_xform() {
  var index = Math.floor(Math.random() * XFORMS.length);
  return XFORMS[index];
}

var current_points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  frameRate(10);
  
  var origin = createVector(30, 20);
  current_points = init_points(origin);
}

function draw() {
  fill(0)
  noStroke();
  
  for (var i = 0; i < ITERS_PER_FRAME; i++) {
    var next_points = [];  
    
    // Draw points
    for (var point of current_points) {
      if (frameCount > COUNTDOWN)
        draw_point(point);
      // Pick the xform for this iteration
      var xform = pick_xform(); 
      next_points.push(xform(point));
    }
    current_points = next_points;
  }
}
