class RegularPolygonMaker extends TileMaker {
    constructor(sides, mult=complex(1.0), offset=complex(0.0)) {
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

    get label() {
        if (this.sides === 3) {
            return "Triangles";
        } else if (this.sides === 4) {
            return "Squares";
        } else if (this.sides === 5) {
            return "Pentagons";
        } else if (this.sides === 6) {
            return "Hexagons";
        } else {
            // I don't want to sit here forever.
            return `${this.sides}-gons`;
        }
    }

    get id() {
        if (this.sides === 3) {
            return "tile-triangles";
        } else if (this.sides === 4) {
            return "tile-squares";
        } else if (this.sides === 5) {
            return "tile-pentagons";
        } else if (this.sides === 6) {
            return "tile-hexagons";
        } else {
            // I don't want to sit here forever.
            return `tile-${this.sides}-gons`;
        }
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
    constructor(center, points, fill=true, close=true) {
        super(center);
        this.points = points;
        this.fill = fill;
        this.close = close;
    }

    apply_transform(xform) {
        let new_center = xform.transform_point(this.center);
        let new_points = this.points.map((x) => xform.transform_point(x));
        return new Polygon(new_center, new_points, this.fill, this.close);
    }

    draw(gfx, color) {
        gfx.beginShape();

        if (this.fill) {
            gfx.fill(color);
            gfx.stroke('black');
        } else {
            gfx.stroke(color);
            gfx.noFill();
        }

        for (let point of this.points) {
            gfx.vertex(point.x, point.y);
        }

        if(this.close)
            gfx.endShape(CLOSE);
        else
            gfx.endShape();
    }

    get str() {
        let coords = this.points.map((p) => p.str).join('\n');
        return `Polygon @ ${this.center.str}, \n${coords}`;
    }

    /**
     * Make a regular polygon using the n roots of unity
     * the points will be arranged around the unit circle,
     * then translated by center
     */
    static make_regular(n, center) {
        let vertices = Complex.one().roots(n);
        let translated = vertices.map((x) => x.add(center));
        return new Polygon(center, translated);
    }
}
