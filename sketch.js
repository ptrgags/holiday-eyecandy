class Sketch {
    setup(width, height) {
        this.gfx = createGraphics(width, height);
        this.width = width;
        this.height = height;
        this.xforms = this.make_xforms();
        this.tiles = this.make_tiles();
        this.renderer = this.make_renderer(this.xforms, this.tiles);
    }

    /**
     * Draw on the buffer
     */
    draw() {
        this.renderer.draw(this.gfx);
    }

    /**
     * Every sketch in this fractal program will need a TransformList
     * of some sort. return one from this method
     */
    make_xforms() {
        throw new TypeError("Implement in subclass");
    }

    /**
     * Get a list of the initial tile(s) to use for rendering
     */
    make_tiles() {
        throw new TypeError("Implement in subclass");
    }
    
    /**
     * Subclasses pick which rendering method to use
     */
    make_renderer(xforms, tiles) {
        throw new TypeError("Implement in subclass"); 
    }

    /**
     * Display the buffer
     */
    display() {
       image(this.gfx, 0, 0); 
    }
}

/**
 * Sketch with extra commands for displaying the complex plane
 */
class ComplexPlaneSketch extends Sketch {
    /**
     * Set up the unit circle with 
     */
    constructor(unit_circle_size=0.2) {
        super();
        this.circle_size = unit_circle_size;
    }

    /**
     * Scaling factor
     */
    get scale_factor() {
        return this.circle_size * this.height;
    }

    /**
     * Translate and scale the graphics environment
     */
    start_complex_plane() {
        this.gfx.push()
        this.gfx.translate(this.width / 2, this.height / 2);

        // Scale and flip the y-coordinate
        this.gfx.scale(this.scale_factor, -1 * this.scale_factor);

        // Fix the stroke weight
        this.gfx.strokeWeight(1.0 / this.scale_factor);
    }

    /**
     * Draw the unit circle and axes
     */
    draw_axes() {
        // Drawing white
        this.gfx.noFill();
        this.gfx.stroke(255);

        // Draw the unit circle (width and height 2)
        this.gfx.ellipse(0, 0, 2, 2);

        // Draw x- and y-axes
        this.gfx.line(-10, 0, 10, 0);
        this.gfx.line(0, -10, 0, 10);
    }

    /**
     * reset the complex plane environment
     */
    finish_complex_plane() {
        this.gfx.pop();
    }

    setup(width, height) {
        super.setup(width, height); 
        this.start_complex_plane();
        this.gfx.background(0);
        this.draw_axes();
        this.finish_complex_plane();
    }

    draw() {
        this.start_complex_plane();
        super.draw();
        this.finish_complex_plane();
    }
}
