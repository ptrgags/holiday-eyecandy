/**
 * Rational polar rose curves, i.e. curves of the form
 *
 * r = cos(k * theta)
 *
 * where k = n/d is a rational number
 */
class RoseMaker extends TileMaker {
    constructor(n, d, num_steps=200) {
        super();
        this.n = n;
        this.d = d;
        this.k = n / d;
        this.num_steps = num_steps;
    }

    get points() {
        /**
         * Compute the maximum angle needed to display the full rose since
         * this depends on n and d
         * From https://socratic.org/questions/what-happens-to-a-rose-curve-if-n-r-s-is-a-rational-number
         */
        let product = this.n * this.d;
        let p = product % 2 === 0 ? 2 : 1;
        let max_theta = this.d * p * Math.PI;

        let results = [];
        for (let i = 0; i < this.num_steps; i++) {
            let theta = max_theta * i / this.num_steps;
            let r = 0.5 * Math.cos(this.k * theta);
            let x = r * Math.cos(theta);
            let y = r * Math.sin(theta);
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
        return `Rose Curve (${this.n}/${this.d})`;
    }
    get id() {
        return `tile-rose-${this.n}-${this.d}`;
    }
}
