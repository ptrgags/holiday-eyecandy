class CircleMaker extends TileMaker {
    constructor(radius) {
        super()
        this.radius = radius;
    }

    make_tile(center) {
        return new Circle(center, this.radius);
    }

    get label() {
        return 'Circles';
    }

    get id() {
        return 'tile-circles';
    }
}

class Circle extends Tile {
    constructor(center, radius=1.0) {
        super(center);
        this.radius = radius;
    }

    /**
     * Get three points on this circle. This is used for computing
     * the new circle since mobius transformations might not map the center
     * to a new center
     */
    get three_points() {
        let angles = [0, Math.PI / 2.0, Math.PI];
        return angles.map((theta) => complex(
            this.center.real + this.radius * Math.cos(theta),
            this.center.imag + this.radius * Math.sin(theta)));
    }

    /**
     * Given three points on a circle, find the center.
     * this is done by solving the system of equations
     *
     * (a_x - h)^2 + (a_y - k)^2 = r^2
     * (b_x - h)^2 + (b_y - k)^2 = r^2
     * (c_x - h)^2 + (c_y - k)^2 = r^2
     *
     * for h and k. r can be found easily once h, k is found.
     */
    static find_center(a, b, c) {
        /**
         * Subtracting the third equation from the first two and simplifying,
         * we have:
         *
         * 2(c_x - a_x)h + 2(c_y - a_y)k = |c|^2 - |a|^2
         * 2(c_x - b_x)h + 2(c_y - b_y)k = |c|^2 - |b|^2
         *
         * We can reduce this to the form:
         *  [Ax Ay] [h] = [rhs_x]
         *  [Bx By] [k]   [rhs_y]
         *
         *    A      x  = b
         * which can be solved by computing the inverse
         *           x  = A^(-1) b
         *
         * where A^(-1) = [By -Ay] / det(A)
         *                [-Bx Ax]
         */
        let norm_a = a.modulus_squared;
        let norm_b = b.modulus_squared;
        let norm_c = c.modulus_squared;
        let rhs_x = norm_c - norm_a;
        let rhs_y = norm_c - norm_b;

        let Ax = 2 * (c.real - a.real);
        let Ay = 2 * (c.imag - a.imag);
        let Bx = 2 * (c.real - b.real);
        let By = 2 * (c.imag - b.imag);

        let det = Ax * By - Ay * Bx;


        // Apply the inverse matrix to the rhs to get h, k
        let h = (By * rhs_x - Ay * rhs_y) / det;
        let k = (Ax * rhs_y - Bx * rhs_x) / det;
        return complex(h, k);
    }

    apply_transform(xform) {
        // Transform three points on the circle and then compute
        // the new center and radius. This is because mobius transformations
        // do not move points uniformly.
        let new_points = this.three_points.map(xform.transform_point, xform);
        let new_center = Circle.find_center(...new_points);

        // r = |A - O| = |B - O| = |C - O| so let's just use the first point,
        // r = |A - O|
        let new_radius = new_center.sub(new_points[0]).modulus;
        return new Circle(new_center, new_radius);
    }

    draw(gfx, color) {
        gfx.stroke(color);
        gfx.noFill();
        gfx.ellipse(
            this.center.real,
            this.center.imag,
            2 * this.radius,
            2 * this.radius);
    }
}
