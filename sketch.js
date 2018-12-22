class Sketch {
    setup(width, height, unit_circle_radius=0.1) {
        this.width = width;
        this.height = height;
        this.gfx = createGraphics(width, height);
        this.circle_radius = unit_circle_radius;

        // Draw the background
        this.clear_screen();

        // We don't have a renderer until the first call of build();
        this.renderer = null;

        // Enable drawing the axes
        this.axes_enabled = true;

        this.RESCALE_AMOUNT = 1.25;
    }

    /**
     * Clear the screen and redraw axes
     */
    clear_screen() {
        // Set up the complex plane
        this.start_complex_plane();
        this.gfx.background(0);
        if (this.axes_enabled)
            this.draw_axes();
        this.finish_complex_plane();
    }

    /**
     * Attach all the components and clear the screen.
     */
    build(renderer) {
        this.renderer = renderer;
        this.clear_screen();
    }

    /**
     * Draw on the buffer
     */
    draw() {
        this.start_complex_plane();

        if (this.renderer !== null)
            this.renderer.draw(this.gfx);

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

    /**
     * zoom in a little
     */
    scale_up(n=1) {
        this.circle_radius *= n * this.RESCALE_AMOUNT;
        this.clear_screen();
    }

    /**
     * Zoom out a little
     */
    scale_down(n=1) {
        this.circle_radius /= n * this.RESCALE_AMOUNT;
        this.clear_screen();
    }

    toggle_axes() {
        this.axes_enabled = !this.axes_enabled;
        this.clear_screen();
    }
}
