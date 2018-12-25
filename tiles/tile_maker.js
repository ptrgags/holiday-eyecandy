/**
 * Abstract factory for making tiles.
 */
class TileMaker {
    make_tile(center) {
        throw new TypeError("Implement in Subclass");
    }
}

/**
 * A drawable shape that can be transformed by a transformation
 */
class Tile {
    constructor(center) {
        this.center = center;
    }

    /**
     * Apply a transformation to a shape and 
     * return a NEW tile representing the result
     */
    apply_transform(xform) {
        throw new TypeError("Implement in subclass");
    }

    /**
     * Draw this tile to the screen. A single color is provided
     */
    draw(gfx, color) {
        throw new TypeError("Implement in subclass");
    }
}
