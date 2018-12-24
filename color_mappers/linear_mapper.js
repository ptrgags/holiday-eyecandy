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
        return fmod(this.freq * val, 1.0);
    }

    get label() {
        if (this.freq === 1)
            return 'Linear';
        else
            return `Sawtooth (freq=${this.freq})`;
    }

    get id() {
        if (this.freq === 1)
            return 'map-linear';
        else
            return `map-saw-${this.freq}`;
    }
}
