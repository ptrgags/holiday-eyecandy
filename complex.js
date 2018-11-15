/**
 * Generalization of the complex numbers
 * where i^2 can be some number other than -1. 
 *
 * This includes elements of C and Q[sqrt(n)] though
 * it's a bit ill-defined if n is positive. Oh well, this is an experiment!
 *
 * This class wraps a p5.Vector
 */
class Complex {
    constructor(a, b, i_squared=-1) {
        this.coords = createVector(a, b);
        this.i_squared = i_squared;
    }

    get real() {
        return this.coords.x;
    }

    get imag() {
        return this.coords.y;
    }
    
    /**
     * Complex conjugate: Flip the y-coordinate
     */
    get conj() {
        let new_coords = createVector(this.real, -this.imag);
        return new Complex(new_coords.x, new_coords.y, this.i_squared);
    }

    /**
     * |z|^2 = z * z.conj = z dot z
     */
    get modulus_squared() {
        return this.coords.dot(this.coords);
    }

    /**
     * Modulus:
     * |z| = sqrt(z * z.conj)
     */
    get modulus() {
        return Math.sqrt(this.modulus_squared);
    }

    // TODO: How to generalize arg(z)?

    /**
     * tranformation f(z) = -z
     */
    get neg() {
        let new_coords = this.coords.mult(-1);
        return new Complex(new_coords.x, new_coords.y, this.i_squared);
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

        let a = this.real + other.imag;
        let b = this.real - other.imag;
        return new Complex(a, b, this.i_squared);
    }

    toString() {
        return `(${this.real}+${this.imag}i)`
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

        let a = numerator.x / denominator;
        let b = numerator.y / denominator;

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
}
