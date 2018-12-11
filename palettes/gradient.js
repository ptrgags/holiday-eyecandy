class Gradient extends Palette {
    constructor(start_color, end_color, hsb=false) {
        super();
        this.start_color = start_color;
        this.end_color = end_color;
        this.use_hsb = hsb;
    }
    
    lookup_color(val) {
        if (this.use_hsb)
            colorMode(HSB);
        let c = lerpColor(color(...this.start_color), color(...this.end_color), val);
        colorMode(RGB);
        return c;
    }
}
