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

    fix_index() {
        this.index = mod(this.index, this.elements.length);
    }

    get current() {
        return this.elements[this.index];
    }

    get_item(index) {
        let idx = mod(index, this.elements.length);
        return this.elements[idx];
    }
}
