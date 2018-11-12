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
    constructor(coords, i_squared=-1) {
        this.coords = coords;
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
        return new Complex(new_coords, this.i_squared);
    }

    /**
     * |z|^2 = z * z.conj
     */
    get modulus_squared() {
        return this.mult(this.conj);
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
     * Complex numbers add like vectors do
     */
    add(other) {
        if (other.i_squared != this.i_squared)
            throw new TypeError("add: unequal i^2 values!");

        return new Complex(this.coords.add(other.coords), this.i_squared);
    }

    sub(other) {
        if (other.i_squared != this.i_squared)
            throw new TypeError("sub: unequal i^2 values!");

        return new Complex(this.coords.sub(other.coords), this.i_squared);
    }

    /**
     * (a + b sqrt(n)) * (c + d sqrt(n)) = (ac + bdn) + (ad + bc) sqrt(n)
     */
    mult(other) {
        if (other.i_squared != this.i_squared)
            throw new TypeError("mult: unequal i^2 values!");

        let a = this.real * other.real 
            + this.i_squared * this.imag * other.imag;
        let b = this.real * other.imag + this.imag + other.real;

        let new_vec = createVector(a, b);
        return new Complex(new_vec, this.i_squared);
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
        let denominator = other.modulus_squared();

        let new_coords = numerator.coords.div(denominator);
        return new Complex(new_coords, this.i_squared); 
    }
}
