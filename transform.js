/**
 * Interface for a generic transformation. It does not have
 * to be linear
 */
class Transform {
    transform(vec) {
        throw new TypeError("Implement in subclass!");
    }

    /**
     * Compose transformations. 
     * Try to combine transforms into one object if possible. Otherwise
     * make a TransformationChain
     */
    then(xform) { 
        throw new TypeError("Implement in subclass!");
    }
}

class TransformationChain {
    constructor(xforms) {
        this.xforms = xforms
    }

    transform(vec) {
        var result = vec;
        for (let xform of this.xforms)
            result = xform.transform(result);
        return result;
    }

    then(xform) {
        this.xforms.push(xform);
        return this;
    }

    /**
     * Do the samme as .then(xform) but push
     * to the left end. This is useful
     * in subclasses of Transform so we do not create
     * more than one MatrixTransform
     */
    after(xform) {
        this.xforms.unshift(xform);
        return this;
    }
}

/**
 * 3x3 2D matrix transformation
 */
class MatrixTransform {
    /**
     * Specify 9 coefficients in 
     * row major order:
     *
     * new MatrixTransform([
     *   [2, 0, 0],
     *   [0, 3, 0],
     *   [0, 0, 1]
     * ]);
     */
    constructor(coeffs) {
        this.coeffs = coeffs;
    }

    transform(vec) {
        let homogeneous = createVector(vec.x, vec.y, 1);

        let result = [];
        for (let row of this.coeffs) {
            let product = createVector(...row).dot(homogeneous);
            result.push(product);
        }
        return createVector(result[0], result[1]);
    }

    columns() {
        let results = [];
        for (var i = 0; i < 3; i++) {
            let row = [];
            for (var j = 0; j < 3; j++)
                row.push(this.coeffs[j][i]);
            results.push(row); 
        }
        return results;
    }
    
    multiply_matrices(other) {
        let result_rows = [];
        for (let row of this.coeffs) {
            let row_vec = createVector(...row);
            let result = [];
            for (let col of other.columns()) {
                let col_vec = createVector(...col);
                result.push(row_vec.dot(col_vec));
            }
            result_rows.push(result);
        }
        return new MatrixTransform(result_rows);
    }

    get det() {
        let [
            [a, b, c],
            [d, e, f],
            [g, h, i]
        ] = this.coeffs;

        return (a * e * i) + (b * f * g) + (c * d * h) 
            - (a * f * h) - (b * d * i) - (c * e * g);
    }

    then(xform) {
        if (xform instanceof MatrixTransform) {
            // Multiply xform on the left
            return xform.multiply_matrices(this);
        } else if (xform instanceof TransformationChain) {
            // Prepend to the transformation chain
            return xform.after(this);
        } else {
            // Start a transformation chain
            return new TransformationChain([this, xform]);
        }
    }

    static translate(x, y) {
        return new MatrixTransform([
            [1, 0, x],
            [0, 1, y],
            [0, 0, 1]
        ]);
    }

    static rotate(theta_radians) {
        let st = Math.sin(theta_radians);
        let ct = Math.cos(theta_radians);
        return new MatrixTransform([
            [ct, -st, 0],
            [st, ct, 0],
            [0, 0, 1]
        ]);
    }

    static scale(sx, sy) {
        return new MatrixTransform([
            [sx, 0, 0],
            [0, sy, 0],
            [0, 0, 1]
        ]);
    }
}
