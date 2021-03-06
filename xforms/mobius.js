class MobiusTransform extends Transform {
    constructor(coeffs) {
        super();
        this.coeffs = coeffs;
    }
    
    transform_point(z) {
        let [a, b, c, d] = this.coeffs;
        let numerator = a.mult(z).add(b);
        let denominator = c.mult(z).add(d);

        return numerator.div(denominator);
    }

    get is_invertible() {
        return true;
    }

    /**
     * Mobius Transformations have a well-defined inverse:
     *
     * az + b                   dz - b
     * ------  --- inverse --> -------
     * cz + d                  -cz + a
     */
    get inverse() {
        let [a, b, c, d] = this.coeffs;
        return new MobiusTransform([
            d, b.neg,
            c.neg, a
        ]);
    }

    /**
     * az + b   ez + f   (ae + bg)z + (af + bh)
     * ------ * ------ = ----------------------
     * cz + d   gz + h   (ce + dg)z + (cf + dh)
     */
    multiply_xforms(other) { 
        let [a, b, c, d] = this.coeffs;
        let [e, f, g, h] = other.coeffs;

        // Do the multiplications
        let results = [ 
            a.mult(e).add(b.mult(g)),
            a.mult(f).add(b.mult(h)),
            c.mult(e).add(d.mult(g)),
            c.mult(f).add(d.mult(h))
        ];

        return new MobiusTransform(results); 
    }

    /**
     * Chain transformations.
     * If the other xform is a MobiusTransform, they can be combines
     * via complex matrix multiplication
     */
    then(xform) {
        return xform.multiply_xforms(this);
    }

    /**
     * If this is transform T, and xform is another invertible mobius 
     * transformation R, 
     * compute T' = R * T * R^-1 to compute T in the space of R
     */
    conjugate_by(xform) {
        let inv = xform.inverse;
        return inv.then(this).then(xform);
    }

    get str() {
        let [a, b, c, d] = this.coeffs;
        let top_string = `${a.str}z + ${b.str}`;
        let bottom_string = `${c.str}z + ${d.str}`;
        let n = Math.max(top_string.length, bottom_string.length);
        let dashes = "-".repeat(n);
        return `${top_string}\n${dashes}\n${bottom_string}`;
    }

    /**
     *        1z + 0
     * f(z) = ------ = z
     *        0z + 1
     */
    static identity() {
        return new MobiusTransform([
            Complex.one(), Complex.zero(),
            Complex.zero(), Complex.one()]);
    }

    /**
     * Implement a similitude by only using the top of the fraction only
     *                 az + b
     * f(z) = az + b = ------
     *                 cz + d
     *
     * aka "similarity transformation" or "homothety"
     */
    static similitude(a, b) {
        return new MobiusTransform([
            a, b,
            Complex.zero(), Complex.one()]);
    }

    /**
     * Quarter turn CCW around the x-axis on the Riemann sphere
     */
    static x90() {
        return new MobiusTransform([
            complex.i(), complex.neg_one(),
            complex.neg_one(), complex.i(),
        ]);
    }

    /**
     * Construct a Mobius transformation that performs a 90 degree rotation
     * CCW around the y-axis on the Riemann sphere
     */
    static y90() {
        return new MobiusTransform([
            Complex.one(), Complex.one(), 
            Complex.neg_one(), Complex.one()
        ]);
    }

    /**
     * 90 degree CCW rotation around the y-axis on the Rieman sphere
     */
    static z90() {
        return new MobiusTransform([
            Complex.i(), Complex.zero(),
            Complex.zero(), Complex.one()
        ]);
    }

    /**
     * Pure translation by b
     *
     * this matrix will always have determinant 1
     */
    static pure_translation(b) {
        return new MobiusTransform([
            Complex.one(), b,
            Complex.zero(), Complex.one()
        ]);
    }

    /**
     * Pure scaling by a real number
     *
     * This is normalized to have determinant 1
     *
     * TODO: Still need to define Complex.sqrt()
     */
    static pure_scale(k) {
        let root = Complex.from_real(Math.sqrt(k));
        return new MobiusTransform([
            root, Complex.zero(),
            Complex.zero(), root.inv
        ]);
    }

    /**
     * The transformation f(z) = 1/z
     *
     * This is implemented as
     *
     * [0 i] so it will have determinant 1 intstead of -1
     * [i 0]
     *
     * On the sphere, this is a 180 degree rotation around the
     * x-axis.
     *
     * On the complex plane, this is an inversion in the unit circle
     * followed by a complex conjugation.
     */
    static x180() {
        return new MobiusTransform([
            Complex.zero(), Complex.i(),
            Complex.i(), Complex.zero()
        ]);
    }

    /**
     * The transform f(z) = -z
     *
     * This is implemented as
     *
     * [i  0] to have determinant 1
     * [0 -i]
     *
     * This is a 180 degree rotation around the z-axis on the sphere
     *
     * This is a 180 degree rotation about the origin on the plane
     */
    static z180() {
        return new MobiusTransform([
            Complex.i(), Complex.zero(),
            Complex.zero(), Complex.i().neg,
        ]);
    }
}
