class CosinePalette extends Palette {
    constructor(label, a, b, c, d) {
        super(label);
        this.a = a || rand_array(3);
        this.b = b || rand_array(3);
        this.c = c || rand_array(3);
        this.d = d || rand_array(3);
    }

    lookup_color(val) {
        const NUM_COMPONENTS = 3;
        colorMode(RGB, 1.0);

        let components = [];
        for (let i = 0; i < NUM_COMPONENTS; i++) {
            let component = this.a[i] + this.b[i] * Math.cos(
                2.0 * Math.PI * (this.c[i] * val + this.d[i]));
            components.push(component);
        }
        let result = color(...components);
        colorMode(RGB, 255);
        return result;
    }
}
