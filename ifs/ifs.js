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

    /**
     * Pick a random transformation from the list.
     * this includes inverses!
     */
    get rand_xform() {
        var index = Math.floor(Math.random() * this.xforms.length);
        return [this.xforms.get_item(index), index];
    }

    get all_xforms() {
        return this.xforms.all;
    }

    /**
     * Get all transforms except the inverse of the last transformation
     * we applied. This is useful
     */
    all_except_inverse(last_index) {
        if(this.is_group) {
            let inverse_index = last_index + this.xforms.length / 2;
            return this.xforms.all_except(inverse_index);
        } else {
            return this.xforms.all;
        }
    }

    get str() {
        return "IFS:\n" + this.xforms.map((x) => x.str).join('\n');
    }
}
