/**
 * There are 7 frize
 */
class Frieze extends IFS {
    constructor(frieze_type, cell_size=1.0) {
        super();
    }

    /**
     * Return a CycleBuffer of transformations
     */
    make_xforms() {
        return [
            // Unit translation
            // T(z) = z + 1
            new ComplexTransform(complex(1.0), complex(1.0)),
        ];
    }

    get is_group() {
        return true;
    }
}
