class RegularPolygonMaker extends TileMaker {
    constructor(sides) {
        super();
        this.sides = 4;
    }

    make_tile(center) {
        return Polygon.regular(this.sides, center);
    }
}

/**
 * Polygon class
 */
class Polygon extends Tile {
    /**
     * Make a polygon
     * The vertices are specified RELATIVE to CENTER
     */
    constructor(center, points) {
        super(center);
        this.points = points;
    }

    apply_transform(xform) {
        let new_center = xform.transform_point(this.center);
        return new Polygon(new_center, this.points);
    }

    draw(gfx, color) {
        gfx.beginShape();
        gfx.fill(color);
        gfx.stroke(color);
        for (let point of this.points) {
            let result = point.add(this.center);
            gfx.vertex(result.x, result.y);
        }
        gfx.endShape(CLOSE);
    }

    toString() {
        let coords = this.points.map((p) => p.toString()).join('\n');
        return `Polygon @ ${this.center.toString()}, \n${coords}`;
    }

    /**
     * Make a regular polygon using the n roots of unity
     * the points will be arranged around the unit circle
     *
     * the first root will always be 1 + 0i
     */
    static make_regular(n, center) {
        let vertices = Complex.one().roots(n);
        return new Polygon(center, vertices);
    }
}
