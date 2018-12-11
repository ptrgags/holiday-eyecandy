class SineMapper extends ColorMapper {
    constructor(freq=1) {
        super();
        this.freq = freq;
    }

    map_color(val) {
        return 0.5 + 0.5 * Math.sin(2.0 * Math.PI * this.freq * val);
    }
}
