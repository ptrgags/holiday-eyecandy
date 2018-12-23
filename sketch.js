class Sketch {
    constructor(camera) {
        this.camera = camera;
    }

    setup(width, height) {
        this.gfx = createGraphics(width, height);

        // Draw the background
        this.camera.clear_screen(this.gfx);

        // We don't have a renderer until the first call of build();
        this.renderer = null;
    }

    /**
     * Attach all the components and clear the screen.
     */
    build(renderer) {
        this.renderer = renderer;
        this.camera.clear_screen(this.gfx);
    }

    /**
     * Draw on the buffer
     */
    draw() {
        this.camera.start_complex_plane(this.gfx);

        if (this.renderer !== null)
            this.renderer.draw(this.gfx);

        this.camera.finish_complex_plane(this.gfx);
    }

    display() {
       image(this.gfx, 0, 0);
    }
}
