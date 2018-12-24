/**
 * Map [0, 1] -> [0, 1] using the fractional part of a sine function
 * with a very high frequency. Not the best hash function, but it's enough
 * for a color palette!
 */
class NoiseMapper extends ColorMapper{
    constructor() {
        super();
        // Pick the frequency from the unix epoch time in milliseconds
        // of when this object was constructed.
        this.freq = new Date().getTime();
    }

    map_color(val) {
        let sine = Math.abs(Math.sin(val));
        let scaled = this.freq * sine;
        let int_part = Math.floor(scaled);
        let fract_part = scaled - int_part;
        return fract_part;
    }

    get label() {
        return "Noise";
    }
}
