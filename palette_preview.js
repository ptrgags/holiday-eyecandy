const PALETTE_WIDTH = 200;
const PALETTE_HEIGHT = 20;
const PALETTE_DT = 1.0 / PALETTE_WIDTH;


let palette_preview = function(sketch) {
    sketch.setup = function() {
        let canvas = sketch.createCanvas(PALETTE_WIDTH, PALETTE_HEIGHT);
        canvas.addClass('palette')
        let parent = sketch.select('#palette-preview');
        canvas.parent(parent);
    }

    sketch.draw = function() {
        let mapper = COLOR_MAPPERS.current;
        let palette = PALETTES.current;
        for (let i = 0; i < PALETTE_WIDTH; i++) {
            let raw_val = i * PALETTE_DT;
            let modulated = mapper.map_color(raw_val);
            let color = palette.lookup_color(modulated);
            sketch.stroke(color);
            sketch.noFill();
            sketch.line(i, 0, i, PALETTE_HEIGHT);
        }
    }
}

//let palette_sketch = new p5(palette_preview);
