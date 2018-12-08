/**
 * Generalization of the complex numbers
 * where i^2 can be some number other than -1. 
 *
 * This includes elements of C and Q[sqrt(n)] though
 * it's a bit ill-defined if n is positive. Oh well, this is an experiment!
 *
 */
class Complex {
    constructor(a, b=0.0, i_squared=-1) {
        // for convenience
        this.x = a;
        this.y = b;
        this.i_squared = i_squared;
    }

    // to be clear
    get real() {
        return this.x;
    }

    get imag() {
        return this.y;
    }
    
    /**
     * Complex conjugate: Flip the y-coordinate
     */
    get conj() {
        return new Complex(this.real, -this.imag, this.i_squared);
    }

    /**
     * Get the inverse of this complex number, 
     * that is 1/z
     */
    get inv() {
        return Complex.one().div(this)
    }

    /**
     * |z|^2 = z * z.conj = z dot z
     */
    get modulus_squared() {
        return this.dot(this);
    }

    /**
     * Modulus:
     * |z| = sqrt(z * z.conj)
     */
    get modulus() {
        return Math.sqrt(this.modulus_squared);
    }

    /**
     * Get the principal argument of 
     * this complex number
     */
    get arg() {
        // TODO: Does this generalize to other adjoined roots?
        return Math.atan2(this.imag, this.real);
    }

    /**
     * Compute the n nth roots of this complex number
     *
     * root(z, n) = root(|z|, n) * exp(i * (arg(z) + theta_k))
     *
     * theta_k = 2 * pi * k / n, k is an integer in the range [0, n - 1]
     */
    roots(n) {
        //TODO: Does this generalize to other adjoined roots?
        let results = [];
        let r = Math.sqrt(this.modulus);
        let theta = this.arg;
        for (let k = 0; k < n; k++) { 
            let theta_k = 2 * Math.PI * k / n;
            results.push(Complex.from_polar(r, theta + theta_k));
        }
        return results;
    }

    /**
     * Dot product
     * z dot w = Re(z * w.conj)
     */
    dot(other) {
        return this.mult(other.conj).real;
    }

    /**
     * tranformation f(z) = -z
     */
    get neg() {
        return new Complex(-this.real, -this.imag, this.i_squared);
    }

    /**
     * Complex numbers add like vectors do
     */
    add(other) {
        if (other.i_squared != this.i_squared)
            throw new TypeError("add: unequal i^2 values!");

        let a = this.real + other.real;
        let b = this.imag + other.imag;
        return new Complex(a, b, this.i_squared);
    }

    sub(other) {
        if (other.i_squared != this.i_squared)
            throw new TypeError("sub: unequal i^2 values!");

        let a = this.real - other.real;
        let b = this.imag - other.imag;
        return new Complex(a, b, this.i_squared);
    }

    get str() {
        return `(${this.real.toPrecision(3)} + ${this.imag.toPrecision(3)}i)`
    }

    /**
     * (a + b sqrt(n)) * (c + d sqrt(n)) = (ac + bdn) + (ad + bc) sqrt(n)
     */
    mult(other) {
        if (other.i_squared != this.i_squared)
            throw new TypeError("mult: unequal i^2 values!");

        let a = this.real * other.real 
            + this.i_squared * this.imag * other.imag;
        let b = this.real * other.imag + this.imag * other.real;

        return new Complex(a, b, this.i_squared);
    }

    /**
     * z / w = (z * w.conj) / |w|^2
     */
    div(other) {
        if (other.i_squared != this.i_squared)
            throw new TypeError("div: unequal i^2 values!");

        // Numerator is a Complex number
        let numerator = this.mult(other.conj);
        // Denominator is a Number
        let denominator = other.modulus_squared;

        let a = numerator.real / denominator;
        let b = numerator.imag / denominator;

        return new Complex(a, b, this.i_squared); 
    }

    static one(i_squared=-1) {
        return new Complex(1, 0, i_squared);
    }

    static neg_one(i_squared=-1) {
        return new Complex(-1, 0, i_squared);
    }

    static i(i_squared=-1) {
        return new Complex(0, 1, i_squared);
    }

    static neg_i(i_squared=-1) {
        return new Complex(0, -1, i_squared);
    }

    static zero(i_squared=-1) {
        return new Complex(0, 0, i_squared);
    }

    static from_polar(r, theta, i_squared=-1) {
        let a = r * Math.cos(theta);
        let b = r * Math.sin(theta);
        return new Complex(a, b, i_squared);
    }

    static from_real(r, i_squared=-1) {
        return new Complex(r, 0, i_squared);
    }

    static from_vec(v, i_squared=-1) {
        return new Complex(v.x, v.y, i_squared);
    }
}

/**
 * shortcut so I don't have to type "new" a bajillion times
 */
function complex(a, b=0.0, i_squared=-1) {
    return new Complex(a, b, i_squared);
}
