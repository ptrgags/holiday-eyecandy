p5.disableFriendlyErrors = true;

let TILE_MAKERS = new CycleBuffer([
    new TraceMaker(),
    new PointMaker(),
    new RegularPolygonMaker(5, complex(0.5)),
    new RegularPolygonMaker(4, complex(0.5)),
    new RegularPolygonMaker(3, complex(0.5)),
]);

let TILE_ARRANGERS = new CycleBuffer([
    new RandomCircleArranger(1000, 8.0),
    new RandomSquareArranger(1000, 8.0),
    new RandomSquareArranger(10, 8.0),
    new CenterArranger(complex(-1.0, 1.0), 10),
    new CenterArranger(complex(-1.0, 1.0), 1),
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

    // Apollonian Gasket
    new ApollonianGasket(),

    // Simple Affine Transformation fractals like the
    // Sierpinski triangle
    new AffineSquare(3),
    new AffineSquare(4),

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

    //new CosinePalette(rand_palette_settings())
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

function make_select(buffer, id) {
    let full_id = `#dropdown-${id}`;
    let dropdown = select(full_id);
    let sel = createSelect(dropdown);

    for (let [x, i] of buffer.all) {
        sel.option(x.label, i);
    }

    sel.changed(() => {
        let i = parseInt(sel.value());
        buffer.advance_to(i);
        build();
    });
}

function count_combos() {
    let buffers = [
        TILE_MAKERS,
        TILE_ARRANGERS,
        RENDERERS,
        IFS_LIST,
        VAR_NORMS,
        COLOR_MAPPERS,
        PALETTES
    ];
    // Compute the product of the sizes of all the buffers. That is the number
    // of possible combinations!
    let combos = buffers.map((x) => x.length).reduce((a, b) => a * b);

    select('#num-combos').html(combos.toLocaleString());
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    frameRate(10);

    SKETCH.setup(width, height);
    build();

    make_select(TILE_MAKERS, 'tile');
    make_select(TILE_ARRANGERS, 'arranger');
    make_select(RENDERERS, 'renderer');
    make_select(IFS_LIST, 'ifs');
    make_select(VAR_NORMS, 'variable');
    make_select(COLOR_MAPPERS, 'mapper');
    make_select(PALETTES, 'palette');

    count_combos();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    SKETCH.setup(width, height);
    build();
}

function draw() {
    SKETCH.draw();
    SKETCH.display();
}

function cycle_options(fwd_key, bwd_key, options_buffer) {
    if (key.toUpperCase() === fwd_key) {
        options_buffer.next();
        build();
    } else if (key.toUpperCase() === bwd_key) {
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

    // view controls
    if (key === "i") {
        SKETCH.scale_up();
        build();
    } else if (key === "k") {
        SKETCH.scale_down();
        build();
    } else if (key === " ") {
        SKETCH.toggle_axes();
        build();
    }
}

function mouseWheel(event) {
    if (event.delta > 0) {
        SKETCH.scale_down();
        build();
    } else if (event.delta < 0) {
        SKETCH.scale_up();
        build();
    }
}
