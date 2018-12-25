/**
 * Cycle buffer that
 */
class CycleBuffer {
    constructor(elements, index=0) {
        this.elements = elements;
        this.index = index;
        this.fix_index();
    }

    next() {
        this.index += 1;
        this.fix_index();
    }

    previous() {
        this.index -= 1;
        this.fix_index();
    }

    advance_to(index) {
        this.index = index;
        this.fix_index();
    }

    fix_index() {
        this.index = mod(this.index, this.elements.length);
    }

    get current() {
        return this.elements[this.index];
    }

    get length() {
        return this.elements.length;
    }

    get_item(index) {
        let idx = mod(index, this.elements.length);
        return this.elements[idx];
    }

    /**
     * Get all elements with their indices
     *
     * returns an array of arrays:
     * [
     *  [x1, 0],
     *  [x2, 1],
     *  ...
     *  [xn, n],
     * ]
     */
    get all() {
        return this.elements.map((x, i) => [x, i]);
    }

    /**
     * Find the index of an element with the given id
     */
    find_index(id) {
        // Linear search, but there's not going to be that many items
        // to search through.
        let filtered = this.all.filter(([x, i]) => x.id === id);
        if (filtered.length < 1) {
            return -1;
        } else {
            let [, idx] = filtered[0];
            return idx;
        }
    }

    /**
     * like this.all except we exclude the element that matches
     * the index
     */
    all_except(index) {
        let reduced_index = mod(index, this.elements.length);
        return this.all.filter(([, i]) => i != reduced_index);
    }

    map(func) {
        return this.elements.map(func);
    }
}
