/**
 * There are 7 frize
 */
class Frieze extends IFS {
    constructor(frieze_type, cell_size=1.0) {
        super();
        this.frieze_type = frieze_type;
        this.cell_size = cell_size;
    }

    /**
     * Return a CycleBuffer of transformations
     */
    make_xforms() {
        // Unit translation
        // T(z) = z + d
        let T = new ComplexTransform(complex(1.0), complex(this.cell_size));

        // Reflection over the y-axis
        // Y(z) = -z.conj
        let Y = new ComplexTransform(complex(-1.0), complex(0.0), true);

        // Reflection over the x-axis
        // X(z) = z.conj
        let X = new ComplexTransform(complex(1.0), complex(0.0), true);

        // Glide reflection along the x-axis
        // G(z) = z.conj + 0.5 * d
        let G = new ComplexTransform(
            complex(1.0), complex(0.5 * this.cell_size), true);

        // 180 degree rotation about the origin
        // R(z) = -z
        let R = new ComplexTransform(complex(-1.0), complex(0.0));

        // The 7 frieze groups
        let GROUPS = {
            p1: [T],
            p11m: [T, X],
            p1m1: [T, Y],
            p11g: [T, G],
            p2: [T, R],
            p2mg: [T, R, Y, G],
            p2mm: [T, R, Y, X],
        };

        let result = GROUPS[this.frieze_type];

        if (result === undefined)
            throw new TypeError("Invalid Frieze " + this.frieze_type);

        return result;
    }

    get is_group() {
        return true;
    }

    get label() {
        return `Frieze Group ${this.frieze_type}`;
    }
}
