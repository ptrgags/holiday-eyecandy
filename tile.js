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

class Point extends Tile {
    constructor(pos) {
        super();
        this.pos = pos;
        this.WIDTH = 0.001;
    }

    apply_transform(xform) {
        let new_pos = xform.transform(this.pos);
        return new Point(new_pos);
    }

    draw(gfx) {
        gfx.stroke(255);
        gfx.fill(255);
        gfx.ellipse(this.pos.x, this.pos.y, this.WIDTH, this.WIDTH);
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
        super();
        this.points = points;
    }

    apply_transform(xform) {
        let new_points = [];
        for (let point of this.points)
            new_points.push(xform.transform(point));

        return new Polygon(new_points);
    }

    draw(gfx) {
        gfx.beginShape();
        for (let point of this.points)
            gfx.vertex(point.x, point.y);
        gfx.endShape(CLOSE);
    }

    toString() {
        let coords = this.points.map((p) => `(${p.x}, ${p.y})`).join('\n');
        return `Polygon\n${coords}`;
    }

    /**
     * Make a regular polygon using the n roots of unity
     * the points will be arranged around the unit circle
     */
    static make_regular(n) {
        let roots_of_unity = Complex.one().roots(n);
        let vertices = roots_of_unity.map((x) => x.coords);
        return new Polygon(vertices);
    }
}

/**
 * Circle for regular affine transforms
 */
class Circle extends Tile {
    constructor(center, radius) {
        super();
        this.center = center;
        this.radius = radius;
    }

    apply_transform(xform) {
        let new_center = xform.transform(this.center);

        //TODO: how to update the radius?
        return new Circle(new_center, this.radius);
    }

    draw(gfx) {
        gfx.noStroke();
        gfx.ellipse(
            this.center.x, 
            this.center.y, 
            2.0 * this.radius, 
            2.0 * this.radius);
    }
}

class Trace extends Tile {
    constructor(pos, last_pos=null) {
        super();
        this.pos = pos;
        this.last_pos = last_pos;
    }

    apply_transform(xform) {
        let new_pos = xform.transform(this.pos);
        return new Trace(new_pos, this.pos);
    }

    draw(gfx) {
        gfx.stroke(255);
        gfx.noFill();
        if (this.last_pos !== null)
            gfx.line(this.last_pos.x, this.last_pos.y, this.pos.x, this.pos.y);
    }
}

/**
 * Generalized Circle/Line for use with Mobius transforms
 */
class Cline extends Tile {
    constructor(center, radius, color) {
        super();
        this.center = center;
        this.radius = radius;
        this.color = color;
    }

    apply_transform(xform) {
        // Make sure we have a Mobius Transformation
        if (!(xform instanceof MobiusTransform))
            throw TypeError(
                "Generalized circles only work with MobiusTransform");
        let [a, b, c, d] = xform.coeffs;

        let r = Complex.from_real(this.radius);
        let P = Complex.from_vec(this.center);

        // Find the new center
        // TODO: how does this work exactly?
        let r_sqr = r.mult(r);
        let dc = d.div(c);
        let bottom = dc.add(P).conj;
        let frac = r_sqr.div(bottom);
        let z = P.sub(frac);
        let new_center = xform.transform(z.coords);
        let Q = Complex.from_vec(new_center);

        // Find the new radius
        let right_point = P.add(r);
        let right_xformed = Complex.from_vec(
            xform.transform(right_point.coords));
        let new_radius = Q.sub(right_xformed).modulus;

        return new Cline(new_center, new_radius, this.color);
    }

    draw(gfx) {
        // Fill in the circle
        //gfx.fill(this.color);
        //gfx.stroke(0);

        //TODO: How to handle lines?
        gfx.ellipse(
            this.center.x, 
            this.center.y, 
            2.0 * this.radius, 
            2.0 * this.radius);
    }

    toString() {
        let P = Complex.from_vec(this.center);
        return `Cline[${P.toString()}, ${this.radius}]`;
    }
}
