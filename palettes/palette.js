class Palette {
    constructor(label) {
        this.label = label;
    }
    /**
     * Given a value from 0 to 1, return a color that p5.js considers valid
     */
    lookup_color(val) {
        throw new TypeError("Implement in subclass!");
    }
}
