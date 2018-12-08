/**
 * Iterated Function System interface.
 */
class IFS {
    setup() {
        let xforms = this.make_xforms();

        // For groups, we also need the inverses
        if (this.is_group)
            xforms.push(...this.make_inverses(xforms));

        this.xforms = new CycleBuffer(xforms);
    }

    /**
     * Return a CycleBuffer of transformations
     */
    make_xforms() {
        throw new TypeError("Implement in Subclass!");
    }

    /**
     * Return true for groups (IFS with inverses) and
     * false for semigroups
     */
    get is_group() {
        throw new TypeError("Implement in Subclass!");
    }

    make_inverses(xforms) {
        return xforms.map((x) => x.inverse);
    }
}
