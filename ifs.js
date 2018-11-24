/**
 * Iterated Function System for use in all fractal sketches
 */
class IFS {
    /**
     * Build a transform list from an array of xforms
     */
    constructor(xforms) {
        this.xforms = xforms;
        this.labels = "abcdefghijklmnopqrstuvwxyz".substring(0, xforms.length);
    }

    /**
     * Add inverse transformations. the transformations must
     * support inverses. This is used for DFS tilings
     */
    add_inverses() {
        let inverses = [];
        for (let xform of this.xforms)
            inverses.push(xform.inverse);
        this.xforms = this.xforms.concat(inverses);
        this.labels += this.labels.toUpperCase();
    }

    /**
     * Get a transformation given an index. The index is taken mod
     * the number of transformations so we never get an undefined value
     */
    get_xform(i) {
        let index = mod(i, this.num_xforms); 
        return this.xforms[index];
    }

    /**
     * Get the number of all xforms, including inverses
     */
    get num_xforms() {
        return this.xforms.length;
    }

    /**
     * Get the number of xforms not including 
     * inverses
     */
    get num_forward_xforms() {
        return this.xforms.length / 2;
    }

    /**
     * Pick a random transformation from the list.
     * this includes inverses!
     */
    get rand_xform() {
        var index = Math.floor(Math.random() * this.xforms.length);
        return this.xforms[index];
    }

    get_label(i) {
        let index = mod(i, this.num_xforms);
        return this.labels.charAt(index);
    }
}
