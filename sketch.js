class Sketch {
    setup(width, height, unit_circle_radius=0.1) {
        this.width = width;
        this.height = height;
        this.gfx = createGraphics(width, height);
        this.circle_radius = unit_circle_radius;

        // Set up the complex plane
        this.start_complex_plane();
        this.gfx.background(0);
        this.draw_axes();
        this.finish_complex_plane();
    }

    /**
     * Draw on the buffer
     */
    draw() {
        this.start_complex_plane();

        // TODO: Delegate to Renderer

        this.finish_complex_plane();
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

    /**
     * Scaling factor
     */
    get scale_factor() {
        return this.circle_radius * this.height;
    }

    display() {
       image(this.gfx, 0, 0); 
    }
}
