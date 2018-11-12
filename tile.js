/**
 * Interface for a tile
 */
class Tile {
    /**
     * Apply a transformation to a shape and 
     * return a NEW tile representing the result
     */
    apply_transform(xform) {
        throw new TypeError("Implement in subclass");
    }

    /**
     * Draw this tile to the screen
     */
    draw(gfx) {
        throw new TypeError("Implement in subclass");
    }
}

/**
 * Polygon class
 */
class Polygon extends Tile {
    /**
     * Make a polygon
     * the point list should not repeat the first vertex.
     */
    constructor(points) {
        this.points = points;
    }

    apply_transform(xform) {
        new_points = [];
        for (let point of this.points)
            new_points.push(xform.transform(point));

        return new Polygon(new_points);
    }

    draw(gfx) {
        gfx.beginShape(POINTS);
        for (let point of this.points)
            gfx.vertex(point.x, point.y);
        gfx.endShape(CLOSE);
    }
}
