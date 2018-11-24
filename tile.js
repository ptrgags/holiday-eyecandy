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
        super();
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
        gfx.ellipse(
            this.center.x, 
            this.center.y, 
            2.0 * this.radius, 
            2.0 * this.radius);
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
