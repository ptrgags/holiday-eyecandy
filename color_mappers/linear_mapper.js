/**
 * Map the input range onto a linear ramp. However, there's a parameter
 * to specify a frequency at which the ramp repeats.
 * Perhaps SawtoothMapper is a better name... oh well
 */
class LinearMapper extends ColorMapper {
    constructor(freq=1) {
        super();
        this.freq = freq;
    }

    map_color(val) {
        return this.fmod(this.freq * val, 1.0);
    }

    /**
     * Using the definition
     *
     * a % b == a - floor(a / b) * b
     */
    fmod(val, n) {
        return val - Math.floor(val / n) * n;
    }

    get label() {
        return `Sawtooth (freq=${this.freq})`;
    }
}
