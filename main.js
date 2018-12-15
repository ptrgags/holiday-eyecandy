p5.disableFriendlyErrors = true;

let TILE_MAKERS = new CycleBuffer([
    new PointMaker(),
    new TraceMaker(),
    new RegularPolygonMaker(5, complex(0.5), complex(-0.5, 0.5)),
    new RegularPolygonMaker(4, complex(0.5), complex(-0.5, 0.5)),
    new RegularPolygonMaker(3, complex(0.5), complex(-0.5, 0.5)),
]);

let TILE_ARRANGERS = new CycleBuffer([
    new RandomCircleArranger(1000, 8.0),
    new RandomSquareArranger(1000, 8.0),
    new RandomSquareArranger(10, 8.0),
    new CenterArranger(10),
    new CenterArranger(1),
]);

let RENDERERS = new CycleBuffer([
    new ChaosGame(),
    new DFSRenderer(5, 5)
])

let IFS_LIST = new CycleBuffer([
    // Mobius Tracks
    new ParabolicTracks(complex(0.1), false),
    new ParabolicTracks(complex(0.01), true),
    new EllipticTracks(0.1, false),
    new EllipticTracks(0.02, true),
    new HyperbolicTracks(1.1, false),
    new HyperbolicTracks(1.05, true),
    new LoxodromicTracks(Complex.from_polar(1.1, 0.1), false),
    new LoxodromicTracks(Complex.from_polar(1.03, 0.07), true),

    // Frieze groups.
    // The first parameter is which frieze group
    // (see https://en.wikipedia.org/wiki/Frieze_group for info about
    // crystallographic notation).
    // the second parameter is the translation amount. I set
    // some of them larger so the basic tiles show up
    new Frieze("p1", 1.0),
    new Frieze("p1m1", 2.0),
    new Frieze("p11m", 1.0),
    new Frieze("p11g", 1.0),
    new Frieze("p2", 1.0),
    new Frieze("p2mg", 4.0),
    new Frieze("p2mm", 2.0),
]);

let VAR_NORMS = new CycleBuffer([
    new FrameCountNormalizer(100),
]);


let COLOR_MAPPERS = new CycleBuffer([
    new SineMapper(1),
    new SineMapper(4),
    new LinearMapper(1),
    new LinearMapper(4),
]);

let PALETTES = new CycleBuffer([
    new Gradient(['red'], ['blue'], true),
    new Gradient(['blue'], ['purple'], false),
    new Gradient(['blue'], ['green'], true),
]);

var SKETCH = new Sketch();

/**
 * Put all the pieces together
 */
function build() {
    // Choose a renderer
    let renderer = RENDERERS.current;

    // Get core components
    let tile_maker = TILE_MAKERS.current;
    let arranger = TILE_ARRANGERS.current;
    let ifs = IFS_LIST.current;

    // Build a color picker
    let var_norm = VAR_NORMS.current;
    let color_mapper = COLOR_MAPPERS.current;
    let palette = PALETTES.current;
    let color_picker = new ColorPicker(var_norm, color_mapper, palette);

    // Rebuild the sketch
    renderer.build(tile_maker, arranger, ifs, color_picker);
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
    cycle_options('T', 'G', VAR_NORMS);
    cycle_options('Y', 'H', COLOR_MAPPERS);
    cycle_options('U', 'J', PALETTES);
    if (key === "I") {
        SKETCH.scale_up();
        build();
    } else if (key === "K") {
        SKETCH.scale_down();
        build();
    }
}
