class Gradient extends Palette {
    constructor(label, start_color, end_color, hsb=false) {
        super(label);
        this.start_color = start_color;
        this.end_color = end_color;
        this.use_hsb = hsb;
    }

    lookup_color(val) {
        if (this.use_hsb)
            colorMode(HSB);
        let start_color = color(...this.start_color);
        let end_color = color(...this.end_color);
        let c = lerpColor(start_color, end_color, val);
        colorMode(RGB);
        return c;
    }
}
