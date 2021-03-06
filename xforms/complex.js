/**
 * Simple complex
 * transformation that matches the form:
 *
 * f(z) = a * z + b
 *    or
 * f(z) = a * z.conj + b  (mirror over x axis first)
 *
 * where a, b, z in C
 *
 * This is enough for simple transformations like frieze groups
 * or affine transform fractals
 */
class ComplexTransform extends Transform {
    /**
     * multipler: complex number to multiply z
     * offset: complex number to add to z
     * mirror: true if z.conj should be used
     */
    constructor(multiplier, offset, mirror=false) {
        super()
        this.multiplier = multiplier;
        this.offset = offset;
        this.mirror = mirror;
    }

    /**
     * Transform a point by applying
     *
     * a * z + b
     *
     * or a * z.conj + b
     *
     * depending on this.mirror
     */
    transform_point(z) {
        let z1 = this.mirror ? z.conj : z;

        return this.multiplier.mult(z1).add(this.offset);
    }

    then(xform) {
        if (xform.mirror) {
            let a = xform.multiplier.mult(this.multiplier.conj);
            let b = xform.offset.add(this.offset.conj);
            let mirror = !this.mirror;
            return new ComplexTransform(a, b, mirror);
        } else {
            let a = xform.multiplier.mult(this.multiplier);
            let b = xform.offset.add(this.offset);
            let mirror = this.mirror;
            return new ComplexTransform(a, b, mirror);
        }
    }


    get is_invertible() {
        return true;
    }

    /**
     * No mirror:
     * w = a * z + b
     * w - b = a * z
     * a.inv * w - b / a = z
     *
     * Mirror:
     * w = a * z.conj + b
     * w - b = a * z.conj
     * a.inv * w - b / a = z.conj
     * a.inv.conj * w.conj - (b / a).conj = z
     */
    get inverse() {
        let new_mult = this.multiplier.inv;
        let new_offset = this.offset.div(this.multiplier).neg;

        // Check if the result needs to mirror the parameters
        if (this.mirror)
            return new ComplexTransform(new_mult.conj, new_offset.conj, true);
        else
            return new ComplexTransform(new_mult, new_offset, false);
    }

    /**
     * If this transform is S and the other xform is T,
     * compute S' = TST^-1
     */
    conjugate_by(xform) {
        return xform.inverse.then(this).then(xform);
    }

    get str() {
        let conj_str = this.mirror ? ".conj" : "";
        return `f(z) = ${this.multiplier.str} * z${conj_str} `
            + `+ ${this.offset.str}`;
    }
}
