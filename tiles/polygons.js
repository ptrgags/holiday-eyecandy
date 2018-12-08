class RegularPolygonMaker extends TileMaker {
    constructor(sides, mult, offset) {
        super();
        this.sides = sides;
        this.mult = mult;
        this.offset = offset;
    }

    make_tile(center) {
        let unit_poly = Polygon.make_regular(this.sides, center);
        let xform = new ComplexTransform(this.mult, this.offset);
        return unit_poly.apply_transform(xform);
    }
}

/**
 * Polygon class
 */
class Polygon extends Tile {
    /**
     * Make a polygon
     * The vertices are specified in world space.
     *
     */
    constructor(center, points) {
        super(center);
        this.points = points;
    }

    apply_transform(xform) {
        let new_center = xform.transform_point(this.center);
        let new_points = this.points.map((x) => xform.transform_point(x));
        return new Polygon(new_center, new_points);
    }

    draw(gfx, color) {
        gfx.beginShape();
        gfx.fill(color);
        gfx.stroke(color);
        for (let point of this.points) {
            gfx.vertex(point.x, point.y);
        }
        gfx.endShape(CLOSE);
    }

    get str() {
        let coords = this.points.map((p) => p.str).join('\n');
        return `Polygon @ ${this.center.str}, \n${coords}`;
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
