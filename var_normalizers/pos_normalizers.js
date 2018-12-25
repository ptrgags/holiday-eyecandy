class PositionNormalizer extends VariableNormalizer {
    // var is one of 'x', 'y', 'r', 'theta'
    constructor(variable, max_val) {
        super();
        this.var = variable;
        this.max_val = max_val;
    }

    get_coord(z) {
        if (this.var === 'x')
            return z.real;
        else if (this.var === 'y')
            return z.imag;
        else if (this.var === 'r')
            return z.modulus;
        else if (this.var === 'theta')
            return z.arg;
        else {
            throw new TypeError('bad variable ' + this.var);
        }
    }

    normalize(stats) {
        let z = stats.tile_center;
        let coord = this.get_coord(z);
        return fmod(coord, this.max_val);
    }

    get label() {
        return `Position (${this.var})`;
    }

    get id() {
        return `var-pos-${this.var}`;
    }
}
