const TILE_SIZE = 50;
const ROOT3 = Math.sqrt(3);
const NUM_TILES = 20;

let XFORMS = [
    MatrixTransform.translate(TILE_SIZE, 0),
    MatrixTransform.translate(-TILE_SIZE, 0),
    MatrixTransform.translate(1.5 * TILE_SIZE, ROOT3/2 * TILE_SIZE),
    MatrixTransform.translate(-1.5 * TILE_SIZE, -ROOT3/2 * TILE_SIZE),
    MatrixTransform.translate(1.5 * TILE_SIZE, -ROOT3/2 * TILE_SIZE),
    MatrixTransform.translate(-1.5 * TILE_SIZE, ROOT3/2 * TILE_SIZE),
];

function pick_xform(xform_list) {
    var index = Math.floor(Math.random() * xform_list.length);
    return xform_list[index];
}

function center_circle() {
    return new Circle(createVector(width / 2, height / 2), TILE_SIZE);
}

function make_tiles() {
    let results = [];
    for (let i = 0; i < NUM_TILES; i++)
        results.push(center_circle());
    return results;
}

var fill_color = 0;
var tiles = [];
var gfx;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    frameRate(10);

    gfx = createGraphics(width, height);;

    tiles = make_tiles();
}

function outside(coords) {
    return coords.x < 0  
        || coords.x > width 
        || coords.y < 0 
        || coords.y > height;
}


function draw() {
    gfx.fill(0, 128, fill_color)
    gfx.noStroke();

    fill_color += 10;
    fill_color %= 256;

    let new_tiles = [];
    for (let tile of tiles) {
        tile.draw(gfx);
        xform = pick_xform(XFORMS);
        let new_tile = tile.apply_transform(xform);

        if (outside(new_tile.center))
            new_tiles.push(center_circle());
        else
            new_tiles.push(new_tile);
    }
    tiles = new_tiles;

    image(gfx, 0, 0);
}
