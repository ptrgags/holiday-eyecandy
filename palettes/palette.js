class Palette {
    constructor(label, id) {
        this.label = label;
        this.short_id = id;
    }
    /**
     * Given a value from 0 to 1, return a color that p5.js considers valid
     */
    lookup_color(val) {
        throw new TypeError("Implement in subclass!");
    }

    get id() {
        return `pal-${this.short_id}`;
    }
}
