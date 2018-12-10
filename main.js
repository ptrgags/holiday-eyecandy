let TILE_MAKERS = new CycleBuffer([ 
    new RegularPolygonMaker(5, complex(0.5), complex(0.0, 1.0)),
    new RegularPolygonMaker(4, complex(0.5), complex(0.0, 1.0)),
    new RegularPolygonMaker(3, complex(0.5), complex(0.0, 1.0)),
    new TraceMaker(),
]);

let TILE_ARRANGERS = new CycleBuffer([
    new CenterArranger(10),
    new CenterArranger(1),
    new RandomSquareArranger(10, 8.0),
    new RandomSquareArranger(1000, 8.0),
]);

let RENDERERS = new CycleBuffer([
    new ChaosGame(),
    new DFSRenderer(5, 5)
])

let IFS_LIST = new CycleBuffer([
    // Frieze groups
    new Frieze("p1", 1.0),
    new Frieze("p1m1", 1.0),
    new Frieze("p11m", 1.0),
    new Frieze("p11g", 1.0),
    new Frieze("p2", 1.0),
    new Frieze("p2mg", 1.0),
    new Frieze("p2mm", 1.0),

    // Mobius Tracks
    new ParabolicTracks(0),
    new ParabolicTracks(180),
    new EllipticTracks(0),
    new EllipticTracks(180),
    new HyperbolicTracks(0),
    new HyperbolicTracks(),
    new LoxodromicTracks(0),
    new LoxodromicTracks(),
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

/**
 * Put all the pieces together
 */
function build() {
    // Choose a renderer
    let renderer = RENDERERS.current;

    // Attach core components
    let tile_maker = TILE_MAKERS.current;
    let arranger = TILE_ARRANGERS.current;
    let ifs = IFS_LIST.current;
    renderer.build_core(tile_maker, arranger, ifs);


    // TODO: Add color

    // Rebuild the sketch
    SKETCH.build(renderer);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    frameRate(10);

    SKETCH.setup(width, height);
    build();
}

function draw() {
    SKETCH.draw();
    SKETCH.display();
}

function cycle_options(fwd_key, bwd_key, options_buffer) {
    if (key === fwd_key) {
        options_buffer.next();
        build();
    } else if (key === bwd_key) {
        options_buffer.previous();
        build();
    } 
}

function keyReleased() {
    console.log(key);
    cycle_options('Q', 'A', TILE_MAKERS);
    cycle_options('W', 'S', TILE_ARRANGERS);
    cycle_options('E', 'D', RENDERERS);
    cycle_options('R', 'F', IFS_LIST);
    if (key === "I") {
        SKETCH.scale_up();
        build();
    } else if (key === "K") {
        SKETCH.scale_down();
        build();
    } 
}
