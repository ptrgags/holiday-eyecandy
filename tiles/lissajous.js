/**
 * Parametric curves due to oscilation in multiple directions at once
 */
class LissajousMaker extends TileMaker {
    constructor(a, b, num_steps=200) {
        super();
        this.a = a;
        this.b = b;
        this.num_steps = num_steps;
    }

    get points() {
        let max_theta = 2.0 * Math.PI;

        let results = [];
        for (let i = 0; i < this.num_steps; i++) {
            let theta = max_theta * i / this.num_steps;
            let x = 0.5 * Math.cos(this.a * theta);
            let y = 0.5 * Math.sin(this.b * theta);
            results.push(complex(x, y));
        }
        return results;
    }

    make_tile(center) {
        let vertices = this.points;
        let translated = vertices.map((z) => z.add(center));
        return new Polygon(center, translated, false, true);
    }

    get label() {
        return `Lissajous Curve (${this.a}, ${this.b})`;
    }
    get id() {
        return `tile-lissajous-${this.a}-${this.b}`;
    }
}
