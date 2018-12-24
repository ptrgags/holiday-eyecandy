p5.disableFriendlyErrors = true;
let FPS = 10;

let TILE_MAKERS = new CycleBuffer([
    new TraceMaker(),
    new PointMaker(),
    new RegularPolygonMaker(5, complex(0.5)),
    new RegularPolygonMaker(4, complex(0.5)),
    new RegularPolygonMaker(3, complex(0.5)),
    new CircleMaker(),

    // Rose Curves
    new RoseMaker(3, 2),
    new RoseMaker(7, 1),
    new RoseMaker(6, 5),
    new RoseMaker(5, 9),
    new RoseMaker(2, 8),

    // Lisajous Curves
    new LissajousMaker(3, 2),
    new LissajousMaker(8, 7),
    new LissajousMaker(6, 7),
    new LissajousMaker(4, 8),
    new LissajousMaker(8, 6),
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
    // Render at most 1M tiles over the course of 30 seconds
    new DFSRenderer(1000000, 30 * FPS)
])

let IFS_LIST = new CycleBuffer([
    // Mobius Tracks
    new EllipticTracks(0.1, false),
    new EllipticTracks(0.02, true),
    new HyperbolicTracks(1.1, false),
    new HyperbolicTracks(1.05, true),
    new ParabolicTracks(complex(0.1), false),
    new ParabolicTracks(complex(0.01), true),
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

    // Apollonian Gasket
    new ApollonianGasket(),

    // Simple Affine Transformation fractals like the
    // Sierpinski triangle
    new AffineSquare(3),
    new AffineSquare(4),
]);

let VAR_NORMS = new CycleBuffer([
    new FrameCountNormalizer(100),
    new NumTilesNormalizer(1000),
    new IterationNormalizer(),
    new PositionNormalizer('x', 10.0),
    new PositionNormalizer('y', 10.0),
    new PositionNormalizer('r', 10.0),
    new PositionNormalizer('theta', 2.0 * Math.PI),
]);


let COLOR_MAPPERS = new CycleBuffer([
    new SineMapper(1),
    new SineMapper(4),
    new LinearMapper(1),
    new LinearMapper(4),
    new CantorMapper(3, 3),
    new NoiseMapper()
]);

let PALETTES = new CycleBuffer([
    new Gradient('HSB Rainbow', 'hsb-rainbow', ['red'], ['blue'], true),
    new Gradient('Blue and Purple', 'blue-purple', ['blue'], ['purple'], false),
    new Gradient('Blue and Green', 'blue-green', ['blue'], ['green'], true),
    new Gradient('Black and Red', 'black-red', ['black'], ['red'], false),
    new Gradient('Cyan and Orange', 'cyan-orange', ['cyan'], ['orange'], false),
    new Gradient(
        'Purple and Gold', 'royal', ['purple'], ['yellow'], false),
    new Gradient('Grayscale', 'grayscale', ['black'], ['white'], false),
    new CosinePalette('Steel', 'steel',
        [0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [1.0, 1.0, 1.0], [0.1, 0.2, 0.3]),
    new CosinePalette('Watermelon', 'watermelon',
        [0.5, 0.5, 0.0], [0.5, 0.5, 0.3], [1.0, 0.6, 1.0], [0.4, 0.2, 0.4]),
    new CosinePalette('Violet Teal', 'violet-teal',
        [0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [0.2, 0.5, 0.4], [0.6, 0.1, 0.8]),
    new CosinePalette('Red and Yellow', 'red-yellow',
        [0.5, 0.5, 0.0], [0.5, 0.5, 0.1], [0.1, 0.8, 0.9], [0.9, 0.6, 0.9]),
    new CosinePalette('Random Cosine', 'rand-cosine'),
]);

// List of all buffers since we sometimes need to iterate over all the
// dropdowns
let BUFFERS = [
    TILE_MAKERS,
    TILE_ARRANGERS,
    RENDERERS,
    IFS_LIST,
    VAR_NORMS,
    COLOR_MAPPERS,
    PALETTES
];
let BUFFER_IDS = [
    'tile',
    'arranger',
    'renderer',
    'ifs',
    'variable',
    'mapper',
    'palette'
];

let CAMERA = new Camera();
let SKETCH = new Sketch(CAMERA);

// Encode the settings as a base64 encoded array of indices. These
// correspond to the positions in the
function update_settings_code() {
    let indices = BUFFERS.map((x) => x.index);
    let json = JSON.stringify(indices);
    let b64 = btoa(json);
    select('#current-settings').html(b64);
}

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

    // Update the settings code
    update_settings_code();

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

    // Compute the product of the sizes of all the buffers. That is the number
    // of possible combinations!
    let combos = BUFFERS.map((x) => x.length).reduce((a, b) => a * b);

    select('#num-combos').html(combos.toLocaleString());
}

var gestures;

var center;
var delta = {x: 0, y: 0};

function init_gestures() {
    center = {x: width / 2, y: height / 2};

    // Set up touch gestures
    let canvas = select('#defaultCanvas0').elt;
    gestures = new Hammer(canvas, {preventDefault: true});

    // Pan to pan the camera
    gestures.get('pan').set({'direction': Hammer.DIRECTION_ALL});
    gestures.on('panmove', (event) => {
        CAMERA.pan_move(event);
    });
    gestures.on('panend', (event) => {
        CAMERA.pan_end(event);
        build();
    });

    // pinch to zoom the camera
    gestures.get('pinch').set({ enable: true });
    gestures.on('pinchend', (event) => {
        CAMERA.change_zoom(event.scale);
        build();
    });
}

function make_preset_dropdown() {
    let dropdown = select('#dropdown-preset');
    let sel = createSelect(dropdown);
    for (let [i, preset] of PRESETS.entries()) {
        sel.option(preset.label, i);
    }
    sel.changed(() => {
        let i = parseInt(sel.value());
        let preset = PRESETS[i];
        // Look up the settings indices from the cycle buffer
        let settings = preset.settings.map(
            (id, i) => BUFFERS[i].find_index(id));
        load_preset(settings);
    });
}

/**
 * Initialize setting presets and the load button
 */
function init_settings() {

    make_preset_dropdown();

    // Handle loading settings
    select('#btn-load-settings').mouseClicked(() => {
        let text = select('#txt-load-settings').value();
        try {
            // Decode the settings array
            let decoded = JSON.parse(atob(text));

            // unselect the current preset
            select('#dropdown-preset').value("");

            // Load a fake preset from the decoded settings
            load_preset(decoded);
        } catch(e) {
            console.log(e);
            alert('Not a valid settings code. '
                + 'Copy and paste a code from "Current Settings"')
        }
    });
}

function load_preset(settings) {
    // Validate the input array since this comes from user input
    if (!Array.isArray(settings)) {
        throw new TypeError("settings must be an array");
    }
    if (settings.length != BUFFERS.length) {
        throw new TypeError(
            `preset.settings must have exactly ${BUFFERS.length} settings`);
    }

    for (let i = 0; i < BUFFERS.length; i++) {
        let id = BUFFER_IDS[i];
        let full_id = `#dropdown-${id}`;
        let val = settings[i];

        // Set the buffers and UI to the setting from the preset
        BUFFERS[i].advance_to(val);
        select(full_id).value(val);
        build();
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    frameRate(FPS);

    init_gestures();
    init_settings();

    CAMERA.setup(width, height);
    SKETCH.setup(width, height);
    build();

    for (let i = 0; i < BUFFERS.length; i++) {
        let buffer = BUFFERS[i];
        let id = BUFFER_IDS[i];
        make_select(buffer, id);
    }

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

function mouseWheel(event) {
    if (event.delta > 0) {
        CAMERA.zoom_out();
        build();
    } else if (event.delta < 0) {
        CAMERA.zoom_in();
        build();
    }
}
