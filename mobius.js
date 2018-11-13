class MobiusTransform extends Transform {
    constructor(coeffs) {
        super();
        this.coeffs = coeffs;
    }
    
    transform(vec) {
        let z = new Complex(vec);

        let [a, b, c, d] = this.coeffs;
        let numerator = a.mult(z).add(b);
        let denominator = c.mult(z).add(d);

        let result = numerator.div(denominator);
        return result.coords; 
    }

    /**
     * az + b   ez + f   (ae + bg)z + (af + bh)
     * ------ * ------ = ----------------------
     * cz + d   gz + h   (ce + dg)z + (cf + dh)
     */
    multiply_xforms(xform) { 
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

    then(xform) {
        if (xform instanceof MobiusTransform) {
            return multiply_xforms(xform);
        } else if (xform instanceof TransformationChain) {
            return xform.after(this);
        } else {
            // Start a transformation chain
            return new TransformationChain([this, xform]);
        }
    }

    static identity() {
        let a = new Complex(1, 0);
        let b = new Complex(0, 0);
        let c = new Complex(0, 0);
        let d = new Complex(0, 1);
        return new MobiusTransform([a, b, c, d]);
    }
}
