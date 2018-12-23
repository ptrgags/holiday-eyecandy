/**
 * 2D "Camera" that handles panning/zooming the complex plane
 */
class Camera {
    setup(width, height) {
        // For debugging, display the origin
        this.axes_enabled = false;

        // zoom multiplier per zoom step
        this.ZOOM_STEP = 1.25;

        // Save the minimum dimension for computing the scaling factor
        this.min_dim = Math.min(width, height);

        // Location in screen space where the origin is
        this.center = {x: width / 2, y: height / 2};

        // In the middle of panning, this stores the distance
        // from this.center on the screen.
        this.delta = {x: 0, y: 0};

        // zoom amount
        this.zoom = 0.1;
    }

    pan_move(event) {
        // event.deltaX is the distance from the last center,
        // so just update delta
        this.delta.x = event.deltaX;
        this.delta.y = event.deltaY;
    }

    pan_end(event) {
        // The user stopped draging, so move the center to this location
        this.center.x += event.deltaX;
        this.center.y += event.deltaY;
        this.delta = {x: 0, y: 0};
    }

    clear_screen(gfx) {
        this.start_complex_plane(gfx);
        gfx.background(0);
        if (this.axes_enabled)
            this.draw_axes(gfx)
        this.finish_complex_plane(gfx);
    }

    start_complex_plane(gfx) {
        gfx.push();

        // Pan the complex plane
        gfx.translate(
            this.center.x + this.delta.x,
            this.center.y + this.delta.y);

        // Scale by the zoom level and flip y while we're at it
        gfx.scale(this.scale_factor, -1 * this.scale_factor);

        // Fix the stroke weight
        gfx.strokeWeight(1.0 / this.scale_factor);
    }

    /**
     * Draw the unit circle and axes
     */
    draw_axes(gfx) {
        // Drawing in white
        gfx.noFill();
        gfx.stroke(255);

        // Draw the unit circle (width and height 2)
        gfx.ellipse(0, 0, 2, 2);

        // Draw x- and y-axes
        gfx.line(-10, 0, 10, 0);
        gfx.line(0, -10, 0, 10);
    }

    finish_complex_plane(gfx) {
        gfx.pop();
    }

    get scale_factor() {
        return this.zoom * this.min_dim;
    }

    zoom_in(steps=1) {
        this.zoom *= steps * this.ZOOM_STEP;
    }

    zoom_out(steps=1) {
        this.zoom /= steps * this.ZOOM_STEP;
    }

    toggle_axes() {
        this.axes_enabled = !this.axes_enabled;
    }
}
